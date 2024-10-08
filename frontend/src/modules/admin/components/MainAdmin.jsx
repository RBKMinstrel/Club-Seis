import {useDispatch, useSelector} from 'react-redux';

import {DataGrid, Pagination} from '../../common';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

import * as actions from '../actions';
import * as selectors from '../selectors';
import * as userSelectors from '../../user/selectors';

const MainAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectors.getUserSearch);
    const roles = useSelector(selectors.getRoles);
    const myUser = useSelector(userSelectors.getUserName);

    const [forceUpdate, setForceUpdate] = useState(false);
    const [loading, setLoading] = useState(true);

    const sizeOptions = [
        {label: "6", value: 6},
        {label: "12", value: 12},
        {label: "24", value: 24},
        {label: "48", value: 48},
    ];

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    useEffect(() => {
        dispatch(actions.findAllRoles());
    }, [dispatch]);

    useEffect(() => {
        setPage(0);
        setForceUpdate((prev) => !prev);
    }, [size]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.findUsers({
            size: size,
            page: page,
        }));
        setLoading(false);
    }, [page, forceUpdate]);

    const getRowId = (row) => "user-id-" + row.id;
    const columns = {
        usuario: {
            header: () => <h4><FormattedMessage id="project.admin.MainAdmin.user"/></h4>,
            cell: (user) => <p>{user.userName}</p>,
        },
        nombre: {
            header: () => <h4><FormattedMessage id="project.global.fields.firstName"/></h4>,
            cell: (user) => <p>{user.firstName}</p>,
        },
        apellidos: {
            header: () => <h4><FormattedMessage id="project.global.fields.lastName"/></h4>,
            cell: (user) => <p>{user.lastName}</p>,
        },
        roles: {
            header: () => <h4><FormattedMessage id="project.global.fields.roles"/></h4>,
            cell: (user) => {
                return (
                    <p>{user.rolesIds.map(id => selectors.getRolName(roles, id)).join(", ")}</p>
                );
            },
        },
        acciones: {
            header: () => <h4><FormattedMessage id="project.global.fields.actions"/></h4>,
            cell: (user) => {
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

                const isAdmin = user.userName === myUser;
                return !isAdmin ? (
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
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <div style={{display: "flex", justifyContent: "space-between", alignContent: "center", width: "100%"}}>
                <h2><FormattedMessage id="project.admin.MainAdmin.users"/></h2>
                <Link to={'/gestion/admin/create-user'}>
                    <span
                        className="fa-solid fa-circle-plus link-out"
                        style={{color: "black", fontSize: '20px'}}
                    />
                </Link>
            </div>
            <DataGrid
                dataList={users ? users.items : []}
                getRowId={getRowId}
                columns={columns}
                loading={loading}
            >
                <Pagination
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    sizeOptions={sizeOptions}
                    actualItems={users ? users.items.length : 0}
                    totalItems={users ? users.totalItems : 0}
                />
            </DataGrid>
        </div>
    );

}

export default MainAdmin;