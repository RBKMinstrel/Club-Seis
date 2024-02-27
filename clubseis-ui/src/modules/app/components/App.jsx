import './App.css'

import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";

import user, {Base, BaseIndex, ChangePassword, Login, Logout, UpdateProfile} from "../../user";
import {DeleteUser, MainAdmin, UpdateUser, UserForm} from "../../admin";

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
                        <Route path="/gestion/update-profile" element={<UpdateProfile/>}/>
                        <Route path="/gestion/change-password" element={<ChangePassword/>}/>
                        <Route path="/gestion/logout" element={<Logout/>}/>
                        {roles.includes('ADMIN') && <Route path="admin" element={<MainAdmin/>}/>}
                        {roles.includes('ADMIN') && <Route path="admin/create-user" element={<UserForm/>}/>}
                        {roles.includes('ADMIN') && <Route path="admin/update" element={<UpdateUser/>}/>}
                        {roles.includes('ADMIN') && <Route path="admin/delete" element={<DeleteUser/>}/>}
                    </Route>
                }
            </Routes>
        </div>
    );
}

export default App
