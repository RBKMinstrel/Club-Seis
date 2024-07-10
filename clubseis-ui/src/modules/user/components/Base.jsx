import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

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
                {name: "Resumen", url: "/gestion/contabilidad/resumen"}
            ]
        },
        {
            name: "Facturas",
            url: "/gestion/facturas",
            subItems: []
        },
        {
            name: "Mercancías",
            url: "/gestion/mercancias",
            subItems: [
                {name: "Articulos", url: "/gestion/mercancias/articulos"},
                {name: "Stock", url: "/gestion/mercancias/stock"},
            ]
        },
        {
            name: "Usuarios",
            url: "/gestion/admin",
            subItems: []
        },
        {
            name: "Mi perfil",
            url: "/gestion/mi-perfil",
            subItems: []
        }
    ];

    return (
        <div className="patata" style={{display: "flex", height: "100vh"}}>
            <div style={{
                width: "12%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                flexDirection: "column"
            }}>
                <div style={{
                    display: "flex",
                    height: "80px",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    backgroundColor: "#7FB6E8"
                }}>
                    <Link to="/gestion">
                        <div style={{width: "100px", height: "40px", backgroundColor: "red"}}/>
                    </Link>
                </div>
                <NavSidebar style={{flex: 1}} items={items}/>
            </div>
            <div style={{width: "100%", height: "100%"}}>
                <header
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "80px",
                        backgroundColor: "#7FB6E8"
                    }}
                >
                    <div style={{display: "flex", alignItems: "center", gap: "25px", padding: "0 20px"}}>
                        <div>
                            Icono
                        </div>
                        <h1>Seis do Nadal</h1>
                    </div>
                    <div style={{display: "flex", alignItems: "center", gap: "25px", padding: "0 20px"}}>
                        <h2>{userName}</h2>
                        <Link to="/gestion/logout">
                            <span
                                className="fa-solid fa-arrow-right-from-bracket link-out"
                                style={{color: "black", fontSize: 20}}
                            />
                        </Link>
                    </div>
                </header>
                <main style={{
                    width: "100%",
                    height: "100%",
                    overflowX: "auto",
                    overflowY: "auto",
                    boxSizing: "border-box",
                    padding: 20
                }}>
                    <Outlet/>
                </main>
            </div>
        </div>
    );

}

export default Base