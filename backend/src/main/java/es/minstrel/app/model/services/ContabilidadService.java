package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.UninitializedParameterException;
import es.minstrel.app.model.exceptions.UnsupportedFileTypeException;
import es.minstrel.app.model.services.utils.Block;
import es.minstrel.app.model.services.utils.FacturaItem;
import es.minstrel.app.model.services.utils.FileType;
import es.minstrel.app.model.services.utils.SummaryConta;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

public interface ContabilidadService {

    List<Categoria> getAllCategorias();

    void createCategoria(String name)
            throws DuplicateInstanceException;

    void updateCategoria(Long id, String name)
            throws DuplicateInstanceException, InstanceNotFoundException;

    List<Concepto> getAllConcepto();

    void createConcepto(String name)
            throws DuplicateInstanceException;

    void updateConcepto(Long id, String name)
            throws DuplicateInstanceException, InstanceNotFoundException;

    List<RazonSocial> getAllRazonSocial();

    List<RazonSocial> getAllRazonSocial(String keywords);

    void createRazonSocial(String denominacion, String cifnif)
            throws DuplicateInstanceException;

    void updateRazonSocial(Long id, String denominacion, String cifnif)
            throws DuplicateInstanceException, InstanceNotFoundException;

    List<Cuenta> getAllCuentas();

    void createCuentas(String name)
            throws DuplicateInstanceException;

    void updateCuentas(Long id, String name)
            throws DuplicateInstanceException, InstanceNotFoundException;

    Block<Movimiento> getMovimientos(LocalDate fecha, Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId, Boolean tipo, int page, int size);

    Movimiento getMovimiento(Long id)
            throws InstanceNotFoundException;

    void createMovimiento(Movimiento movimiento, Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId,
                          Factura factura, String fileExtension, String fileContent)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException;

    void updateMovimiento(Long id, LocalDate fecha, boolean esGasto, BigDecimal base0, BigDecimal base4, BigDecimal base10,
                          BigDecimal base21, Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId)
            throws InstanceNotFoundException;

    void deleteMovimiento(Long id)
            throws InstanceNotFoundException, IOException;

    SummaryConta getResumenBalance(LocalDate fechaInicio, LocalDate fechaFin);

    byte[] getExcel(LocalDate fecha, Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId, Boolean tipo)
            throws IOException;

    int uploadExcel(InputStream file) throws IOException;

    Block<Factura> getFacturasBlock(String keyword, int page, int size);

    FileType getFacturaFile(Long facturaId)
            throws InstanceNotFoundException, IOException;

    FileType createRecebi(String receptor, String receptorRol, String emisor, String cantidad, String concepto, Locale locale)
            throws IOException, UninitializedParameterException;

    FileType createRecebi(Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId, String receptor,
                          String receptorRol, String emisor, BigDecimal cantidad, String concepto, Locale locale)
            throws IOException, UninitializedParameterException, InstanceNotFoundException, UnsupportedFileTypeException;

    FileType createFactura(LocalDate fecha, String codigo, String receptor, List<FacturaItem> facturaItems, Locale locale)
            throws IOException, UninitializedParameterException;

    FileType createFactura(Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId, LocalDate fecha,
                           String codigo, String receptor, List<FacturaItem> facturaItems, Locale locale)
            throws IOException, UninitializedParameterException, InstanceNotFoundException, UnsupportedFileTypeException;

}
