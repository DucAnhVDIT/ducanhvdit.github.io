import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import { AuthProvider } from "./services/AuthContext";
import PrivateRoute from "./router/auth-redirect";

export {}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </AuthProvider>
    <ScrollToTop />
  </BrowserRouter>
);
