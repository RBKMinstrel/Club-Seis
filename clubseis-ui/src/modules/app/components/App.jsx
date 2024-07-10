import './App.css';

import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";

import user, {Base, BaseIndex, ChangePassword, Login, Logout, UpdateProfile} from "../../user";
import {DeleteUser, MainAdmin, UpdateUser, UserForm} from "../../admin";
import {
    Categorias,
    Conceptos,
    ContabilidadBase,
    CreateMovimiento,
    Cuentas,
    DeleteMovimiento,
    LoadUpdateMovimiento,
    MovimientoDetails,
    Movimientos,
    RazonesSociales,
    Resumen,
    UpdateMovimiento
} from "../../contabilidad";
import {
    MercanciaBase,
    FindArticulos,
    FindExistencias,
    CrearArticulo, Carrito,
} from "../../mercancias";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(user.actions.tryLoginFromServiceToken(
            () => dispatch(user.actions.logout())));

    }, [dispatch]);

    const loggedIn = useSelector(user.selectors.isLoggedIn);
    const roles = useSelector(user.selectors.getUserRoles);

    return (
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
                            <Route index element={<Movimientos/>}/>
                            <Route path="asientos/">
                                <Route index element={<Movimientos/>}/>
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
                    <Route path="mercancias/" element={<MercanciaBase/>}>
                        <Route index element={<FindArticulos/>}/>
                        <Route path="articulos">
                            <Route index element={<FindArticulos/>}/>
                            <Route path="carrito" element={<Carrito/>}/>
                        </Route>
                        <Route path="stock/">
                            <Route index element={<FindExistencias/>}/>
                            <Route path="crearArticulo" element={<CrearArticulo/>}/>
                        </Route>
                    </Route>
                </Route>
            }
        </Routes>
    );
}

export default App
