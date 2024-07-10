import user from "../../user";
import {useSelector} from "react-redux";

const Visible = ({roles, children}) => {

    const userRoles = useSelector(user.selectors.getUserRoles);

    if (!roles.every(rol => userRoles.includes(rol))) {
        return null;
    }

    return children;

}

export default Visible;