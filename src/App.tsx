import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Home } from "page/home";

// Styles
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/convoi" element={<Home />}></Route>
          <Route path="/collecte" element={<Home />}></Route>
          <Route path="/map" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
