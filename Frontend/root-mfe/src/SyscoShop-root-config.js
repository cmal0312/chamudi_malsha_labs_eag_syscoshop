import "regenerator-runtime/runtime";
import { navigateToUrl, registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import Landing from "./pages/Landing.jsx";
import { fetchCategories } from "./store/categoriesSlice.js";
import { AuthProvider } from "react-oidc-context";
import AuthCallback from "./pages/AuthCallback.jsx";

const routes = constructRoutes(microfrontendLayout);

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_axWJexQyC",
  client_id: "4t86eak5206ojuoqu03s4m653s",
  redirect_uri: "http://localhost:9001/auth/callback",
  response_type: "code",
  scope: "email openid phone",
};

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
  getAppProps() {
    // const state = store.getState();
    return {
      store,
      bffBaseUrl: "http://localhost:4000",
    };
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);

function Shell() {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.token);
  const [path, setPath] = React.useState(location.pathname);

  React.useEffect(() => {
    const handlePopState = () => setPath(location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const isLanding = path === "/";
  const isAuthCallback = path.startsWith("/auth/callback");

  return (
    <>
      {isLanding && <Landing />}
      {isAuthCallback && <AuthCallback />}
      <div id="single-spa-router"></div>
    </>
  );
}

const container = document.querySelector("main");
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <AuthProvider {...cognitoAuthConfig}>
      <Shell />
    </AuthProvider>
  </Provider>
);

layoutEngine.activate();
start();
