import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import user from "../index.js";

import "./Base.css";
import appLogo from "../../../assets/logo.png";

const Base = () => {

    const roles = useSelector(user.selectors.getUserRoles);

    return (
        <div className="general">
            <header className="header">
                <div className="top-header">
                    <Link className="logo" to="/gestion">
                        <img src={appLogo}/>
                    </Link>
                    <h1>
                        Seis Do Nadal
                    </h1>
                    <div className="funciones">
                        <Link to="/gestion/update-profile">
                            Actualizar perfil
                        </Link>
                        <Link to="/gestion/change-password">
                            Cambiar contraseña
                        </Link>
                        <Link to="/gestion/logout">
                            Desconectarse
                        </Link>
                    </div>
                </div>
                <nav className="top-subnav">
                    {roles.includes('ADMIN') &&
                        <div>
                            <Link to="/gestion/admin">
                                Admin
                            </Link>
                        </div>
                    }
                    {roles.includes('TESORERO') &&
                        <div>
                            <Link to="/gestion/contabilidad">
                                Contabilidad
                            </Link>
                        </div>
                    }
                </nav>
            </header>
            <main className="content">
                <Outlet/>
            </main>
        </div>
    );

}

export default Base