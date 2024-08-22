package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;

public class MovimientoParamsDto extends MovimientoDto {

    private String codigo;
    private byte tipo;
    private String anotacion;
    private String emisor;
    private String receptor;
    private String fileExtension;
    private String fileContent;

    public MovimientoParamsDto() {
    }

    public MovimientoParamsDto(Long id, Long fecha, Boolean esGasto, BigDecimal base0, BigDecimal base4,
                               BigDecimal base10, BigDecimal base21, Long razonSocial, Long concepto, Long categoria,
                               Long cuenta, String codigo, byte tipo, String anotacion, String emisor, String receptor,
                               String fileExtension, String fileContent) {
        super(id, fecha, esGasto, base0, base4, base10, base21, razonSocial, concepto, categoria, cuenta);
        this.codigo = codigo;
        this.tipo = tipo;
        this.anotacion = anotacion;
        this.emisor = emisor;
        this.receptor = receptor;
        this.fileExtension = fileExtension;
        this.fileContent = fileContent;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public byte getTipo() {
        return tipo;
    }

    public void setTipo(byte tipo) {
        this.tipo = tipo;
    }

    public String getAnotacion() {
        return anotacion;
    }

    public void setAnotacion(String anotacion) {
        this.anotacion = anotacion;
    }

    public String getEmisor() {
        return emisor;
    }

    public void setEmisor(String emisor) {
        this.emisor = emisor;
    }

    public String getReceptor() {
        return receptor;
    }

    public void setReceptor(String receptor) {
        this.receptor = receptor;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getFileContent() {
        return fileContent;
    }

    public void setFileContent(String fileContent) {
        this.fileContent = fileContent;
    }
}
