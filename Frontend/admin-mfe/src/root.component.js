import React, { useEffect, useState } from "react";
import AdminHome from "./pages/AdminHome";

export default function Root(props) {
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/admin"
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div>
      {path === "/admin" && <AdminHome {...props} />}
    </div>
  );
}
