const getModuleState = state => state.user;

export const getUser = state =>
    getModuleState(state).user;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getUserName = state =>
    isLoggedIn(state) ? getUser(state).userName : null;

export const getUserRoles = state =>
    isLoggedIn(state) ? getUser(state).roles : [];