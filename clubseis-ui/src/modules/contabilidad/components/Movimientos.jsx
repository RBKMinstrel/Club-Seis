import {FormattedDate} from "react-intl";
import {Link} from "react-router-dom";

import {AiTwotoneDelete, AiTwotoneEdit, AiTwotoneEye} from "react-icons/ai";

const Movimientos = ({movimientos}) => {

    return (
        <table className="custom-table">

            <thead>
            <tr>
                <th scope="col">
                    Fecha
                </th>
                <th scope="col">
                    Tipo
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
                <th scope="col">
                    Acciones
                </th>
            </tr>
            </thead>

            <tbody>
            {movimientos.map(movimiento =>
                <tr key={movimiento.id}>
                    <td>
                        <FormattedDate value={new Date(movimiento.fecha * (1000 * 60 * 60 * 24))}/>
                    </td>
                    <td>
                        {
                            movimiento.gasto
                                ? (<p>Gasto</p>)
                                : (<p>Ingreso</p>)
                        }
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
                        <p>{movimiento.total}</p>
                    </td>
                    <td>
                        <div className="row" style={{justifyContent: "space-around"}}>
                            <Link to={`${movimiento.id}`}>
                                <AiTwotoneEye size="1.5em"/>
                            </Link>
                            <Link to={`update-load/${movimiento.id}`}>
                                <AiTwotoneEdit size="1.5em"/>
                            </Link>
                            <Link to={`delete/${movimiento.id}`}>
                                <AiTwotoneDelete size="1.5em"/>
                            </Link>
                        </div>
                    </td>
                </tr>
            )}
            </tbody>

        </table>
    );
}

export default Movimientos;