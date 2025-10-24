import React from "react";
import "./PartnersModal.scss";

export default function PartnerDetailModal({ partner, onClose }) {
  if (!partner) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="partner-detail modal-content" onClick={e => e.stopPropagation()}>
        <h1>{partner.name}</h1>
        <img className="thumb" src={partner.thumbnail} alt={partner.name} />
        <p>{partner.description}</p>

        <h3>장르</h3>
        {partner.genre && partner.genre.length > 0 ? (
          <ul>
            {partner.genre.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        ) : (
          <p>장르 정보 없음</p>
        )}

        <h3>주소</h3>
        <p>{partner.location?.address || "주소 정보 없음"}</p>

        <h3>링크</h3>
        <ul>
          {partner.links?.website && (
            <li>
              <a href={partner.links.website} target="_blank" rel="noreferrer">
                웹사이트
              </a>
            </li>
          )}
          {partner.links?.instagram && (
            <li>
              <a href={partner.links.instagram} target="_blank" rel="noreferrer">
                인스타그램
              </a>
            </li>
          )}
          {partner.links?.youtube && (
            <li>
              <a href={partner.links.youtube} target="_blank" rel="noreferrer">
                유튜브
              </a>
            </li>
          )}
        </ul>

        {partner.videos && partner.videos.length > 0 && (
          <>
            <h3>영상</h3>
            {partner.videos.map((video, idx) => (
              <iframe
                key={idx}
                src={video}
                title={`${partner.name} video ${idx + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
          </>
        )}

        <button className="back-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
}
