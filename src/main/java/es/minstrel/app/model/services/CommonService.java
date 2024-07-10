package es.minstrel.app.model.services;

import es.minstrel.app.model.exceptions.UnsupportedFileTypeException;

public interface CommonService {

    String getExtensionFromMimeType(String mimeType)
            throws UnsupportedFileTypeException;

}
