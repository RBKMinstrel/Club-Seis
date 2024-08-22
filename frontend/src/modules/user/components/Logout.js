import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import user from '../../user';

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(user.actions.logout());
        navigate('/');
    }, [dispatch, navigate]);

    return null;

}

export default Logout;