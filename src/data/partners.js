// src/data/partners.js
const PARTNERS = [
  {
    id: 1,
    name: "1MILLION Dance Studio",
    thumbnail: "/images/partners/1million-thumb.jpg",
    media: {
      src: "/videos/partners/1million-preview.mp4",
      poster: "/images/partners/1million-thumb.jpg",
    },
    description: "서울 강남에 위치한 세계적으로 유명한 댄스 스튜디오. K-POP, 힙합, 재즈, 스트리트 등 다양한 장르 전문. 유튜브 채널 구독자 수 백만 명 이상.",
    genre: ["K-pop", "Hip-hop", "Jazz", "Street"],
    location: {
      address: "서울 강남구 ○○로 100",
      lat: 37.5172,
      lng: 127.0413,
    },
    links: {
      website: "https://www.1milliondance.com",
      instagram: "https://instagram.com/1milliondance",
      youtube: "https://youtube.com/@1MILLIONDance",
    },
    videos: ["https://www.youtube.com/embed/5ZH2it5aQO4"],
  },
  {
    id: 2,
    name: "Just Jerk Dance Academy",
    thumbnail: "/images/partners/justjerk-thumb.jpg",
    media: null, // 아직 미디어 없음
    description: "힙합, 스트리트 댄스 전문. 세계 대회 우승 경력 다수 보유한 저스트 젝 크루의 아카데미.",
    genre: ["Hip-hop", "Street"],
    location: {
      address: "서울특별시 서대문구 이화여대길 59, 7층",
      lat: 37.5105,
      lng: 127.034,
    },
    links: {
      website: "https://justjerk.co.kr/",
      instagram: "https://instagram.com/justjerkcrew",
      youtube: "https://youtube.com/@JustJerkCrew",
    },
    videos: ["/video/partners/JUSTJERK.mp4"],
  },
  {
    id: 3,
    name: "1THE9 Dance Studio",
    thumbnail: "/images/partners/1the9-thumb.jpg",
    media: {
      src: "/videos/partners/1the9-preview.mp4",
      poster: "/images/partners/1the9-thumb.jpg",
    },
    description: "K-POP 아이돌 커버댄스, 현대무용, 힙합 중심. 체계적인 커리큘럼으로 유명한 스튜디오.",
    genre: ["K-pop", "Hip-hop", "Contemporary"],
    location: {
      address: "서울 마포구 ○○로 210",
      lat: 37.5563,
      lng: 126.9237,
    },
    links: {
      website: "https://1the9studio.com",
      instagram: "https://instagram.com/1the9studio",
      youtube: "https://youtube.com/@1the9studio",
    },
    videos: ["https://www.youtube.com/embed/def456ghi"],
  },
  {
    id: 4,
    name: "New Wave Dance Academy",
    thumbnail: "/images/partners/newwave-thumb.jpg",
    media: null,
    description: "서울 강남, 합정 등 여러 지점을 보유. 다양한 장르와 레벨별 수업을 제공.",
    genre: ["K-pop", "Hip-hop", "Street", "Contemporary"],
    location: {
      address: "서울 마포구 ○○로 45",
      lat: 37.5498,
      lng: 126.9134,
    },
    links: {
      website: "https://newwavedance.com",
      instagram: "https://instagram.com/newwavedance",
      youtube: "https://youtube.com/@newwavedance",
    },
    videos: ["https://www.youtube.com/embed/ghi789jkl"],
  },
  {
    id: 5,
    name: "Feel Dance Studio",
    thumbnail: "/images/partners/feel-thumb.jpg",
    media: {
      src: "/videos/partners/feel-preview.mp4",
      poster: "/images/partners/feel-thumb.jpg",
    },
    description: "실력파 강사진과 체계적인 강의. K-POP 아이돌 커버 및 스트리트 댄스 전문.",
    genre: ["K-pop", "Street"],
    location: {
      address: "서울 강서구 ○○로 77",
      lat: 37.5611,
      lng: 126.8544,
    },
    links: {
      website: "https://feeldancestudio.com",
      instagram: "https://instagram.com/feeldancestudio",
      youtube: "https://youtube.com/@feeldancestudio",
    },
    videos: ["https://www.youtube.com/embed/jkl012mno"],
  },
  {
    id: 6,
    name: "Imbalance Dance Studio",
    thumbnail: "/images/partners/imbalance-thumb.jpg",
    media: null,
    description: "힙합, 팝핑, 락킹 등 스트리트 댄스 중심. 신촌, 홍대 인근 위치.",
    genre: ["Hip-hop", "Popping", "Locking"],
    location: {
      address: "서울 서대문구 ○○로 56",
      lat: 37.5598,
      lng: 126.9421,
    },
    links: {
      website: "https://imbalancedance.com",
      instagram: "https://instagram.com/imbalancedance",
      youtube: "https://youtube.com/@imbalancedance",
    },
    videos: ["https://www.youtube.com/embed/mno345pqr"],
  },
  {
    id: 7,
    name: "CEDIA Dance Studio",
    thumbnail: "/images/partners/cedia-thumb.jpg",
    media: {
      src: "/videos/partners/cedia-preview.mp4",
      poster: "/images/partners/cedia-thumb.jpg",
    },
    description: "현대무용과 스트리트 댄스가 조화를 이루는 공간. 예술무용계에서도 인기.",
    genre: ["Contemporary", "Street"],
    location: {
      address: "서울 종로구 ○○로 88",
      lat: 37.5744,
      lng: 126.9842,
    },
    links: {
      website: "https://cediadance.com",
      instagram: "https://instagram.com/cediadance",
      youtube: "https://youtube.com/@cediadance",
    },
    videos: ["https://www.youtube.com/embed/pqr678stu"],
  },
];

export default PARTNERS;
