package es.minstrel.app.model.services;

import es.minstrel.app.model.exceptions.UnsupportedFileTypeException;
import es.minstrel.app.model.services.utils.FileType;

import java.io.IOException;

public interface CommonService {

    String getExtensionFromMimeType(String mimeType)
            throws UnsupportedFileTypeException;

    String saveFile(byte[] imageBytes, String fileType, String path)
            throws UnsupportedFileTypeException, IOException;

    void deleteFile(String path)
            throws IOException;

    FileType getFile(String filePath)
            throws IOException;

}
