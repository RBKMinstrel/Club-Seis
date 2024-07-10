const Image = ({content, name, style = {}}) => {
    return (
        content ? (
            <img
                src={`data:${content.contentType};base64,${content.base64Content}`}
                alt={`Imagen ${name} `}
                style={style}
            />
        ) : null
    );
}

export default Image;