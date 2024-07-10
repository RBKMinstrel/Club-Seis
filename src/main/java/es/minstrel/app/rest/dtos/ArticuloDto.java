package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Articulo;

import java.math.BigDecimal;
import java.util.List;

public class ArticuloDto extends ArticuloShortDto {
    private String imageBytes;
    private String fileType;
    private boolean updateImage;
    private Byte genero;
    private boolean esRopa;

    public ArticuloDto() {
        super();
    }

    public ArticuloDto(Long id, String name, BigDecimal precio, BigDecimal precioSocio, List<StockDto> stockList, Byte genero, boolean esRopa) {
        super(id, name, precio, precioSocio, stockList);
        this.genero = genero;
        this.esRopa = esRopa;
    }

    public ArticuloDto(Long id, String name, BigDecimal precio, BigDecimal precioSocio, List<StockDto> stockList,
                       String imageBytes, String fileType, Byte genero, boolean esRopa) {
        super(id, name, precio, precioSocio, stockList);
        this.imageBytes = imageBytes;
        this.fileType = fileType;
        this.genero = genero;
        this.esRopa = esRopa;
    }

    public String getImageBytes() {
        return imageBytes;
    }

    public void setImageBytes(String imageBytes) {
        this.imageBytes = imageBytes;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public boolean isUpdateImage() {
        return updateImage;
    }

    public void setUpdateImage(boolean updateImage) {
        this.updateImage = updateImage;
    }

    public Byte getGenero() {
        return genero;
    }

    public void setGenero(Byte genero) {
        this.genero = genero;
    }

    public boolean isEsRopa() {
        return esRopa;
    }

    public void setEsRopa(boolean esRopa) {
        this.esRopa = esRopa;
    }
}
