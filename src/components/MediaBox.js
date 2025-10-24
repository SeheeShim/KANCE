// src/components/MediaBox.jsx
import React from "react";
import "./MediaBox.scss"; // 스타일 import

export default function MediaBox({ media, thumbnail }) {
  if (media?.src) {
    return (
      <video
        className="media-box"
        src={media.src}
        poster={media.poster || ""}
        playsInline
        muted
        loop
        autoPlay
      />
    );
  }

  return <img className="media-box" src={thumbnail} alt="파트너 썸네일" />;
}
