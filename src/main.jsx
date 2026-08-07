import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from './pages/About.jsx';
import Explore from './pages/Explore.jsx'
import Forecast from './pages/Forecast.jsx'
import NotFound from './pages/NotFound.jsx'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="explore" element={<Explore />} />
      <Route path="forecast" element={<Forecast />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);