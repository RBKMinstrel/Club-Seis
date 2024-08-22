import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    roles: null,
    userSearch: null,
    user: null,
};

const roles = (state = initialState.roles, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_ROLES_COMPLETED:
            return action.roles;

        default:
            return state;

    }

}

const userSearch = (state = initialState.userSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_USERS_COMPLETED:
            return action.userSearch;

        case actionTypes.CLEAR_USERS_SEARCH:
            return initialState.userSearch;

        default:
            return state;

    }

}

const user = (state = initialState.user, action) => {

    switch (action.type) {

        case actionTypes.FIND_USER_BY_ID_COMPLETED:
            return action.user;

        case actionTypes.CLEAR_USER:
            return initialState.user;

        default:
            return state;

    }

}

const reducer = combineReducers({
    roles,
    userSearch,
    user
});

export default reducer;