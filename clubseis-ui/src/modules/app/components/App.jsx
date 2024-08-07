import './App.css';

import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";

import user, {Base, BaseIndex, ChangePassword, Login, Logout, UpdateProfile} from "../../user";
import {DeleteUser, MainAdmin, UpdateUser, UserForm} from "../../admin";
import {
    CategoriaPage,
    ConceptoPage,
    ContabilidadBase,
    CreateFactura,
    CreateMovimiento,
    CreateRecibi,
    CuentaPage,
    DeleteMovimiento,
    FacturasSearch,
    LoadUpdateMovimiento,
    MovimientoDetails,
    Movimientos,
    RazonSocialPage,
    Resumen,
    UpdateMovimiento,
} from "../../contabilidad";
import {
    Carrito,
    CrearArticulo,
    Demanda,
    FindArticulos,
    FindExistencias,
    MercanciaBase,
    Pedidos,
    UpdateArticulo,
} from "../../mercancias";
import {Configuration} from "../../configuracion";

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
                            <Route path="facturas">
                                <Route index element={<FacturasSearch/>}/>
                                <Route path="crearRecibi" element={<CreateRecibi/>}/>
                                <Route path="crearFactura" element={<CreateFactura/>}/>
                            </Route>
                            <Route path="conceptos" element={<ConceptoPage/>}/>
                            <Route path="cuentas" element={<CuentaPage/>}/>
                            <Route path="categorias" element={<CategoriaPage/>}/>
                            <Route path="razones-sociales" element={<RazonSocialPage/>}/>
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
                            <Route path="actualizarArticulo/:id" element={<UpdateArticulo/>}/>
                        </Route>
                        <Route path="demanda" element={<Demanda/>}/>
                        <Route path="pedidos" element={<Pedidos/>}/>
                    </Route>
                    <Route path="configuracion" element={<Configuration/>}/>
                </Route>
            }
        </Routes>
    );
}

export default App
