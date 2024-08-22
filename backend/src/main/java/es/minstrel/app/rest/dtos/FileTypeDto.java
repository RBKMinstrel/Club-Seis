package es.minstrel.app.rest.dtos;

public class FileTypeDto {
    private String contentType;
    private String base64Content;

    public FileTypeDto() {
    }

    public FileTypeDto(String contentType, String base64Content) {
        this.contentType = contentType;
        this.base64Content = base64Content;
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
