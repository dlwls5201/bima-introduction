#!/usr/bin/env python3
"""비마응원단 홈페이지 피드 갱신 스크립트.

유튜브(@kwubima)와 인스타그램(@be_my_bima)의 최신 게시물을 수집해
posts.js 를 다시 생성한다. index.html 은 로딩 시 posts.js 를 읽어 피드를 그린다.

사용법:
    python3 update_posts.py

- 유튜브: 채널 영상 페이지 + RSS 를 파싱 (API 키 불필요)
- 인스타: 웹 프로필 공개 엔드포인트에서 최신 12개 (익명 접근 한도)
- 기존 posts.json 에 있던 게시물은 유지되므로, 최신 12개 창에서 밀려난
  과거 인스타 게시물도 계속 쌓인다.
"""
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from pathlib import Path

KST = timezone(timedelta(hours=9))
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
YT_CHANNEL_ID = "UCbZdrFlyfFGizc7RnLgt-7A"   # @kwubima
YT_HANDLE = "kwubima"
IG_USERNAME = "be_my_bima"
TITLE_PREFIX = "[광운대학교 비마응원단] "

BASE = Path(__file__).parent
STATE_FILE = BASE / "posts.json"
OUT_FILE = BASE / "posts.js"


def http_get(url, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8", errors="replace")


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return []


# ---------- YouTube ----------

def yt_rss_dates():
    """RSS 는 최신 15개의 정확한 업로드 일시를 준다."""
    xml = http_get(f"https://www.youtube.com/feeds/videos.xml?channel_id={YT_CHANNEL_ID}")
    ns = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
    root = ET.fromstring(xml)
    dates = {}
    for e in root.findall("a:entry", ns):
        vid = e.find("yt:videoId", ns).text
        pub = datetime.fromisoformat(e.find("a:published", ns).text)
        dates[vid] = pub.astimezone(KST).strftime("%Y-%m-%d")
    return dates


def yt_watch_date(video_id):
    """RSS 에 없는(오래된) 영상은 시청 페이지에서 게시일을 읽는다."""
    html = http_get(f"https://www.youtube.com/watch?v={video_id}")
    m = re.search(r'"publishDate":"([^"]+)"', html)
    if not m:
        return None
    return datetime.fromisoformat(m.group(1)).astimezone(KST).strftime("%Y-%m-%d")


def fetch_youtube(known_dates):
    html = http_get(f"https://www.youtube.com/@{YT_HANDLE}/videos")
    i = html.find("ytInitialData =")
    s = html.find("{", i)
    e = html.find(";</script>", s)
    data = json.loads(html[s:e])

    found = {}  # id -> title (페이지 노출 순서 유지)

    def walk(o):
        if isinstance(o, dict):
            if "lockupViewModel" in o:
                lv = o["lockupViewModel"]
                vid = lv.get("contentId")
                title = (lv.get("metadata", {}).get("lockupMetadataViewModel", {})
                         .get("title", {}).get("content", ""))
                if vid and vid not in found:
                    found[vid] = title
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(data)
    rss = yt_rss_dates()
    posts = []
    for vid, title in found.items():
        title = title.removeprefix(TITLE_PREFIX)
        date = rss.get(vid) or known_dates.get(vid)
        if not date:
            date = yt_watch_date(vid)
            print(f"  게시일 조회: {vid} -> {date}")
        posts.append({"type": "youtube", "id": vid, "title": title, "date": date or ""})
    return posts


# ---------- Instagram ----------

def fetch_instagram():
    body = http_get(
        f"https://i.instagram.com/api/v1/users/web_profile_info/?username={IG_USERNAME}",
        headers={"x-ig-app-id": "936619743392459"},
    )
    user = json.loads(body)["data"]["user"]
    posts = []
    for edge in user["edge_owner_to_timeline_media"]["edges"]:
        n = edge["node"]
        dim = n["dimensions"]
        posts.append({
            "type": "instagram",
            "url": f"https://www.instagram.com/p/{n['shortcode']}/",
            "date": datetime.fromtimestamp(n["taken_at_timestamp"], KST).strftime("%Y-%m-%d"),
            "ratio": round(dim["height"] / dim["width"], 3),
        })
    return posts


# ---------- main ----------

def main():
    old = load_state()
    old_by_key = {p.get("id") or p.get("url"): p for p in old}
    known_yt_dates = {p["id"]: p["date"] for p in old if p["type"] == "youtube" and p.get("date")}

    merged = dict(old_by_key)  # 과거 게시물 유지

    print("유튜브 수집 중...")
    try:
        yt = fetch_youtube(known_yt_dates)
        for p in yt:
            merged[p["id"]] = p
        print(f"  영상 {len(yt)}개")
    except Exception as ex:
        print(f"  실패 (기존 데이터 유지): {ex}", file=sys.stderr)

    print("인스타그램 수집 중...")
    try:
        ig = fetch_instagram()
        for p in ig:
            merged[p["url"]] = p
        print(f"  게시물 {len(ig)}개 (익명 접근은 최신 12개까지)")
    except Exception as ex:
        print(f"  실패 (기존 데이터 유지): {ex}", file=sys.stderr)

    posts = sorted(merged.values(), key=lambda p: p.get("date") or "", reverse=True)
    STATE_FILE.write_text(json.dumps(posts, ensure_ascii=False, indent=2))
    OUT_FILE.write_text(
        "// update_posts.py 가 생성한 파일 — 직접 수정하지 말 것\n"
        f"// 마지막 갱신: {datetime.now(KST).strftime('%Y-%m-%d %H:%M KST')}\n"
        "const POSTS = " + json.dumps(posts, ensure_ascii=False, indent=1) + ";\n"
    )
    print(f"완료: 총 {len(posts)}개 -> {OUT_FILE.name}")


if __name__ == "__main__":
    main()
