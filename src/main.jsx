import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Contacts from "./routes/Contacts";
import Index from "./routes/Index";

import { loader as rootLoader, action as rootAction } from "./routes/Root";
import {
  loader as contactsLoader,
  action as contactsAction,
  destroy as contactsDestroy,
  favoriteAction,
} from "./routes/Contacts";
import EditContact from "./routes/EditContact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/contacts/:id",
            element: <Contacts />,
            loader: contactsLoader,
            action: favoriteAction,
          },
          {
            path: "/contacts/:id/edit",
            element: <EditContact />,
            loader: contactsLoader,
            action: contactsAction,
          },
          {
            path: "/contacts/:id/destroy",
            action: contactsDestroy,
            errorElement: <h1>SORRY, SOMTHING WENT WRONG!!!</h1>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
