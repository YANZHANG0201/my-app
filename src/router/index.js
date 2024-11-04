import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home/index";
import Mall from "../pages/mall/index";
import User from "../pages/user/index";
import PageOne from "../pages/other/page1";
import PageTwo from "../pages/other/page2";
import Login from "../pages/login/index";

const routes = [
  {
    path: "/",
    Component: Main,
    children: [
      //重定向
      {
        path: "/",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "mall",
        Component: Mall,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "other",
        children: [
          {
            path: "page1",
            Component: PageOne,
          },
          {
            path: "page2",
            Component: PageTwo,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
];

export default createBrowserRouter(routes);
