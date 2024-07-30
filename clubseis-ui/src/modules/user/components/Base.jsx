import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

import Logo from "../../../assets/logo.png";
import "./Base.css";
import {NavSidebar} from "../../common";

import * as selector from "../selectors.js";

const Base = () => {
    const userName = useSelector(selector.getUserName);

    const items = [
        {
            name: "Contabilidad",
            url: "/gestion/contabilidad",
            subItems: [
                {name: "Movimientos", url: "/gestion/contabilidad/asientos"},
                {name: "Razón Social", url: "/gestion/contabilidad/razones-sociales"},
                {name: "Conceptos", url: "/gestion/contabilidad/conceptos"},
                {name: "Categorías", url: "/gestion/contabilidad/categorias"},
                {name: "Cuentas", url: "/gestion/contabilidad/cuentas"},
                {name: "Resumen", url: "/gestion/contabilidad/resumen"},
                {name: "Facturas", url: "/gestion/contabilidad/facturas"},
            ]
        },
        {
            name: "Mercancías",
            url: "/gestion/mercancias",
            subItems: [
                {name: "Articulos", url: "/gestion/mercancias/articulos"},
                {name: "Stock", url: "/gestion/mercancias/stock"},
                {name: "Demanda", url: "/gestion/mercancias/demanda"},
                {name: "Pedidos", url: "/gestion/mercancias/pedidos"},
            ]
        },
        {
            name: "Usuarios",
            url: "/gestion/admin",
            subItems: []
        },
        {
            name: "Configuracion",
            url: "/gestion/configuracion",
            subItems: []
        },
        {
            name: "Mi perfil",
            url: "/gestion/mi-perfil",
            subItems: []
        }
    ];

    return (
        <div className="body">
            <header className="header">
                <Link to="/gestion">
                    <div className="logo" style={{backgroundColor: "red"}}/>
                </Link>
                <div className="headerContent">
                    <div className="logoClub">
                        <img src={Logo} alt="Logo Seis do nadal"/>
                        <h1>Seis do Nadal</h1>
                    </div>
                    <div className="userInfo">
                        <h2>{userName}</h2>
                        <Link to="/gestion/logout">
                            <span
                                className="fa-solid fa-arrow-right-from-bracket link-out"
                                style={{color: "white", fontSize: 20}}
                            />
                        </Link>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="navigation">
                    <NavSidebar items={items}/>
                </div>
                <main className="main">
                    <div className="section">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );

}

export default Base