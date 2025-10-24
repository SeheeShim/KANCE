// src/pages/Partners.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PARTNERS from "../../data/partners";
import HANBOK from "../../data/hanbokBrands.js";
import MediaBox from "../../components/MediaBox";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Partners.scss";

export default function Partners() {
  const navigate = useNavigate();

  const goToDetail = (partner) => {
    navigate(`/Square/Partners/${partner.id}`);
  };

  return (
    <div className="partners-page">
      {/* 상단 브랜드 라인 */}
      <ul className="brand-row">
        {HANBOK.map((b, i) => (
          <li key={i} className="brand">
            <a href={b.url} target="_blank" rel="noreferrer">
              {b.name}
            </a>
          </li>
        ))}
      </ul>

      {/* 파트너 스와이퍼 */}
      <div className="swiper-wrap">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="partner-swiper"
        >
          {PARTNERS.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="slide-card">
                <div className="media-wrap">
                  <MediaBox media={p.media} thumbnail={p.thumbnail} />
                  <div className="overlay">
                    <h2 className="title">{p.name}</h2>
                    <button className="more-btn" onClick={() => goToDetail(p)}>
                      more
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
