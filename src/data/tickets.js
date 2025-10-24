// tickets.js
// 각 공연의 제목을 배열로 설정 (반복 없이 고유한 제목들)
export const TITLES = [
  "월드 오브 스트릿 우먼 파이터",
  "솔라 3rd CONCERT [Solaris]",
  "NCT WISH 1st CONCERT",
  "SCF 서울국제안무페스티벌",
  "대무용단 창단 45주년 기념",
  // 추가 제목을 입력
];

// 각 공연의 기간을 배열로 설정 (반복 없이 고유한 기간들)
export const PERIODS = [
  "2025.01.01 ~ 2025.01.02",
  "2025.10.11 - 2025.10.12",
  "2025.10.31 - 2025.11.02",
  "2025.12.15 ~ 2026.01.05",
  "2025.09.04 ~ 2025.10.06",
  // 추가 기간을 입력
];

// 각 공연의 장소를 배열로 설정 (반복 없이 고유한 장소들)
export const PLACES = [
  "부산 사직 실내체육관",
  "연세대학교 백주년기념관 콘서트홀",
  "인스파이어 아레나",
  "아르코예술극장 대극장",
  "이화여대 삼성홀",
  // 추가 장소를 입력
];

// 각 공연의 이미지를 배열로 설정 (반복 없이 고유한 이미지 URL들)
export const IMAGES = [
  "/img/ticket1.jpg",
  "/img/ticket2.jpg",
  "/img/ticket3.jpg",
  "/img/ticket4.jpg",
  "/img/ticket5.jpg",
  // 추가 이미지 URL을 입력
];

// 태그 설정 (kpop, modern 등 원하는 태그)
export const TAGS = ["kpop", "modern"];

// 공연 타입 설정 (festival, battle)
export const TYPES = ["festival", "battle"];

/** 기간 문자열을 periodStart/periodEnd(YYYY-MM-DD)로 변환 */
const parsePeriod = (str) => {
  if (!str) return { periodStart: null, periodEnd: null, periodText: "" };
  const periodText = String(str).trim().replace(/\s*-\s*/g, " ~ ");
  const [s, e] = periodText.split("~").map((v) => v.trim());
  const dotToDash = (d) => d.replace(/\./g, "-").replace(/-$/, "");
  /** YYYY-MM-DD로 normalize */
  const normalize = (d) => {
    const [y, m, day] = dotToDash(d).split("-").map((x) => x.padStart(2, "0"));
    return `${y}-${m}-${day}`;
  };
  return {
    periodStart: normalize(s),
    periodEnd: normalize(e),
    periodText, // 리스트카드에 그대로 보여줄 문자열
  };
};

// TICKETS 배열 생성: 반복 없이 고유한 데이터로 설정
export const TICKETS = [
  (() => {
    const p = parsePeriod(PERIODS[0]);
    return {
      id: "t-1",
      title: TITLES[0],
      period: p.periodText,
      periodStart: p.periodStart,
      periodEnd: p.periodEnd,
      place: PLACES[0],
      img: IMAGES[0],
      tags: ["modern"],   // 필터에서 사용하는 값으로 맞춤 (kpop/modern)
      type: TYPES[0],
      price: 55000,       // TicketDetail에서 가격 포맷 사용 중이므로 기본값 추가
    };
  })(),
  (() => {
    const p = parsePeriod(PERIODS[1]);
    return {
      id: "t-2",
      title: TITLES[1],
      period: p.periodText,
      periodStart: p.periodStart,
      periodEnd: p.periodEnd,
      place: PLACES[1],
      img: IMAGES[1],
      tags: ["kpop"],
      type: TYPES[1],
      price: 88000,
    };
  })(),
  (() => {
    const p = parsePeriod(PERIODS[2]);
    return {
      id: "t-3",
      title: TITLES[2],
      period: p.periodText,
      periodStart: p.periodStart,
      periodEnd: p.periodEnd,
      place: PLACES[2],
      img: IMAGES[2],
      tags: ["kpop"],
      type: TYPES[0],
      price: 132000,
    };
  })(),
  (() => {
    const p = parsePeriod(PERIODS[3]);
    return {
      id: "t-4",
      title: TITLES[3],
      period: p.periodText,
      periodStart: p.periodStart,
      periodEnd: p.periodEnd,
      place: PLACES[3],
      img: IMAGES[3],
      tags: ["modern"],
      type: TYPES[1],
      price: 60000,
    };
  })(),
  (() => {
    const p = parsePeriod(PERIODS[4]);
    return {
      id: "t-5",
      title: TITLES[4],
      period: p.periodText,
      periodStart: p.periodStart,
      periodEnd: p.periodEnd,
      place: PLACES[4],
      img: IMAGES[4],
      tags: ["kpop"],
      type: TYPES[0],
      price: 77000,
    };
  })(),
  // 추가 항목을 여기서 입력 (반복 없이 각 항목을 다르게 설정)
];

export default TICKETS;
