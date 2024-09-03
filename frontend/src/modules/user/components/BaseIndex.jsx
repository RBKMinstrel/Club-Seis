import {FormattedMessage} from "react-intl";

const BaseIndex = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
            <h2><FormattedMessage id="project.user.BaseIndex.title"/></h2>
        </div>
    );

}

export default BaseIndex