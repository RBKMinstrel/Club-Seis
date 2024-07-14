import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DynamicList} from "../../common";
import {useNavigate} from "react-router-dom";
import * as selectors from "../selectors.js";
import * as actions from "../actions.js";
import Image from "../../common/components/Image.jsx";
import {FormattedNumber} from "react-intl";
import AddMoreExistencias from "./AddMoreExistencias.jsx";
import ArticulosFilter from "./ArticulosFilter.jsx";

const FindExistencias = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const articulos = useSelector(selectors.getArticulos);

    const noOption = {label: "Todos", value: null};

    const [forceUpdate, setForceUpdate] = useState(false);

    const [name, setName] = useState('');
    const [genero, setGenero] = useState(noOption);
    const [tipo, setTipo] = useState(noOption);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);

    useEffect(() => {
        setPage(0);
        setForceUpdate((prev) => !prev);
    }, [name, tipo, genero, size]);

    useEffect(() => {
        dispatch(actions.findArticulos({
            name: name.length !== 0 ? name.trim() : null,
            tipo: tipo.value,
            genero: genero.value,
            page: page,
            size: size
        }));

        return () => dispatch(actions.cleanArticulos());
    }, [page, forceUpdate]);

    const renderItem = (item) => {

        return (
            <div style={{width: "100%", backgroundColor: "white", border: "2px solid", borderRadius: 5}}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "lightgray"
                }}>
                    <h2>
                        {item.name}
                    </h2>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}>
                        <AddMoreExistencias articulo={item}/>
                        <span
                            onClick={() => navigate(`/gestion/mercancias/stock/actualizarArticulo/${item.id}`)}
                            style={{fontSize: '25px'}}
                            className="fa-regular fa-pen-to-square link-out"
                        />
                    </div>
                </div>
                <div style={{display: "flex", gap: 20, padding: 10}}>
                    <Image
                        content={{contentType: item.fileType, base64Content: item.imageBytes}}
                        name={item.name}
                        style={{width: 200}}
                    />
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                        <h3><strong>Precio:</strong></h3>
                        <h3 style={{alignSelf: "flex-end"}}>
                            <FormattedNumber value={item.precio} style="currency" currency="EUR"/>
                        </h3>
                        <h3><strong>Precio Socio:</strong></h3>
                        <h3 style={{alignSelf: "flex-end"}}>
                            <FormattedNumber value={item.precioSocio} style="currency" currency="EUR"/>
                        </h3>
                    </div>
                    <div style={{display: "flex", gap: 8}}>
                        {item.stockList.map(stock =>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <h4><strong>Talla {stock.name}:</strong></h4>
                                <h4 style={{alignSelf: "flex-end"}}>{stock.stock}</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

    }

    return (
        <>
            <DynamicList
                data={articulos ? articulos.items : []}
                renderItem={renderItem}
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                height={750}
                header={
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <ArticulosFilter
                            name={name}
                            setName={setName}
                            genero={genero}
                            setGenero={setGenero}
                            tipo={tipo}
                            setTipo={setTipo}
                        />
                        <div style={{display: "flex", alignItems: "center", paddingRight: 10}}>
                            <span
                                onClick={() => navigate("/gestion/mercancias/stock/crearArticulo")}
                                style={{fontSize: '25px'}}
                                className="fa-solid fa-circle-plus"
                            />
                        </div>
                    </div>
                }
                total={articulos ? articulos.totalItems : 0}
            />
        </>
    );
}

export default FindExistencias;