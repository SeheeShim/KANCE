import React from "react";
import { Routes, Route } from "react-router-dom";
import Store from "./Square/Store";
import Partners from "./Square/Partners";
import Ticketing from "./Square/Ticketing";

import GoodsDetail from "./Square/GoodsDetail";
import TicketDetail from "./Square/TicketDetail";
import PartnersDetail from "./Square/PartnersDetail";

import "./Square.scss";

const Square = () => {
  return (

    <div className="SquareMain">
        <Routes>
          <Route path="store" element={<Store />} />
          <Route path="store/:id" element={<GoodsDetail />} />
          <Route path="ticketing" element={<Ticketing />} />
          <Route path="ticket/:id" element={<TicketDetail />} />
          <Route path="partners" element={<Partners />} />
          <Route path="partners/:id" element={<PartnersDetail />} />
        </Routes>

    </div>
    
  );
};

export default Square;
