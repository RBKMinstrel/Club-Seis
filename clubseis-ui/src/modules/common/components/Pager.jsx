import PropTypes from 'prop-types';

const Pager = ({back, next}) => (

    <nav aria-label="page navigation">
        <ul>

            {back.enabled &&
                <li>
                    <button onClick={back.onClick}>
                        Anterior
                    </button>
                </li>
            }
            {next.enabled &&
                <li>
                    <button onClick={next.onClick}>
                        Siguiente
                    </button>
                </li>
            }
        </ul>
    </nav>

);

Pager.propTypes = {
    back: PropTypes.object.isRequired,
    next: PropTypes.object.isRequired
};

export default Pager;