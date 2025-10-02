import React, { useEffect, useState } from "react";
import CustomerHome from "./pages/CustomerHome";

export default function Root(props) {
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/customer"
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div>
      {path === "/customer/home" && <CustomerHome {...props} />}
      {/* add other customer routes here later */}
    </div>
  );
}
