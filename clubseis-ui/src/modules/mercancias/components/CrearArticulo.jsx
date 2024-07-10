import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {BackLink, Section, Errors, ActionButton} from "../../common";
import {useState} from "react";
import Select from "react-select";

import {tipoOptions, generoOptions} from "./Options.jsx";

import * as actions from "../actions";
import * as selectors from "../selectors.js";

const CrearArticulo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tallas = useSelector(selectors.getTallas);


    const tallasSection = tallas.map(t => ({
        ...t,
        cant: 0
    }));

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageExtension, setImageExtension] = useState('');
    const [imageContent, setImageContent] = useState('');
    const [name, setName] = useState('');
    const [precio, setPrecio] = useState(0);
    const [precioSocio, setPrecioSocio] = useState(0);
    const [tipo, setTipo] = useState(tipoOptions[0]);
    const [genero, setGenero] = useState(generoOptions[0]);
    const [stock, setStock] = useState(tallasSection);
    const [backendErrors, setBackendErrors] = useState(null);

    let form;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Obtiene el contenido Base64
                setImageExtension(file.type); // Obtiene la extensión del archivo
                setImageContent(base64String); // Guarda el contenido Base64 en el estado
                setSelectedImage(reader.result); // Guarda la URL de la imagen seleccionada
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.createArticulos({
                    name: name,
                    precio: precio,
                    precioSocio: precioSocio,
                    genero: genero.value,
                    esRopa: tipo.value,
                    imageBytes: imageContent,
                    fileType: imageExtension,
                    stockList: stock.map(s => ({id: s.id, stock: s.cant})),
                },
                () => navigate("/gestion/mercancias/articulos"),
                errors => setBackendErrors(errors)
            ));

        } else {
            setBackendErrors(null);
        }

    }

    return (
        <>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <BackLink/>
            <Section title="Nuevo articulo">
                <form ref={node => form = node}
                      style={{display: "flex", gap: "40px"}}
                      noValidate
                      onSubmit={e => handleSubmit(e)}>
                    <div className="column" style={{alignItems: "flex-start", justifyContent: "flex-end"}}>
                        {selectedImage && (
                            <div>
                                <h2>Preview:</h2>
                                <img src={selectedImage} alt="Preview" style={{maxWidth: '100%', maxHeight: '200px'}}/>
                            </div>
                        )}
                        <div className="column begin">
                            <label>Seleccione una imagen:</label>
                            <input type="file" onChange={handleImageChange} accept="image/*"/>
                        </div>
                        <button onClick={() => setSelectedImage(null)}>Reset</button>
                    </div>
                    <div className="column" style={{alignItems: "flex-start"}}>
                        <div className="column begin">
                            <label>Nombre:</label>
                            <input type="text" value={name} required
                                   onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="column begin">
                            <label>Precio:</label>
                            <input type="number" step="0.01" min="0" value={precio} required
                                   onChange={e => setPrecio(Number(e.target.value))}/>
                        </div>
                        <div className="column begin">
                            <label>Precio Socio:</label>
                            <input type="number" step="0.01" min="0" value={precioSocio} required
                                   onChange={e => setPrecioSocio(Number(e.target.value))}/>
                        </div>
                        <div className="column begin">
                            <label>Tipo:</label>
                            <Select
                                value={tipo}
                                onChange={setTipo}
                                options={tipoOptions}
                            />
                        </div>
                        <div className="column begin">
                            <label>Genero:</label>
                            <Select
                                value={genero}
                                onChange={setGenero}
                                options={generoOptions}
                            />
                        </div>
                    </div>
                    <div className="row" style={{flex: 1, alignItems: "flex-start", flexWrap: "wrap"}}>
                        {stock.map((talla, indice) =>
                            <div className="column begin">
                                <label>Talla {talla.name}:</label>
                                <input type="number" step="0" min="0" value={talla.cant} required
                                       onChange={e => setStock(
                                           stock.map((t, i) => indice === i ? {...t, cant: Number(e.target.value)} : t)
                                       )}/>
                            </div>
                        )}
                    </div>
                    <div className="column" style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <ActionButton
                            type="submit"
                            htmlType="submit"
                        >
                            Crear
                        </ActionButton>
                    </div>
                </form>
            </Section>
        </>
    );
}

export default CrearArticulo;