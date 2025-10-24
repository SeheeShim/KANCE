import React, { useState, useMemo, useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import { BiSolidCaretLeftCircle, BiSolidCaretRightCircle } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

import "./Community.scss";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const countryCoords = {
  KR: [127.7669, 35.9078],
  US: [-95.7129, 37.0902],
  JP: [138.2529, 36.2048],
  CN: [104.1954, 35.8617],
  FR: [2.2137, 46.6034],
  DE: [10.4515, 51.1657],
  BR: [-51.9253, -14.235],
  AU: [133.7751, -25.2744],
  IN: [78.9629, 20.5937],
  GB: [-3.436, 55.3781],
  RU: [105.3188, 61.524],
  CA: [-106.3468, 56.1304],
  MX: [-102.5528, 23.6345],
  ZA: [22.9375, -30.5595],
  SA: [45.0792, 23.8859],
  IT: [12.5674, 41.8719],
  ES: [-3.7492, 40.4637],
};

const generateParticipants = (count = 1200) => {
  const countries = Object.keys(countryCoords);
  return Array.from({ length: count }, (_, i) => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const videoNum = Math.floor(Math.random() * 35) + 1;
    return {
      id: i + 1,
      name: `User${i + 1}`,
      country,
      coords: countryCoords[country],
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000),
      score: Math.floor(Math.random() * 100),
      change: Math.floor(Math.random() * 11) - 5,
      avatar: `https://picsum.photos/seed/${i}/50/50`,
      video: `/video/shorts/shorts${videoNum}.mp4`,
    };
  });
};

export default function Community() {
  const participants = useMemo(() => generateParticipants(1200), []);
  const [selected, setSelected] = useState(null);
  const [filterCountry, setFilterCountry] = useState("ALL");
  const [page, setPage] = useState(0);
  const mapRef = useRef();
  const perPage = 12;

  const filtered = participants.filter(
    (p) => filterCountry === "ALL" || p.country === filterCountry
  );
  const paginated = filtered.slice(page * perPage, page * perPage + perPage);

  const handleRankClick = (p) => {
    setSelected(p);
    if (mapRef.current && p.coords) {
      mapRef.current.flyTo({ center: p.coords, zoom: 5, essential: true });
    }
  };

  const handleBack = () => {
    setSelected(null);
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [0, 20], zoom: 1.5, essential: true });
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const selectCountry = (code) => {
    setFilterCountry(code);
    setPage(0);
    setDropdownOpen(false);
  };

  return (
    <div className="community-container">
      <div className="sidebar">
        <div className="title">
          <h2>Dance Around the World</h2>
          <p>전 세계 K-POP 댄서들의 실력을 확인하고 랭킹을 즐겨보세요!</p>
        </div>

        {!selected ? (
          <>
            <div className="sidebarTop">
              <div className="country-filter">
                <label>Country</label>
                <div
                  className="custom-select"
                  onClick={toggleDropdown}
                  tabIndex={0}
                  onBlur={() => setDropdownOpen(false)}
                >
                  <div className="selected-option">
                    {filterCountry === "ALL" ? (
                      "ALL"
                    ) : (
                      <>
                        <img
                          className="flag"
                          src={`https://flagcdn.com/w20/${filterCountry.toLowerCase()}.png`}
                          alt={filterCountry}
                        />
                        {filterCountry}
                      </>
                    )}
                    <FaChevronDown className="dropdown-arrow" />
                  </div>
                  {dropdownOpen && (
                    <ul className="options-list">
                      <li
                        className="option-item"
                        onMouseDown={() => selectCountry("ALL")}
                      >
                        ALL
                      </li>
                      {Object.keys(countryCoords).map((code) => (
                        <li
                          key={code}
                          className="option-item"
                          onMouseDown={() => selectCountry(code)}
                        >
                          <img
                            className="flag"
                            src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                            alt={code}
                          />
                          {code}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="pagination">
                  <button className="prev" onClick={() => setPage((p) => Math.max(p - 1, 0))}>
                    <BiSolidCaretLeftCircle />
                  </button>
                  <button
                    className="next"
                    onClick={() => setPage((p) => (p + 1) * perPage < filtered.length ? p + 1 : p)}
                  >
                    <BiSolidCaretRightCircle />
                  </button>
                </div>
              </div>


            </div>

            <div className="rank-list">
              {paginated.map((p, i) => (
                <div key={p.id} className="rank-card" onClick={() => handleRankClick(p)}>
                  <div className="left">{page * perPage + i + 1}</div>
                  <div className="center">
                    <img
                          className="flag"
                          src={`https://flagcdn.com/w40/${p.country.toLowerCase()}.png`}
                          alt={p.country}
                        />
                    <div className="avatar">
                      <img src={p.avatar} alt={p.name} />
                    </div>
                    <div className="info">
                      <div className="top">
                        <span className="username">{p.name}</span>
                        <div className="topRight">
                          <div className="likes"><FaHeart /> {p.likes}</div>
                          <div className="views"><FaEye /> {p.views}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    {p.change > 0 ? `▲ ${p.change}` : p.change < 0 ? `▼ ${Math.abs(p.change)}` : "-"}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="selected-details">
            <div className="line"></div>
            <button className="back-button" onClick={handleBack}>
              <BiSolidCaretLeftCircle />
            </button>
            <h2>
              {selected.name}{" "}
              <img
                src={`https://flagcdn.com/w80/${selected.country.toLowerCase()}.png`}
                alt={selected.country}
                className="inline-flag"
              />
            </h2>
            <div className="Details">
              <p><FaHeart /> {selected.likes}</p>
              <p><FaEye /> {selected.views}</p>
              <p>점수: {selected.score}</p>
              <p>변화: {selected.change > 0 ? `▲${selected.change}` : selected.change < 0 ? `▼${Math.abs(selected.change)}` : "-"}</p>
            </div>
            <video src={selected.video} controls autoPlay style={{ borderRadius: 8 }} />
          </div>
        )}
      </div>

      <div className="Right">
        <div className="map-wrapper">
          <Map
            ref={mapRef}
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{ longitude: 0, latitude: 20, zoom: 1.5 }}
            projection="globe"
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/standard-satellite"
            onLoad={(e) => e.target.setFog({})}
          >
            {filtered.map((p) => (
              <Marker
                key={p.id}
                longitude={p.coords[0]}
                latitude={p.coords[1]}
                anchor="center"
              >
                <div
                  className={`marker ${selected?.id === p.id ? "selected" : ""}`}
                  style={{
                    width: selected?.id === p.id ? 20 : 10,
                    height: selected?.id === p.id ? 20 : 10,
                    backgroundColor: selected?.id === p.id ? "red" : "#00f",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </Marker>
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
}
