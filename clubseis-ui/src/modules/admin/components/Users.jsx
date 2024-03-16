import PropTypes from 'prop-types';

import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from '../selectors';
import * as actions from '../actions';

const Users = ({users}) => {
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

    if (!users || users.length === 0) {
        return (
            <div role="alert">
                No existen usuarios. Felicidades, lograste algo imposible.
            </div>
        );
    }

    return (
        <table className="custom-table">

            <thead>
            <tr>
                <th scope="col">
                    Usuario
                </th>
                <th scope="col">
                    Nombre
                </th>
                <th scope="col">
                    Apellidos
                </th>
                <th scope="col">
                    Roles
                </th>
                <th scope="col">
                    Acciones
                </th>
            </tr>
            </thead>

            <tbody>
            {users.map(user =>
                <tr key={user.id}>
                    <td>
                        <Link to={`/gestion/admin/${user.id}`}>
                            {user.userName}
                        </Link>
                    </td>
                    <td>
                        <p>{user.firstName}</p>
                    </td>
                    <td>
                        <p>{user.lastName}</p>
                    </td>
                    <td>
                        <p>{user.rolesIds.map(id => selectors.getRolName(roles, id)).join(", ")}</p>
                    </td>
                    <td>
                        {user.rolesIds.map(id => selectors.getRolName(roles, id)).includes('ADMIN') ?
                            (
                                <p>El usuario es administrador</p>
                            ) : (
                                <div className="acciones">
                                    <button onClick={() => updateClick(user.id)}>
                                        Editar
                                    </button>
                                    <button onClick={() => deleteClick(user.id)}>
                                        Borrar
                                    </button>
                                </div>
                            )
                        }
                    </td>
                </tr>
            )}
            </tbody>

        </table>
    );

};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;