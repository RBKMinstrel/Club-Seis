import {appFetch, config} from './appFetch';

export const findAllRoles = (onSuccess) =>
    appFetch('/admin/roles', config('GET'), onSuccess);

export const findUsers = ({page}, onSuccess) =>
    appFetch(`/admin/users?page=${page}`, config('GET'), onSuccess);

export const findByUserId = (id, onSuccess) =>
    appFetch(`/admin/users/${id}`, config('GET'), onSuccess);

export const createUser = (user, onSuccess, onErrors) =>
    appFetch('/admin/users', config('POST', user), onSuccess, onErrors);