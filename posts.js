// update_posts.py 가 생성한 파일 — 직접 수정하지 말 것
// 마지막 갱신: 2026-09-01 09:19 KST
const POSTS = [
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DbLN5I6k49B/",
  "date": "2026-07-24",
  "ratio": 1.24
 },
 {
  "type": "youtube",
  "id": "rkQzttsSK84",
  "title": "2026 충주 다이브 페스티벌 - 낭만고양이",
  "date": "2026-06-20"
 },
 {
  "type": "youtube",
  "id": "Ah4sCoEgg0A",
  "title": "2026 충주 다이브 페스티벌 - 한 페이지가 될 수 있게",
  "date": "2026-06-20"
 },
 {
  "type": "youtube",
  "id": "1Hco9rPagKc",
  "title": "2026 충주 다이브 페스티벌 - Dreams Come True",
  "date": "2026-06-20"
 },
 {
  "type": "youtube",
  "id": "p24LOSSV-gg",
  "title": "2026 충주 다이브 페스티벌 - The Avengers",
  "date": "2026-06-20"
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DZzRYhMk4yY/",
  "date": "2026-06-20",
  "ratio": 0.562
 },
 {
  "type": "youtube",
  "id": "BFeLXchaLVY",
  "title": "서울여자대학교 제 31회 SWURS 응원대제전 - 한 페이지가 될 수 있게",
  "date": "2026-06-16"
 },
 {
  "type": "youtube",
  "id": "2RWu1585aug",
  "title": "서울여자대학교 제 31회 SWURS 응원대제전 - 뜨거운 감자",
  "date": "2026-06-16"
 },
 {
  "type": "youtube",
  "id": "za48jJvdtMk",
  "title": "서울여자대학교 제 31회 SWURS 응원대제전 - Just One",
  "date": "2026-06-16"
 },
 {
  "type": "youtube",
  "id": "vt8TFks3rqU",
  "title": "응원 2026! 비상 - 비상(飛上) (with. PEGASUS | 전광판)",
  "date": "2026-05-26"
 },
 {
  "type": "youtube",
  "id": "KQPbErt_j5k",
  "title": "응원 2026! 비상 - 뜨거운 감자 (전광판)",
  "date": "2026-05-26"
 },
 {
  "type": "youtube",
  "id": "ahGHzacnpZo",
  "title": "응원 2026! 비상 - 한 페이지가 될 수 있게 (전광판)",
  "date": "2026-05-26"
 },
 {
  "type": "youtube",
  "id": "NB8C7aFbkCw",
  "title": "응원 2026! 비상 - The Avengers (전광판)",
  "date": "2026-05-26"
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DYv7mTxE74f/",
  "date": "2026-05-25",
  "ratio": 0.562
 },
 {
  "type": "youtube",
  "id": "RDrtojNGL5U",
  "title": "2026 괴산 빨간맛 치어리더대회 - 그대에게",
  "date": "2026-05-24"
 },
 {
  "type": "youtube",
  "id": "G2JT7nnhWNo",
  "title": "2026 괴산 빨간맛 치어리더대회 - The Avengers",
  "date": "2026-05-24"
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DYt-X4uE9yL/",
  "date": "2026-05-24",
  "ratio": 0.562
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DYql7N3k6eA/",
  "date": "2026-05-23",
  "ratio": 0.566
 },
 {
  "type": "youtube",
  "id": "WSTVw3qPgXE",
  "title": "응원 2026! 비상 - 낭만고양이",
  "date": "2026-05-21"
 },
 {
  "type": "youtube",
  "id": "jGrYXsPUXf8",
  "title": "응원 2026! 비상 - 그대에게",
  "date": "2026-05-21"
 },
 {
  "type": "youtube",
  "id": "mkckM6BTdpA",
  "title": "응원 2026! 비상 - Just One",
  "date": "2026-05-21"
 },
 {
  "type": "youtube",
  "id": "n6LEsE_Qw-g",
  "title": "응원 2026! 비상 - Returns (예비역 무대)",
  "date": "2026-05-21"
 },
 {
  "type": "youtube",
  "id": "JHeSERmVbgk",
  "title": "응원 2026! 비상 - 비상(飛上) (with. PEGASUS)",
  "date": "2026-05-21"
 },
 {
  "type": "youtube",
  "id": "RIaBxOUU7IY",
  "title": "응원 2026! 비상 - 뜨거운 감자",
  "date": "2026-05-21"
 },
 {
  "type": "youtube",
  "id": "xGCnaIhQpak",
  "title": "응원 2026! 비상 - 한 페이지가 될 수 있게",
  "date": "2026-05-21"
 },
 {
  "type": "youtube",
  "id": "nTt2BZGXMoQ",
  "title": "응원 2026! 비상 - The Avengers",
  "date": "2026-05-21"
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DYZJ8i1E1BH/",
  "date": "2026-05-16",
  "ratio": 0.562
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DX-6UhwE9Pl/",
  "date": "2026-05-06",
  "ratio": 1.333
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DX5uW3zkxfb/",
  "date": "2026-05-04",
  "ratio": 1.25
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DX5uNpyEzff/",
  "date": "2026-05-04",
  "ratio": 1.25
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DX5uKAbkzcZ/",
  "date": "2026-05-04",
  "ratio": 1.25
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DX5uGOnkw2l/",
  "date": "2026-05-04",
  "ratio": 1.25
 },
 {
  "type": "instagram",
  "url": "https://www.instagram.com/p/DX5t_wJE0d2/",
  "date": "2026-05-04",
  "ratio": 1.25
 },
 {
  "type": "youtube",
  "id": "-9g3MzrYZUA",
  "title": "광운대 ROTC 밀리터리 페스티벌 - Run",
  "date": "2026-04-05"
 },
 {
  "type": "youtube",
  "id": "8rwC19Ep5Zc",
  "title": "광운대 ROTC 밀리터리 페스티벌 - 뜨거운 감자",
  "date": "2026-04-05"
 },
 {
  "type": "youtube",
  "id": "kuQ0t3tKAWw",
  "title": "광운대 ROTC 밀리터리 페스티벌 - The Avengers",
  "date": "2026-04-05"
 },
 {
  "type": "youtube",
  "id": "rtcO-EX7SPU",
  "title": "만우절 기념 교복 액션 - Dreams Come True",
  "date": "2026-04-01"
 },
 {
  "type": "youtube",
  "id": "gmhFXgKxPvo",
  "title": "2026학년도 광운대학교 새로배움터 - 그대에게",
  "date": "2026-03-01"
 },
 {
  "type": "youtube",
  "id": "gLDjsQRZVYo",
  "title": "2026학년도 광운대학교 새로배움터 - 질풍가도",
  "date": "2026-03-01"
 },
 {
  "type": "youtube",
  "id": "cpLqMAXAxMg",
  "title": "2026학년도 광운대학교 새로배움터 - The Avengers",
  "date": "2026-03-01"
 },
 {
  "type": "youtube",
  "id": "mvkZuPOIFqA",
  "title": "2026학년도 광운대학교 새로배움터 - Just One",
  "date": "2026-03-01"
 },
 {
  "type": "youtube",
  "id": "PS4G7dwcJzQ",
  "title": "2026 신입단원 모집 홍보영상",
  "date": "2026-02-22"
 }
];
