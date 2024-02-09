import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {IntlProvider} from "react-intl";

import store from './store';
import app, {App} from './modules/app';
import backend, {NetworkError} from './backend';
import {initReactIntl} from './i18n';
import './index.css';

/* Configure backend proxy. */
backend.init(() => store.dispatch(app.actions.error(new NetworkError())));

/*Configure i18n.*/
const {locale, messages} = initReactIntl();

/*Render aplication*/
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                <BrowserRouter basename="/club-seis">
                    <App/>
                </BrowserRouter>
            </IntlProvider>
        </Provider>
    </React.StrictMode>,
)
