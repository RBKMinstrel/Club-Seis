import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {ActionButton, BackLink, Errors, Section} from "../../common";
import {useEffect, useRef, useState} from "react";
import Select from "react-select";

import {getGeneroOptions, geTipoOptions} from "./Options.jsx";

import * as actions from "../actions";
import * as selectors from "../selectors.js";
import {FormattedMessage, useIntl} from "react-intl";

const UpdateArticulo = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const tipoOptions = geTipoOptions(intl);
    const generoOptions = getGeneroOptions(intl);

    const articulo = useSelector(selectors.getArticulo);
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
    const [cantidadGeneral, setCantidadGeneral] = useState(0);
    const [updateImage, setUpdateImage] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);

    const fileInputRef = useRef(null);

    let form;

    const getOriginImage = () => {
        return articulo.fileType && articulo.imageBytes
            ? `data:${articulo.fileType};base64,${articulo.imageBytes}`
            : null;
    }

    useEffect(() => {
        if (!Number.isNaN(id)) {
            dispatch(actions.findArticulo(id,
                error => setBackendErrors(error)));
        } else {
            navigate(-1);
        }
    }, [id]);

    useEffect(() => {
        if (articulo) {
            setName(articulo.name);
            setPrecio(articulo.precio);
            setPrecioSocio(articulo.precioSocio);
            setTipo(tipoOptions.find(option => option.value === articulo.esRopa));
            setGenero(generoOptions.find(option => option.value === articulo.genero));
            if (articulo.esRopa) {
                setStock(articulo.stockList.map(stockItem => ({
                    id: stockItem.id,
                    name: stockItem.name,
                    cant: stockItem.stock
                })));
            } else {
                setCantidadGeneral(articulo.stockList[0].stock);
            }
            setSelectedImage(getOriginImage())
            setImageExtension(articulo.fileType ? articulo.fileType : '');
            setImageContent(articulo.imageBytes ? articulo.imageBytes : '');
        }
    }, [articulo]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdateImage(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setImageExtension(file.type);
                setImageContent(base64String);
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResetImage = (e) => {
        setUpdateImage(false);
        setImageExtension(articulo.fileType);
        setImageContent(articulo.imageBytes);
        setSelectedImage(getOriginImage());
        fileInputRef.current.value = null;
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {
            const stockList = tipo.value
                ? stock.map(s => ({id: s.id, stock: s.cant}))
                : [{id: null, stock: cantidadGeneral}];

            dispatch(actions.updateArticulo({
                    id: articulo.id,
                    name: name,
                    precio: precio,
                    precioSocio: precioSocio,
                    genero: genero.value,
                    esRopa: tipo.value,
                    updateImage: updateImage,
                    imageBytes: imageContent,
                    fileType: imageExtension,
                    stockList: stockList,
                },
                () => navigate("/gestion/mercancias/stock"),
                errors => setBackendErrors(errors)
            ));
        } else {
            setBackendErrors(null);
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <BackLink style={{alignSelf: "start"}}/>
            <Section title={intl.formatMessage({id: 'project.mercancias.UpdateArticulo.title'})}>
                <form ref={node => form = node}
                      style={{display: "flex", gap: "40px"}}
                      noValidate
                      onSubmit={e => handleSubmit(e)}>
                    <div className="column" style={{alignItems: "flex-start", justifyContent: "flex-end"}}>
                        {selectedImage && (
                            <div>
                                <h2><FormattedMessage id="project.global.button.preview"/>:</h2>
                                <img src={selectedImage} alt="Preview" style={{maxWidth: '100%', maxHeight: '200px'}}/>
                            </div>
                        )}
                        <div className="column begin">
                            <label><FormattedMessage id="project.global.fields.selectImage"/>:</label>
                            <input type="file" onChange={handleImageChange} accept="image/*" ref={fileInputRef}/>
                        </div>
                        <button onClick={handleResetImage}>
                            <FormattedMessage id="project.global.button.reset"/>
                        </button>
                    </div>
                    <div className="column" style={{alignItems: "flex-start"}}>
                        <div className="column begin">
                            <label><FormattedMessage id="project.global.fields.name"/>:</label>
                            <input type="text" value={name} required
                                   onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="column begin">
                            <label><FormattedMessage id="project.global.fields.price"/>:</label>
                            <input type="number" step="0.01" min="0" value={precio} required
                                   onChange={e => setPrecio(Number(e.target.value))}/>
                        </div>
                        <div className="column begin">
                            <label><FormattedMessage id="project.global.fields.memberPrice"/>:</label>
                            <input type="number" step="0.01" min="0" value={precioSocio} required
                                   onChange={e => setPrecioSocio(Number(e.target.value))}/>
                        </div>
                        <div className="column begin">
                            <label><FormattedMessage id="project.global.fields.type"/>:</label>
                            <Select
                                value={tipo}
                                onChange={setTipo}
                                options={tipoOptions}
                            />
                        </div>
                        <div className="column begin">
                            <label><FormattedMessage id="project.global.fields.gender"/>:</label>
                            <Select
                                value={genero}
                                onChange={setGenero}
                                options={generoOptions}
                            />
                        </div>
                    </div>
                    {tipo.value ? (
                        <div className="row" style={{flex: 1, alignItems: "flex-start", flexWrap: "wrap"}}>
                            {stock.map((talla, indice) => (
                                <div className="column begin" key={talla.id}>
                                    <label><FormattedMessage id="project.global.fields.size"/> {talla.name}:</label>
                                    <input type="number" step="0" min="0" value={talla.cant} required
                                           onChange={e => setStock(
                                               stock.map((t, i) => indice === i ? {
                                                   ...t,
                                                   cant: Number(e.target.value)
                                               } : t)
                                           )}/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="column begin">
                            <label><FormattedMessage id="project.global.fields.quantity"/>:</label>
                            <input type="number" step="0" min="0" value={cantidadGeneral} required
                                   onChange={e => setCantidadGeneral(Number(e.target.value))}/>
                        </div>
                    )}
                    <div className="column" style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <ActionButton
                            type="submit"
                            htmlType="submit"
                        >
                            <FormattedMessage id="project.global.fields.update"/>
                        </ActionButton>
                    </div>
                </form>
            </Section>
        </div>
    );
}

export default UpdateArticulo;
