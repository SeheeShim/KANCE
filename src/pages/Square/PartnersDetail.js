// src/pages/PartnerDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import PARTNERS from "../../data/partners";
import "./PartnersDetail.scss";

export default function PartnerDetail() {
  const { id } = useParams();
  const partner = PARTNERS.find((p) => p.id === parseInt(id));

  if (!partner) return <div>존재하지 않는 파트너입니다.</div>;

  return (
    <div className="partner-detail">
      <h1>{partner.name}</h1>

      <img src={partner.thumbnail} alt={partner.name} className="thumb" />

      <p>{partner.description}</p>

      <h3>장르</h3>
      {partner.genre?.length > 0 ? (
        <ul>
          {partner.genre.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      ) : (
        <p>장르 정보 없음</p>
      )}

      <h3>위치</h3>
      <p>{partner.location?.address ?? "위치 정보 없음"}</p>

      <h3>링크</h3>
      {partner.links ? (
        <ul>
          {partner.links.website && (
            <li>
              <a href={partner.links.website} target="_blank" rel="noreferrer">
                Website
              </a>
            </li>
          )}
          {partner.links.instagram && (
            <li>
              <a href={partner.links.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          )}
          {partner.links.youtube && (
            <li>
              <a href={partner.links.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
            </li>
          )}
        </ul>
      ) : (
        <p>링크 정보 없음</p>
      )}

      <h3>영상</h3>
      {partner.videos?.length > 0 ? (
        partner.videos.map((v, i) => (
          <iframe
            key={i}
            src={v}
            width="560"
            height="315"
            frameBorder="0"
            allowFullScreen
            title={`partner-video-${i}`}
          ></iframe>
        ))
      ) : (
        <p>영상 없음</p>
      )}

      <Link to="/partners" className="back-btn">
        ← 돌아가기
      </Link>
    </div>
  );
}
