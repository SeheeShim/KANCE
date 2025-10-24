import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TICKETS from "../../data/tickets"; // 티켓 데이터 import
import "./Ticketing.scss";


export default function Ticketing() {
  // 좌측 체크 필터 상태
  const [filters, setFilters] = useState({
    kpop: false,
    modern: false,
    festival: false,
    battle: false,
    fusion: false, // 예비
    tradition: false, // 예비
  });

  // 무한 스크롤: 현재 표시 개수
  const [limit, setLimit] = useState(12);
  const loaderRef = useRef(null);

  // 필터링
  const filtered = useMemo(() => {
    const keys = Object.entries(filters).filter(([, v]) => v).map(([k]) => k);
    if (keys.length === 0) return TICKETS;
    return TICKETS.filter((it) => {
      const tagHit = (filters.kpop && it.tags.includes("kpop")) || (filters.modern && it.tags.includes("modern"));
      const typeHit =
        (filters.festival && it.type === "festival") ||
        (filters.battle && it.type === "battle") ||
        (filters.fusion && it.type === "fusion") ||
        (filters.tradition && it.type === "tradition");
      return tagHit || typeHit;
    });
  }, [filters]);

  const items = filtered.slice(0, limit);

  // 인터섹션 옵저버로 limit 증가
  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLimit((n) => Math.min(n + 12, filtered.length || TICKETS.length));
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [filtered.length]);

  const toggle = (key) => setFilters((f) => ({ ...f, [key]: !f[key] }));

  return (
    <div className="ticketing-page">
      {/* 좌측 필터 패널 */}
      <aside className="filter">
        <div className="panel">
          <h3 className="panel-title">K-Dance 공연</h3>
          <label className="check">
            <input type="checkbox" checked={filters.kpop} onChange={() => toggle("kpop")} />
            <span>K-Pop 콘서트</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={filters.modern} onChange={() => toggle("modern")} />
            <span>현대무용</span>
          </label>
          <hr />
          <h3 className="panel-title">K-Dance 콘서트</h3>
          <label className="check">
            <input type="checkbox" checked={filters.festival} onChange={() => toggle("festival")} />
            <span>페스티벌 & 배틀</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={filters.battle} onChange={() => toggle("battle")} />
            <span>퓨전·전통 무용</span>
          </label>
        </div>
      </aside>

      {/* 가운데 그리드 */}
      <main className="grid-area">
        <div className="cards">
          {items.map((it) => (
            <article className="card" key={it.id}>
              <div className="thumb">
                {/* 이미지 클릭 시 상세 페이지로 이동 */}
                <Link to={`../ticket/${it.id}`}>
                  <img src={it.img} alt={it.title} loading="lazy" />
                </Link>
              </div>
              <div className="meta">
                <div className="title">{it.title}</div>
                <div className="period">{it.period}</div>
                <div className="place">{it.place}</div>
              </div>
            </article>
          ))}
        </div>

        {/* 무한 스크롤 트리거 */}
        <div ref={loaderRef} className="loader" aria-hidden />
      </main>
    </div>
  );
}
