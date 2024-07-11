import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {  RouterProvider } from "react-router-dom";
import appRoutes from "./routes/routes";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRoutes} />
  </React.StrictMode>
);

reportWebVitals();
