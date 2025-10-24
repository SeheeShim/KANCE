import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TICKETS from "../../data/partners"; // 티켓 데이터 가져오기
import "./TicketDetail.scss"; // 스타일시트 추가

// 가격 포맷
const KRW = (n) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n ?? 0);

// YYYY-MM-DD ↔ Date
const toDate = (iso) => (iso ? new Date(`${iso}T00:00:00`) : null);
const fmtDot = (iso) => (iso ? iso.replaceAll("-", ".") : "날짜 정보 없음");
const sameYMD = (a, b) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const clampDate = (d, min, max) => {
  if (!d) return d;
  const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (min) {
    const mm = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (dd < mm) return mm;
  }
  if (max) {
    const mx = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (dd > mx) return mx;
  }
  return dd;
};

/** 📅 스크린샷 스타일 캘린더 (일~토, 테이블 레이아웃) */
function Calendar({ minDate, maxDate, value, onChange }) {
  // 보이는 달
  const [view, setView] = useState(() => value || minDate || new Date());

  // 외부 값 변경 시 보정
  useEffect(() => {
    if (value) setView(value);
    else if (minDate) setView(minDate);
  }, [value, minDate]);

  const year = view.getFullYear();
  const month = view.getMonth(); // 0-11

  // 일요일 시작(스크린샷과 동일): JS getDay()는 0=일
  const first = new Date(year, month, 1);
  const startIdx = first.getDay(); // 0~6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 7열 테이블 채우기
  const weeks = [];
  let row = new Array(startIdx).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    row.push(new Date(year, month, d));
    if (row.length === 7) {
      weeks.push(row);
      row = [];
    }
  }
  if (row.length) {
    while (row.length < 7) row.push(null);
    weeks.push(row);
  }

  const isDisabled = (d) => {
    if (!d) return true;
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  const header = `${year}. ${String(month + 1).padStart(2, "0")}`;

  return (
    <div className="kd-calendar">
      {/* 상단: < 2025. 09 > */}
      <div className="cal-head">
        <button type="button" onClick={() => setView(new Date(year, month - 1, 1))} className="nav" aria-label="이전 달">
          &lt;
        </button>
        <div className="ym">{header}</div>
        <button type="button" onClick={() => setView(new Date(year, month + 1, 1))} className="nav" aria-label="다음 달">
          &gt;
        </button>
      </div>

      {/* 요일 바 */}
      <div className="weekbar">
        {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
          <div key={w} className={`w ${w === "일" ? "sun" : ""}`}>
            {w}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <table className="cal-table" role="grid" aria-label="관람일 선택">
        <tbody>
          {weeks.map((week, rIdx) => (
            <tr key={rIdx}>
              {week.map((d, cIdx) => {
                if (!d) return <td key={`e-${cIdx}`} className="empty" />;
                const disabled = isDisabled(d);
                const selected = value && sameYMD(d, value);
                const isSun = cIdx === 0; // 첫 열 = 일요일
                return (
                  <td key={d.toISOString()}>
                    <button
                      type="button"
                      className={[
                        "day",
                        selected ? "selected" : "",
                        disabled ? "disabled" : "",
                        isSun ? "sun" : "",
                      ].join(" ").trim()}
                      onClick={() => !disabled && onChange?.(d)}
                      disabled={disabled}
                    >
                      {d.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TicketDetail() {
  const { id } = useParams();

  const ticket = useMemo(() => {
    const targetId = String(id);
    return TICKETS.find((item) => String(item.id) === targetId);
  }, [id]);

  // 훅은 항상 최상단에서
  const [selected, setSelected] = useState(null);

  // ticket 로드 시 시작일로 기본 선택
  useEffect(() => {
    if (ticket?.periodStart) setSelected(toDate(ticket.periodStart));
    else setSelected(null);
  }, [ticket]);

  if (!ticket) return <div>티켓을 찾을 수 없습니다.</div>;

  const start = toDate(ticket.periodStart);
  const end = toDate(ticket.periodEnd);
  const onPick = (d) => setSelected(clampDate(d, start, end));

  return (
    <div className="ticket-detail">
      {/* 좌측: 포스터 */}
      <section className="left">
        <div className="poster">
          <img src={ticket.img} alt={ticket.title} />
        </div>
      </section>

      {/* 우측: 상세 + 캘린더 패널 */}
      <section className="right">
        <h1 className="title">{ticket.title}</h1>
        <h2 className="subtitle">{ticket.subtitle || "[THE REAL STAGE] TOUR - 부산"}</h2>

        <p className="period">
          {fmtDot(ticket.periodStart)} ~ {fmtDot(ticket.periodEnd)}
        </p>

        {/* 오렌지 패널 안 흰색 캘린더 카드 */}
        <div className="calendar-panel">
          <div className="panel-title">관람일</div>
          <div className="panel-body">
            <Calendar minDate={start} maxDate={end} value={selected} onChange={onPick} />
          </div>
        </div>

        <hr className="divider" />

        <p className="desc">Price</p>

        <div className="price">{KRW(ticket.price)}</div>

        <div className="cta-col">
          <button
            className="btn btn-cart"
            onClick={() =>
              alert(`${fmtDot(selected?.toISOString()?.slice(0, 10) || ticket.periodStart)} 관람분 장바구니 담기`)
            }
          >
            Cart
          </button>
          <button
            className="btn btn-buy"
            onClick={() =>
              alert(`${fmtDot(selected?.toISOString()?.slice(0, 10) || ticket.periodStart)} 관람분 구매`)
            }
          >
            Buy Now
          </button>
        </div>
      </section>
    </div>
  );
}
