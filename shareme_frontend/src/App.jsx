import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./components/Login";
import Home from "./container/Home";
import DeleteUnusedAssets from "./components/DeleteUnusedAssets";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/delete-unused-assets" element={<DeleteUnusedAssets />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
