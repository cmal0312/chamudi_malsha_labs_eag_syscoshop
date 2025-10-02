import React, { useEffect, useState } from "react";
import SupplierHome from "./pages/SupplierHome";
import {Provider} from "react-redux";
import store from "./redux/store";

export default function Root(props) {
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/supplier"
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <Provider store={store}>
    <div>
      {path === "/supplier/dashboard" && <SupplierHome {...props} />}
    </div>
    </Provider>
  );
}
