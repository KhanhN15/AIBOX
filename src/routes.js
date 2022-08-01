import { Navigate, useRoutes } from "react-router-dom";

import Home from "./pages/Home";
import Result from "./pages/Result";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/result",
      element: <Result />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
