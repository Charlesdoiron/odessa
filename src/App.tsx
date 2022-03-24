import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import { history } from "redux/store/history";

// Pages
import { Home } from "page/home";

// Styles
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Home />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
