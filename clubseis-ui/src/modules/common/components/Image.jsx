import NoImage from "../../../assets/NoImage.png";

const Image = ({content, name, style = {}}) => {

    if (!content || !name) {
        return (
            <img
                src={NoImage}
                alt={`Imagen ${name} `}
                style={style}
            />
        );
    }

    return (
        <img
            src={`data:${content.contentType};base64,${content.base64Content}`}
            alt={`Imagen ${name} `}
            style={style}
        />
    );
}

export default Image;