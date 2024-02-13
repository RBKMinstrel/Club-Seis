import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import user from "../index.js";

import "./Base.css";
import appLogo from "../../../../public/logo.png";

const Base = () => {

    const roles = useSelector(user.selectors.getUserRoles);

    return (
        <div>
            <header className="cabezera row">
                <div className="logo">
                    <Link to="/gestion">
                        <img src={appLogo}/>
                    </Link>
                    <p>
                        Seis Do Nadal
                    </p>
                </div>
                <div className="funciones">
                    <Link to="/gestion/update-profile">
                        Actualizar perfil
                    </Link>
                    <Link to="/gestion/change-password">
                        Cambiar contraseña
                    </Link>
                    <Link to="/gestion/logout">
                        Logout
                    </Link>

                </div>
            </header>
            <div className="sidenav">
                <nav>
                    {roles.includes('ADMIN') &&
                        <Link to="/gestion/admin">
                            Admin
                        </Link>
                    }
                </nav>
            </div>
            <main className="content">
                <Outlet/>
            </main>
        </div>
    );

}

export default Base