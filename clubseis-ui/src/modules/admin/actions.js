import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import backend from '../../backend';

const findAllRolesCompleted = roles => ({
    type: actionTypes.FIND_ALL_ROLES_COMPLETED,
    roles
});

export const findAllRoles = () => (dispatch, getState) => {

    const roles = selectors.getRoles(getState());

    if (!roles) {

        backend.adminService.findAllRoles(
            roles => dispatch(findAllRolesCompleted(roles))
        );

    }

}

const findUsersCompleted = userSearch => ({
    type: actionTypes.FIND_USERS_COMPLETED,
    userSearch
});

export const findUsers = criteria => dispatch => {

    backend.adminService.findUsers(criteria,
        result => dispatch(findUsersCompleted({criteria, result})));

}

export const previousFindUsersResultPage = criteria =>
    findUsers({...criteria, page: criteria.page - 1});

export const nextFindUsersResultPage = criteria =>
    findUsers({...criteria, page: criteria.page + 1});

export const clearUsersSearch = () => ({
    type: actionTypes.CLEAR_USERS_SEARCH
});

const findUserByIdCompleted = user => ({
    type: actionTypes.FIND_USER_BY_ID_COMPLETED,
    user
});

export const findUserById = id => dispatch => {
    backend.adminService.findByUserId(id,
        user => dispatch(findUserByIdCompleted(user)));
}

export const clearUser = () => ({
    type: actionTypes.CLEAR_USER
});

export const createUser = (user, onSuccess, onErrors) => () =>
    backend.adminService.createUser(user, onSuccess, onErrors);