import {FormattedMessage} from "react-intl";

const RazonSocialFormFields = ({denominacion, setDenominacion, cifnif, setCifnif}) => {

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8}}>
                <label>
                    <FormattedMessage id="project.contabilidad.RazonSocialFormFields.denomination"/>
                </label>
                <input
                    type="text"
                    id="denominacionFieldCreate"
                    value={denominacion}
                    onChange={e => setDenominacion(e.target.value)}
                    required
                    style={{width: "100%"}}
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8}}>
                <label>
                    <FormattedMessage id="project.contabilidad.RazonSocialFormFields.cifnif"/>
                </label>
                <input
                    type="text"
                    id="cifnifFieldCreate"
                    value={cifnif}
                    onChange={e => setCifnif(e.target.value)}
                    required
                    style={{width: "100%"}}
                />
            </div>
        </>
    );

}

export default RazonSocialFormFields;