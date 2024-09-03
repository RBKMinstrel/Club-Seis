package es.minstrel.app.model.services;

import es.minstrel.app.model.exceptions.UnsupportedFileTypeException;
import es.minstrel.app.model.services.utils.FileType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class CommonServiceImpl implements CommonService {

    @Override
    public String getExtensionFromMimeType(String mimeType)
            throws UnsupportedFileTypeException {
        return switch (mimeType) {
            case "image/jpeg" -> ".jpg";
            case "image/png" -> ".png";
            case "image/gif" -> ".gif";
            case "image/bmp" -> ".bmp";
            case "application/pdf" -> ".pdf";
            default -> throw new UnsupportedFileTypeException();
        };
    }

    @Override
    public String saveFile(byte[] imageBytes, String fileType, String path)
            throws UnsupportedFileTypeException, IOException {

        if (imageBytes == null || imageBytes.length == 0 || fileType == null || fileType.isEmpty())
            return null;

        String extension = getExtensionFromMimeType(fileType);
        String newFileName = UUID.randomUUID() + extension;
        Path filePath = Paths.get(path, newFileName);
        Files.write(filePath, imageBytes);

        return filePath.toString();

    }

    @Override
    public void deleteFile(String path) throws IOException {

        if (path != null) {
            Path filePath = Paths.get(path);

            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        }

    }

    @Override
    public FileType getFile(String filePath)
            throws IOException {

        if (filePath == null || filePath.isEmpty())
            return null;

        Path path = Paths.get(filePath);

        if (!Files.exists(path)) {
            return null;
        }

        String contentType = Files.probeContentType(path);
        byte[] imageBytes = Files.readAllBytes(path);

        return new FileType(contentType, imageBytes);

    }
}
