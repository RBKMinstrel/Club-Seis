import NoImage from "../../../assets/NoImage.png";
import {useIntl} from "react-intl";

const Image = ({content, name, style = {}}) => {
    const intl = useIntl();

    if (!content || !name) {
        return (
            <img
                src={NoImage}
                alt={intl.formatMessage({id: 'project.common.Image.noImage'})}
                style={style}
            />
        );
    }

    return (
        <img
            src={`data:${content.contentType};base64,${content.base64Content}`}
            alt={intl.formatMessage({id: 'project.common.Image.alt'}, {name: name})}
            style={style}
        />
    );
}

export default Image;