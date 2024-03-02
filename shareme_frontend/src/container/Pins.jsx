import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="px-2 md:px-5 bg-gray-50">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
      />
      <div className={loading ? "h-screen" : "h-full"}>
        <Routes>
          <Route
            path="/"
            element={<Feed loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/category/:categoryId"
            element={<Feed loading={loading} setLoading={setLoading} />}
          />
          <Route path="/pin/:pinId" element={<PinDetail user={user} />} />
          <Route path="/create" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
