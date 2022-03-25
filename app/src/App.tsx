import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

// Pages
import { Home } from "page/home";

// Styles
import "./App.css";
import { Layout } from "page/layout";
import { ConvoyCreate } from "page/convoy/create";
import { CollectCreate } from "page/collect/create";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/convoy-create" element={<ConvoyCreate />}></Route>
          <Route path="/convoy" element={<Home />}></Route>
          <Route path="/collect" element={<Home />}></Route>
          <Route path="/collect-create" element={<CollectCreate />}></Route>
          <Route path="/map" element={<Home />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
