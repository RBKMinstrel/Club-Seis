package es.minstrel.app.rest.dtos;

public class FacturaParamsDto extends FacturaDto {

    private String contentType;
    private String base64Content;

    public FacturaParamsDto() {
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getBase64Content() {
        return base64Content;
    }

    public void setBase64Content(String base64Content) {
        this.base64Content = base64Content;
    }
}
