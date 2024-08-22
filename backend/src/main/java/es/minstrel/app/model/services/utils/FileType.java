package es.minstrel.app.model.services.utils;

import java.util.Base64;

public class FileType {

    private String contentType;
    private String base64Content;

    public FileType() {
    }

    public FileType(String contentType, byte[] byteContent) {
        this.contentType = contentType;
        this.base64Content = Base64.getEncoder().encodeToString(byteContent);
    }

    public FileType(String contentType, String base64Content) {
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
