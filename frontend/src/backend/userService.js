import {
    appFetch,
    config,
    getServiceToken,
    removeServiceToken,
    setReauthenticationCallback,
    setServiceToken
} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/user/login', config('POST', {userName, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors
    );

export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    return appFetch('/user/loginFromServiceToken', config('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );

}

export const logout = () => removeServiceToken();

export const updateProfile = (user, onSuccess, onErrors) =>
    appFetch(`/user/${user.id}`, config('PUT', user),
        onSuccess, onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess,
                               onErrors) =>
    appFetch(`/user/${id}/changePassword`,
        config('POST', {oldPassword, newPassword}),
        onSuccess, onErrors);