package es.minstrel.app.model.services;

import es.minstrel.app.model.exceptions.UnsupportedFileTypeException;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class CommonServiceImpl implements CommonService {

    @Override
    public String getExtensionFromMimeType(String mimeType) throws UnsupportedFileTypeException {
        return switch (mimeType) {
            case "image/jpeg" -> ".jpg";
            case "image/png" -> ".png";
            case "image/gif" -> ".gif";
            case "image/bmp" -> ".bmp";
            default -> throw new UnsupportedFileTypeException();
        };
    }
}
