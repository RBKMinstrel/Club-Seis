import PropTypes from 'prop-types';

import {Link} from "react-router-dom"
import * as selectors from '../selectors';
import {useSelector} from "react-redux";

const Users = ({users}) => {
    const roles = useSelector(selectors.getRoles);

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