import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const Errors = ({errors, onClose}) => {

    const intl = useIntl();

    if (!errors) {
        return null;
    }

    let globalError;
    let fieldErrors;

    if (errors.globalError) {
        globalError = errors.globalError;
    } else if (errors.fieldErrors) {
        fieldErrors = [];
        errors.fieldErrors.forEach(e => {
            let fieldName = intl.formatMessage({id: `project.global.fields.${e.fieldName}`});
            fieldErrors.push(`${fieldName}: ${e.message}`)
        });

    }

    return (

        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}} role="alert">

            {globalError ? globalError : ''}

            {fieldErrors ?
                <ul>
                    {fieldErrors.map((fieldError, index) =>
                        <li key={index}>{fieldError}</li>
                    )}
                </ul>
                :
                ''
            }

            <button type="button" data-dismiss="alert" aria-label="Close"
                    onClick={() => onClose()}>
                <span aria-hidden="true">&times;</span>
            </button>

        </div>

    );

}

Errors.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClose: PropTypes.func.isRequired
};

export default Errors;