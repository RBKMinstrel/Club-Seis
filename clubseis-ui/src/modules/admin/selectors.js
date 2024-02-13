const getModuleState = state => state.admin;

export const getRoles = state =>
    getModuleState(state).roles;

export const getRolName = (roles, id) => {

    if (!roles) {
        return '';
    }

    const rol = roles.find(rol => rol.id === id);

    if (!rol) {
        return '';
    }

    return rol.name;

}

export const getUserSearch = state =>
    getModuleState(state).userSearch;

export const getUser = state =>
    getModuleState(state).user;