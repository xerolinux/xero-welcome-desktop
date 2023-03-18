import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./style.css";

import Welcome from "./screens/welcome";
import Applications from "./screens/applications";
import Drivers from "./screens/drivers";
import Faq from "./screens/faq";
import ErrorPage from "./screens/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/apps",
    element: <Applications />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/drivers",
    element: <Drivers />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/faq",
    element: <Faq />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
