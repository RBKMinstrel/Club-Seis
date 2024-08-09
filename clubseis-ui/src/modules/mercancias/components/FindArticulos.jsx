import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DynamicList} from "../../common/index.js";

import * as actions from "../actions.js";
import * as selectors from '../selectors';
import AddToCarrito from "./AddToCarrito.jsx";
import Image from "../../common/components/Image.jsx";
import {FormattedMessage, FormattedNumber, useIntl} from "react-intl";
import ArticulosFilter from "./ArticulosFilter.jsx";

const FindArticulos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    const articulos = useSelector(selectors.getArticulos);

    const noOption = {label: intl.formatMessage({id: "project.global.fields.all"}), value: null};

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
            <div style={{backgroundColor: "white", border: "2px solid", borderRadius: 5}}>
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
                        <AddToCarrito idArticulo={item.id} typeArticulo={item.esRopa}/>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: 10}}>
                    <Image
                        content={{contentType: item.fileType || null, base64Content: item.imageBytes || null}}
                        name={item.name}
                        style={{height: 200, width: "auto"}}
                    />
                    <div style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                        <h3><strong><FormattedMessage id="project.global.fields.price"/>:</strong></h3>
                        <h3 style={{alignSelf: "flex-end"}}>
                            <FormattedNumber value={item.precio} style="currency" currency="EUR"/>
                        </h3>
                        <h3><strong><FormattedMessage id="project.global.fields.memberPrice"/>:</strong></h3>
                        <h3 style={{alignSelf: "flex-end"}}>
                            <FormattedNumber value={item.precioSocio} style="currency" currency="EUR"/>
                        </h3>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        width: "100%",
                        gap: "20px"
                    }}>
                        {item.stockList.map((stock) => (
                            <h4><strong>
                                {!stock.name
                                    ? intl.formatMessage({id: 'project.global.fields.quantity'})
                                    : intl.formatMessage({id: 'project.global.fields.size'}) + " " + stock.name} :
                            </strong> {stock.stock}</h4>
                        ))}
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
                height={650}
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
                        <span
                            onClick={() => navigate("/gestion/mercancias/articulos/carrito")}
                            style={{fontSize: '20px'}}
                            className="fa-solid fa-cart-shopping"
                        />
                    </div>
                }
                total={articulos ? articulos.totalItems : 0}
            />
        </>
    );

}

export default FindArticulos;