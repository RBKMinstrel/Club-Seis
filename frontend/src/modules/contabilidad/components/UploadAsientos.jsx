import {Modal} from "../../common/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import * as actions from "../actions.js";
import {FormattedMessage, useIntl} from "react-intl";

const UploadAsientos = () => {
    const dispatch = useDispatch();
    const intl = useIntl();

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
            alert(intl.formatMessage({id: 'project.contabilidad.UploadAsientos.noFile'}));
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const onSuccess = (quantity) => {
            setFile(null);
            alert(intl.formatMessage({id: 'project.contabilidad.UploadAsientos.noFile'}, {quantity: quantity}));
        }

        const onError = (error) => {
            alert(intl.formatMessage({id: 'project.contabilidad.UploadAsientos.error'}, {error: error}));
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
                    <p><FormattedMessage id="project.contabilidad.UploadAsientos.intro"/></p>
                    <ol style={{paddingLeft: 20}}>
                        <li><FormattedMessage id="project.contabilidad.UploadAsientos.part1"/></li>
                        <li><FormattedMessage id="project.contabilidad.UploadAsientos.part2"/></li>
                        <li><FormattedMessage id="project.contabilidad.UploadAsientos.part3"/></li>
                        <li><FormattedMessage id="project.contabilidad.UploadAsientos.part4"/></li>
                    </ol>
                    <div className="row" style={{paddingTop: 30}}>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange}/>
                        <button onClick={handleFileUpload}><FormattedMessage
                            id="project.contabilidad.UploadAsientos.upload"/></button>
                    </div>
                </div>
            </Modal>
        </div>
    );

}

export default UploadAsientos;