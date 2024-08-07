import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Section} from "../../common/index.js";


import {generoOptions, tipoOptions} from "./Options.jsx";

import * as actions from "../actions.js";
import * as selectors from '../selectors';
import Select from "react-select";
import AddToCarrito from "./AddToCarrito.jsx";

const FindArticulos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const articulos = useSelector(selectors.getArticulos);

    const noOption = {label: "Todos", value: null};

    const [forceUpdate, setForceUpdate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [genero, setGenero] = useState(noOption);
    const [tipo, setTipo] = useState(noOption);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    useEffect(() => {
        dispatch(actions.getCarrito());
    }, []);

    useEffect(() => {
        setPage(0);
        setForceUpdate((prev) => !prev);
    }, [name, tipo, genero, size]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.findArticulos({
            name: name.trim() !== '' ? name.trim() : null,
            tipo: tipo.value,
            genero: genero.value,
            page: page,
            size: size
        }));
        setLoading(false);

    }, [page, forceUpdate]);

    const articuloFuctions = (item) => {
        return (
            <>
                <AddToCarrito idArticulo={item.id} typeArticulo={item.esRopa}/>
            </>
        );
    };

    return (
        <>
            <div style={{display: "flex", justifyContent: "flex-end", gap: 10}}>
                <span
                    onClick={() => navigate("/gestion/mercancias/articulos/carrito")}
                    style={{fontSize: '20px'}}
                    className="fa-solid fa-cart-shopping"
                />
            </div>
            <div className="row">
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
            </div>
            {
                !articulos || articulos.items.length === 0 ? (
                    <h2> No resultados disponibles</h2>
                ) : (
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                        {articulos.items.map(item => {
                            const imageUrl =
                                !item.imageBytes || !item.fileType
                                    ? null
                                    : `data:${item.fileType};base64,${item.imageBytes}`;
                            return (
                                <Section
                                    title={item.name}
                                    extras={articuloFuctions(item)}
                                >
                                    <div className="row">
                                        <div style={{marginRight: '20px', width: '300px'}}>
                                            <img src={imageUrl} alt={item.name}
                                                 style={{maxWidth: '100%', height: 'auto', borderRadius: '5px'}}/>
                                        </div>
                                        <div>
                                            <p>
                                                <strong>Genero:</strong> {generoOptions.find(i => i.value === item.genero).label}
                                            </p>
                                            <p>
                                                <strong>Tipo:</strong> {tipoOptions.find(i => i.value === item.esRopa).label}
                                            </p>
                                            <p><strong>Precio:</strong> {item.precio}€</p>
                                            <p><strong>Precio Socio:</strong> {item.precioSocio}€</p>
                                        </div>
                                        <table>
                                            <thead style={{width: "100%"}}>
                                            <tr>
                                                {
                                                    item.stockList.map(stock => (
                                                        <th>{stock.name}</th>
                                                    ))
                                                }

                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                {item.stockList.map(stock => (

                                                    <td>{stock.stock}</td>
                                                ))}
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Section>
                            );
                        })}
                    </div>
                )
            }
        </>
    );

}

export default FindArticulos;