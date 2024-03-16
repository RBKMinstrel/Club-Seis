import {FormattedDate} from "react-intl";
import {Link} from "react-router-dom";

const Movimientos = ({movimientos}) => {

    return (
        <table className="custom-table">

            <thead>
            <tr>
                <th scope="col">
                    Fecha
                </th>
                <th scope="col">
                    <Link to="/gestion/contabilidad/razones-sociales">
                        Razon Social
                    </Link>
                </th>
                <th scope="col">
                    <Link to="/gestion/contabilidad/conceptos">
                        Concepto
                    </Link>
                </th>
                <th scope="col">
                    <Link to="/gestion/contabilidad/categorias">
                        Categoría
                    </Link>
                </th>
                <th scope="col">
                    <Link to="/gestion/contabilidad/cuentas">
                        Cuenta
                    </Link>
                </th>
                <th scope="col">
                    Total
                </th>
            </tr>
            </thead>

            <tbody>
            {movimientos.map(movimiento =>
                <tr key={movimiento.id}>
                    <td>
                        <FormattedDate value={new Date(movimiento.fecha)}/>
                    </td>
                    <td>
                        <p>{movimiento.razonSocial}</p>
                    </td>
                    <td>
                        <p>{movimiento.concepto}</p>
                    </td>
                    <td>
                        <p>{movimiento.categoria}</p>
                    </td>
                    <td>
                        <p>{movimiento.cuenta}</p>
                    </td>
                    <td>
                        <p>{movimiento.gasto ? (-1 * movimiento.total) : movimiento.total}</p>
                    </td>
                </tr>
            )}
            </tbody>

        </table>
    );
}

export default Movimientos;