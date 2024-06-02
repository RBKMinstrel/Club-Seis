import {useDispatch, useSelector} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {DataGrid} from '../../common';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const MainAdmin = () => {

    const users = useSelector(selectors.getUserSearch);
    const criteria = users ? users.criteria : {};
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const getRowId = (row) => "mov-" + row.id;

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    const resetPage = () => setPage(0);

    useEffect(() => {

        dispatch(actions.findAllRoles());

    }, [dispatch]);

    useEffect(() => {
        setLoading(true);
        resetPage();
        dispatch(actions.findUsers({...criteria, size: size, page: 0}));
        setLoading(false);
    }, [dispatch, size]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.findUsers({...criteria, page: page}));
        setLoading(false);
    }, [dispatch, page]);

    const columns = {
        usuario: {
            header: () => <h4>Usuario</h4>,
            cell: (user) => <p>{user.userName}</p>,
        },
        nombre: {
            header: () => <h4>Nombre</h4>,
            cell: (user) => <p>{user.firstName}</p>,
        },
        apellidos: {
            header: () => <h4>Apellidos</h4>,
            cell: (user) => <p>{user.lastName}</p>,
        },
        roles: {
            header: () => <h4>Roles</h4>,
            cell: (user) => {
                const roles = useSelector(selectors.getRoles);
                return (
                    <p>{user.rolesIds.map(id => selectors.getRolName(roles, id)).join(", ")}</p>
                );
            },
        },
        acciones: {
            header: () => <h4>Acciones</h4>,
            cell: (user) => {
                const roles = useSelector(selectors.getRoles);
                const dispatch = useDispatch();
                const navigate = useNavigate();

                const updateClick = (id) => {
                    dispatch(actions.findUserById(id,
                        () => navigate(`/gestion/admin/update`))
                    );
                }

                const deleteClick = (id) => {
                    dispatch(actions.findUserById(id,
                        () => navigate(`/gestion/admin/delete`))
                    );
                }

                const isAdmin = user.rolesIds.map(
                    id => selectors.getRolName(roles, id)
                ).includes('ADMIN');
                return isAdmin ? (
                    <div className="row" style={{justifyContent: "flex-start", gap: 10}}>
                        <span
                            onClick={() => updateClick(user.id)}
                            style={{color: "black", fontSize: '20px'}}
                            className="fa-regular fa-pen-to-square link-out"
                        />
                        <span
                            onClick={() => deleteClick(user.id)}
                            style={{color: "black", fontSize: '20px'}}
                            className="fa-solid fa-trash link-out"
                        />
                    </div>
                ) : (
                    <div/>
                );
            },
        },
    };

    return (
        <div className="main-admin">
            <div style={{display: "flex", justifyContent: "space-between", alignContent: "center", width: "100%"}}>
                <h2>Usuarios</h2>
                <Link to={'/gestion/admin/create-user'}>
                    <span
                        className="fa-solid fa-circle-plus link-out"
                        style={{color: "black", fontSize: '20px'}}
                    />
                </Link>
            </div>
            <DataGrid
                dataList={users ? users.result.items : []}
                height={400}
                getRowId={getRowId}
                columns={columns}
                loading={loading}
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                total={users ? users.result.totalItems : 0}
            />
        </div>
    );

}

export default MainAdmin;