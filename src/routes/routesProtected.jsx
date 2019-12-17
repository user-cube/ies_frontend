import {lazy} from "react";

const Home = lazy(() => import("views/Home.jsx"));
const Logout = lazy(() => import("views/Logout.jsx"));
const Acessos = lazy(() => import("views/Acessos.jsx"));
const AnaliseTemp = lazy(() => import("views/AnaliseTemp.jsx"));
const AnaliseCO2 = lazy(() => import("views/AnaliseCO2.jsx"));
const AnaliseAcessos = lazy(() => import("views/AnaliseAcessos.jsx"));
const AnaliseHumidade = lazy(() => import("views/AnaliseHumidade.jsx"));

var routes = [
    {
        path: "/auth/home",
        name: "Home",
        sidebar: true,
        icon: "fas fa-home",
        component: Home,
    },{
        path: "/auth/analiseAcessos",
        name: "Análise de acessos",
        sidebar: true,
        icon: "fas fa-user-lock",
        component: AnaliseAcessos,
    },
    {
        path: "/auth/acessos",
        name: "Gestão de acessos",
        sidebar: true,
        icon: "fas fa-user-cog",
        component: Acessos,
    },{
        path: "/auth/analiseCO2",
        name: "Análise de CO2",
        sidebar: true,
        icon: "fab fa-cloudversify",
        component: AnaliseCO2,
    },
    {
        path: "/auth/analiseHumidity",
        name: "Análise de Humidade",
        sidebar: true,
        icon: "fas fa-tint",
        component: AnaliseHumidade,
    },
    {
        path: "/auth/analiseTemp",
        name: "Análise de Temperatura",
        sidebar: true,
        icon: "fas fa-temperature-high",
        component: AnaliseTemp,
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
