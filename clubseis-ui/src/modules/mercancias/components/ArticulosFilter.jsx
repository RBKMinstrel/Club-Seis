import Select from "react-select";
import {generoOptions, tipoOptions} from "./Options.jsx";

const ArticulosFilter = ({name, setName, genero, setGenero, tipo, setTipo}) => {

    const noOption = {label: "Todos", value: null};

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