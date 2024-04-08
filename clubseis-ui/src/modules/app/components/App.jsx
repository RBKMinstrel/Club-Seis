import './App.css'

import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";

import user, {Base, BaseIndex, ChangePassword, Login, Logout, UpdateProfile} from "../../user";
import {DeleteUser, MainAdmin, UpdateUser, UserForm} from "../../admin";
import {
    BuscadorMovimientos,
    Categorias,
    Conceptos,
    ContabilidadBase,
    CreateMovimiento,
    Cuentas,
    DeleteMovimiento,
    LoadUpdateMovimiento,
    MovimientoDetails,
    RazonesSociales,
    Resumen,
    UpdateMovimiento
} from "../../contabilidad";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(user.actions.tryLoginFromServiceToken(
            () => dispatch(user.actions.logout())));

    }, [dispatch]);

    const loggedIn = useSelector(user.selectors.isLoggedIn);
    const roles = useSelector(user.selectors.getUserRoles);

    return (
        <div className="main">
            <Routes>
                <Route path="/*" element={<Login/>}/>
                {!loggedIn && <Route path="/gestion/login" element={<Login/>}/>}
                {loggedIn &&
                    <Route path="/gestion/" element={<Base/>}>
                        <Route index element={<BaseIndex/>}/>
                        <Route path="update-profile" element={<UpdateProfile/>}/>
                        <Route path="change-password" element={<ChangePassword/>}/>
                        <Route path="logout" element={<Logout/>}/>
                        {roles.includes('ADMIN') &&
                            <Route path="admin/">
                                <Route index element={<MainAdmin/>}/>
                                <Route path="create-user" element={<UserForm/>}/>
                                <Route path="update" element={<UpdateUser/>}/>
                                <Route path="delete" element={<DeleteUser/>}/>
                            </Route>
                        }
                        {roles.includes('TESORERO') &&
                            <Route path="contabilidad/" element={<ContabilidadBase/>}>
                                <Route index element={<BuscadorMovimientos/>}/>
                                <Route path="asientos/">
                                    <Route index element={<BuscadorMovimientos/>}/>
                                    <Route path="crear" element={<CreateMovimiento/>}/>
                                    <Route path="update-load/:id" element={<LoadUpdateMovimiento/>}/>
                                    <Route path="update" element={<UpdateMovimiento/>}/>
                                    <Route path="delete/:id" element={<DeleteMovimiento/>}/>
                                    <Route path=":id" element={<MovimientoDetails/>}/>
                                </Route>
                                <Route path="resumen" element={<Resumen/>}/>
                                <Route path="conceptos" element={<Conceptos/>}/>
                                <Route path="cuentas" element={<Cuentas/>}/>
                                <Route path="categorias" element={<Categorias/>}/>
                                <Route path="razones-sociales" element={<RazonesSociales/>}/>
                            </Route>
                        }
                    </Route>
                }
            </Routes>
        </div>
    );
}

export default App
