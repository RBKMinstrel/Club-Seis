import {Link, Outlet} from "react-router-dom";

const ContabilidadBase = () => {

    return (
        <div>
            <div style={{marginRight: 20, display: 'flex', flexDirection: 'row', gap: 8}}>
                <div>
                    <Link to="/gestion/contabilidad/asientos" style={{textDecoration: 'none'}}>
                        Asientos
                    </Link>
                </div>
                <div>
                    <Link to="/gestion/contabilidad/resumen" style={{textDecoration: 'none'}}>
                        Resumen
                    </Link>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );

}

export default ContabilidadBase;