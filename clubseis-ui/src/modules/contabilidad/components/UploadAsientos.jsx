import {Modal} from "../../common/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import * as actions from "../actions.js";

const UploadAsientos = () => {
    const dispatch = useDispatch();
    const [isModalActive, setIsModalActive] = useState(false);
    const [file, setFile] = useState(null);

    const toggleModal = () => {
        setIsModalActive(!isModalActive);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('No se ha seleccionado ningun archivo');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const onSuccess = (quantity) => {
            setFile(null);
            alert("Se subio exitosamente " + quantity + " asientos.")
        }

        const onError = (error) => {
            alert("Error: " + error);
        }

        dispatch(actions.uploadExcel(formData, onSuccess, onError));
    };

    return (
        <div>
            <span
                onClick={toggleModal}
                style={{fontSize: '20px'}}
                className="fa-solid fa-cloud-arrow-up"
            />
            <Modal
                isActive={isModalActive}
                title="Importar asientos"
                onClose={toggleModal}
            >
                <div style={{display: "flex", flexDirection: "column", gap: 5, padding: 20}}>
                    <p>Para la importación de asientos contables se deben de cumplir ciertas
                        condiciones:</p>
                    <ol style={{paddingLeft: 20}}>
                        <li>Solo se aceptan formatos .xlsx y .xls.</li>
                        <li>Las hojas deben de ser "Gastos" y/o "Ingresos".</li>
                        <li>Al comienzo de cada hoja la primera fila debe de incluir las cabezeras.</li>
                        <li>
                            <p>Las cabezeras aceptadas son: "Fecha", "Razón Social", "NIF/CIF", "Concepto",</p>
                            <p>"Categoría", "Cuenta", "Base 0", "Base 4", "Base 10" y "Base 21".</p>
                        </li>
                    </ol>
                    <div className="row" style={{paddingTop: 30}}>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange}/>
                        <button onClick={handleFileUpload}>Subir</button>
                    </div>
                </div>
            </Modal>
        </div>
    );

}

export default UploadAsientos;