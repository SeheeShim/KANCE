import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./GoodsDetail.scss";
import Goods from "../../data/goods";

const KRW = (n) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

export default function GoodsDetail() {
  const { id } = useParams();
  const location = useLocation();

  const item = useMemo(() => {
    return location.state?.item || Goods.find((g) => g.id === id);
  }, [id, location.state]);

  if (!item) {
    return <p style={{ color: "#e6e6e6", textAlign: "center", marginTop: "2rem" }}>상품을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="goods-detail">
      <section className="left">
        <div className="poster">
          <img src={item.img} alt={item.title} />
        </div>
      </section>

      <section className="right">
        <h1 className="title">{item.title}</h1>
        <p className="desc">{item.desc}</p>
        <div className="row">
          <span>{item.size}</span>
          <span className="price">{KRW(item.price)}</span>
        </div>
        <hr />
        <div className="cta">
          <button className="btn">Cart</button>
          <button className="btn buy">Buy Now</button>
        </div>
      </section>
    </div>
  );
}
