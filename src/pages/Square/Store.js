import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Store.scss";
import Goods from "../../data/goods";  // 데이터 경로에 맞게 수정하세요

const RECOMMENDED = [
  { id: "rec-1", title: "Lorem", price: 55500, img: "https://placehold.co/600x600" },
  { id: "rec-2", title: "Lorem", price: 55500, img: "https://placehold.co/600x600" },
];

const CATEGORIES = [
  { key: "all", label: "ALL" },
  { key: "Apparel", label: "Apparel" },
  { key: "Goods", label: "Goods" }
];

const KRW = (n) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

export default function Store() {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDocClick = (e) => ddRef.current && !ddRef.current.contains(e.target) && setOpen(false);
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const selectedLabel = CATEGORIES.find((c) => c.key === cat)?.label || "ALL";
  const filtered = useMemo(() => (cat === "all" ? Goods : Goods.filter((g) => g.category === cat)), [cat]);

  // 수정된 부분: 상품 클릭 시 아이템 전체를 state로 넘겨서 상세페이지로 이동
  const goToDetail = (item) => {
    navigate(`/Square/Store/${item.id}`, { state: { item } });
  };

  return (
    <div className="sg-page">
      <aside className="sg-hero">
        <div className="hero-frame">
          <img
            src="https://contents.sixshop.com/thumbnails/uploadedFiles/73034/product/image_1735027840235_1000.jpg"
            alt="Hero"
          />
        </div>
      </aside>

      <main className="sg-main">
        <div className="cat dd" ref={ddRef}>
          <button
            type="button"
            className="dd-toggle"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="dd-label">{selectedLabel}</span>
            <span className="arrow" aria-hidden>
              ▾
            </span>
          </button>
          {open && (
            <ul className="dd-menu" role="listbox">
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.key === cat}
                    className={`dd-item ${c.key === cat ? "active" : ""}`}
                    onClick={() => {
                      setCat(c.key);
                      setOpen(false);
                    }}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <section className="block">
          <h2 className="title">Apparel</h2>
          <div className="grid two">
            {RECOMMENDED.map((p) => (
              <article className="card" key={p.id} onClick={() => goToDetail(p)}>
                <div className="thumb ratio-1-1">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="meta">
                  <span className="name">{p.title}</span>
                  <span className="price">{KRW(p.price)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <hr className="divider" />

        <section className="block">
          <h2 className="title">Kance Goods</h2>
          <div className="grid three">
            {filtered.map((p) => (
              <article className="card" key={p.id} onClick={() => goToDetail(p)}>
                <div className="thumb ratio-1-1">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="meta">
                  <span className="name">{p.title}</span>
                  <span className="price">{KRW(p.price)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
