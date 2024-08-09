import Select from "react-select";
import {getGeneroOptions, geTipoOptions} from "./Options.jsx";
import {useIntl} from "react-intl";

const ArticulosFilter = ({name, setName, genero, setGenero, tipo, setTipo}) => {
    const intl = useIntl();
    const tipoOptions = geTipoOptions(intl);
    const generoOptions = getGeneroOptions(intl);

    const noOption = {label: intl.formatMessage({id: 'project.global.fields.all'}), value: null};

    return (
        <div style={{display: "flex", gap: 20}}>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <Select
                value={genero}
                onChange={setGenero}
                options={[noOption, ...generoOptions]}
            />
            <Select
                value={tipo}
                onChange={setTipo}
                options={[noOption, ...tipoOptions]}
            />
        </div>
    );

}

export default ArticulosFilter;