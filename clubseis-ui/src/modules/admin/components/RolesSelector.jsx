import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import * as selectors from '../selectors';

const RolesSelector = (selectProps) => {

    const categories = useSelector(selectors.getRoles);

    return (

        <select {...selectProps}>

            {categories && categories.map(rol =>
                <option key={rol.id} value={rol.id}>{rol.name}</option>
            )}

        </select>

    );

}

RolesSelector.propTypes = {
    selectProps: PropTypes.object
};

export default RolesSelector;