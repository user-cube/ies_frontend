import Login from "views/Login.jsx";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    redirect: true, path: "/", to: "/login"
  },
];
export default routes;