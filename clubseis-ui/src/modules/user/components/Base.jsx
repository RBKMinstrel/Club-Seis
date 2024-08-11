import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

import Logo from "../../../assets/logo.png";
import LogoClubSeis from "../../../assets/LogoClubSeis.png";
import "./Base.css";
import {NavSidebar} from "../../common";

import * as selector from "../selectors.js";
import {useIntl} from "react-intl";

const Base = () => {
    const intl = useIntl();
    const userName = useSelector(selector.getUserName);

    const items = [
        {
            name: intl.formatMessage({id: "project.user.Base.accounting"}),
            url: "/gestion/contabilidad",
            subItems: [
                {
                    name: intl.formatMessage({id: "project.user.Base.transactions"}),
                    url: "/gestion/contabilidad/asientos"
                },
                {
                    name: intl.formatMessage({id: "project.global.fields.registeredName"}),
                    url: "/gestion/contabilidad/razones-sociales"
                },
                {
                    name: intl.formatMessage({id: "project.global.fields.concepts"}),
                    url: "/gestion/contabilidad/conceptos"
                },
                {
                    name: intl.formatMessage({id: "project.global.fields.categories"}),
                    url: "/gestion/contabilidad/categorias"
                },
                {
                    name: intl.formatMessage({id: "project.global.fields.accounts"}),
                    url: "/gestion/contabilidad/cuentas"
                },
                {name: intl.formatMessage({id: "project.user.Base.summary"}), url: "/gestion/contabilidad/resumen"},
                {name: intl.formatMessage({id: "project.user.Base.bills"}), url: "/gestion/contabilidad/facturas"},
            ]
        },
        {
            name: intl.formatMessage({id: "project.user.Base.merchandise"}),
            url: "/gestion/mercancias",
            subItems: [
                {name: intl.formatMessage({id: "project.user.Base.articles"}), url: "/gestion/mercancias/articulos"},
                {name: intl.formatMessage({id: "project.user.Base.stock"}), url: "/gestion/mercancias/stock"},
                {name: intl.formatMessage({id: "project.user.Base.demand"}), url: "/gestion/mercancias/demanda"},
                {name: intl.formatMessage({id: "project.user.Base.orders"}), url: "/gestion/mercancias/pedidos"},
            ]
        },
        {
            name: intl.formatMessage({id: "project.admin.MainAdmin.users"}),
            url: "/gestion/admin",
            subItems: []
        },
        {
            name: intl.formatMessage({id: "project.user.Base.config"}),
            url: "/gestion/configuracion",
            subItems: []
        },
        {
            name: intl.formatMessage({id: "project.user.Base.profile"}),
            url: "/gestion/mi-perfil",
            subItems: []
        }
    ];

    return (
        <div className="body">
            <header className="header">
                <Link to="/gestion">
                    <img
                        src={LogoClubSeis}
                        className="logo"
                    />
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