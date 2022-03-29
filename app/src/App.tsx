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
import { DriverCreate } from "page/driver/create";
import { Convoy } from "page/convoy";
import { Collect } from "page/collect";
import { HospitalityCreate } from "page/hospitality/create";
import { Hospitality } from "page/hospitality";
import { Signin } from "page/auth/signin";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/convoy-create" element={<ConvoyCreate />}></Route>
          <Route path="/convoy" element={<Home />}></Route>
          <Route path="/convoy/:id" element={<Convoy />}></Route>
          <Route path="/convoy/:id/edit" element={<ConvoyCreate />}></Route>

          <Route path="/collect" element={<Home />}></Route>
          <Route path="/collect-create" element={<CollectCreate />}></Route>
          <Route path="/collect-create" element={<CollectCreate />}></Route>
          <Route path="/hospitality/:id" element={<Collect />}></Route>
          <Route path="/hospitality" element={<Home />}></Route>
          <Route
            path="/hospitality-create"
            element={<HospitalityCreate />}
          ></Route>
          <Route path="/hospitality/:id" element={<Hospitality />}></Route>
          <Route path="/driver-create" element={<DriverCreate />}></Route>
          <Route path="/map" element={<Home />}></Route>
          <Route path="/connexion" element={<Signin />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
