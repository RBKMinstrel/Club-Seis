import {appFetch, config, removeServiceToken, setReauthenticationCallback, setServiceToken} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/user/login', config('POST', {userName, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors
    );

export const logout = () => removeServiceToken();