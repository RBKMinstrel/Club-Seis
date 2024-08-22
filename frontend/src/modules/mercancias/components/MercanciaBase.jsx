import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import * as actions from '../actions';

const MercanciaBase = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.findAllTallas())
    }, []);

    return (
        <div>
            <Outlet/>
        </div>
    );

}

export default MercanciaBase;