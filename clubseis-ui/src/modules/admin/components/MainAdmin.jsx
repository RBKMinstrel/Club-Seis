import {useDispatch, useSelector} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';
import Users from './Users';
import {useEffect} from "react";
import {Link} from "react-router-dom";

const MainAdmin = () => {

    const userSearch = useSelector(selectors.getUserSearch);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(actions.findAllRoles());
        dispatch(actions.findUsers({page: 0}));

        return () => dispatch(actions.clearUsersSearch());

    }, [dispatch]);

    if (!userSearch) {
        return null;
    }

    if (userSearch.result.items.length === 0) {
        return (
            <div role="alert">
                No existen usuarios
            </div>
        );
    }

    return (

        <div className="center-content-column">
            <Link to={'/gestion/admin/create-user'}>
                + Añadir usuario
            </Link>
            <br/>
            <br/>
            <Users users={userSearch.result.items}/>
            <Pager
                back={{
                    enabled: userSearch.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindUsersResultPage(userSearch.criteria))
                }}
                next={{
                    enabled: userSearch.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindUsersResultPage(userSearch.criteria))
                }}/>
        </div>

    );

}

export default MainAdmin;