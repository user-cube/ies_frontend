import { lazy } from "react";
const Home = lazy(() => import("views/Home.jsx"));
const Logout = lazy(() => import("views/Logout.jsx"));
const Acessos = lazy(() => import("views/Acessos.jsx"));
const CO2 = lazy(() => import("views/CO2.jsx"));
const Temperatura = lazy(() => import("views/Temperatura.jsx"));

var routes = [
    {
        path: "/auth/home",
        name: "Home",
        sidebar: true,
        icon: "fas fa-home",
        component: Home,
    },
    {
        path: "/auth/acessos",
        name: "Gestão de acessos",
        sidebar: true,
        icon: "fas fa-user-cog",
        component: Acessos,
    },
    {
        path: "/auth/co2",
        name: "CO2",
        sidebar: true,
        icon: "fas fa-cloud",
        component: CO2,
    },
    {
        path: "/auth/temperatura",
        name: "Temperatura",
        sidebar: true,
        icon: "fas fa-thermometer-full",
        component: Temperatura,
    },
    {
        path: "/auth/logout",
        name: "Logout",
        sidebar: true,
        icon: "fas fa-sign-out-alt",
        component: Logout,
    },
    {
        redirect: true, path: "/", to: "/home"
    },
];
export default routes;
