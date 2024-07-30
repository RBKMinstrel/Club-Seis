package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.UninitializedParameterException;
import es.minstrel.app.model.exceptions.UnsupportedFileTypeException;
import es.minstrel.app.model.services.utils.*;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts.FontName;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
public class ContabilidadServiceImpl implements ContabilidadService {

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private CommonService commonService;

    @Autowired
    private ConfiguracionService configuracionService;

    @Autowired
    private CategoriaDao categoriaDao;

    @Autowired
    private ConceptoDao conceptoDao;

    @Autowired
    private RazonSocialDao razonSocialDao;

    @Autowired
    private CuentaDao cuentaDao;

    @Autowired
    private MovimientoDao movimientoDao;

    @Autowired
    private FacturaDao facturaDao;

    @Value("${app.folders}")
    private String[] folderPaths;

    private Categoria getCategoriaFromId(Long id)
            throws InstanceNotFoundException {

        Optional<Categoria> categoriaOptional = categoriaDao.findById(id);

        if (categoriaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.categoria", id);
        else
            return categoriaOptional.get();
    }

    private Concepto getConceptoFromId(Long id)
            throws InstanceNotFoundException {

        Optional<Concepto> conceptoOptional = conceptoDao.findById(id);

        if (conceptoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.concepto", id);

        return conceptoOptional.get();

    }

    private RazonSocial getRazonSocialFromId(Long id)
            throws InstanceNotFoundException {
        Optional<RazonSocial> razonSocialOptional = razonSocialDao.findById(id);

        if (razonSocialOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.razonSocial", id);

        return razonSocialOptional.get();

    }

    private Cuenta getCuentaFromId(Long id)
            throws InstanceNotFoundException {

        Optional<Cuenta> cuentaOptional = cuentaDao.findById(id);

        if (cuentaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.cuenta", id);

        return cuentaOptional.get();

    }

    private Movimiento getMovimientoFromId(Long id)
            throws InstanceNotFoundException {

        Optional<Movimiento> movimientoOptional = movimientoDao.findById(id);

        if (movimientoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.movimiento", id);

        return movimientoOptional.get();

    }

    private Factura getFacturaFromId(Long id)
            throws InstanceNotFoundException {

        Optional<Factura> facturaOptional = facturaDao.findById(id);

        if (facturaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.factura", id);

        return facturaOptional.get();

    }

    @Override
    public List<Categoria> getAllCategorias() {
        return categoriaDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void createCategoria(String name)
            throws DuplicateInstanceException {

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        categoriaDao.save(new Categoria(name));

    }

    @Override
    public void updateCategoria(Long id, String name)
            throws DuplicateInstanceException, InstanceNotFoundException {

        Categoria categoria = getCategoriaFromId(id);

        if (categoria.getName().equals(name))
            return;

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        categoria.setName(name);

    }

    @Override
    public List<Concepto> getAllConcepto() {
        return conceptoDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void createConcepto(String name) throws DuplicateInstanceException {

        if (conceptoDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.concepto", name);

        conceptoDao.save(new Concepto(name));
    }

    @Override
    public void updateConcepto(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException {
        Concepto concepto = getConceptoFromId(id);

        if (concepto.getName().equals(name))
            return;

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        concepto.setName(name);

    }

    @Override
    public List<RazonSocial> getAllRazonSocial() {
        return razonSocialDao.findAll(Sort.by(Sort.Direction.ASC, "denominacion"));
    }

    @Override
    public List<RazonSocial> getAllRazonSocial(String keywords) {
        return razonSocialDao.getAllByDenominacionOrCifnif(keywords, keywords);
    }

    @Override
    public void createRazonSocial(String denominacion, String cifnif) throws DuplicateInstanceException {

        if (razonSocialDao.existsByCifnif(cifnif))
            throw new DuplicateInstanceException("project.entities.razonSocial", cifnif);

        razonSocialDao.save(new RazonSocial(denominacion, cifnif));

    }

    @Override
    public void updateRazonSocial(Long id, String denominacion, String cifnif)
            throws InstanceNotFoundException, DuplicateInstanceException {
        RazonSocial razonSocial = getRazonSocialFromId(id);

        if (razonSocial.getDenominacion().equals(denominacion) && razonSocial.getCifnif().equals(cifnif))
            return;

        if (!razonSocial.getCifnif().equals(cifnif) && razonSocialDao.existsByCifnif(cifnif))
            throw new DuplicateInstanceException("project.entities.razonSocial", cifnif);

        razonSocial.setDenominacion(denominacion);
        razonSocial.setCifnif(cifnif);

    }

    @Override
    public List<Cuenta> getAllCuentas() {
        return cuentaDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void createCuentas(String name) throws DuplicateInstanceException {

        if (cuentaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.cuenta", name);

        cuentaDao.save(new Cuenta(name));

    }

    @Override
    public void updateCuentas(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException {
        Cuenta cuenta = getCuentaFromId(id);

        if (cuenta.getName().equals(name))
            return;

        if (cuentaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.cuenta", name);

        cuenta.setName(name);

    }

    @Override
    public Block<Movimiento> getMovimientos(LocalDate fecha, Long razonSocialId, Long conceptoId, Long categoriaId,
                                            Long cuentaId, Boolean tipo, int page, int size) {

        Page<Movimiento> pageable = movimientoDao.find(fecha, razonSocialId, conceptoId, categoriaId, cuentaId, tipo, page, size);

        return new Block<>(pageable.getContent(), pageable.getTotalElements());
    }

    @Override
    public Movimiento getMovimiento(Long id) throws InstanceNotFoundException {
        return getMovimientoFromId(id);
    }

    @Override
    public void createMovimiento(Movimiento movimiento, Long razonSocialId, Long conceptoId, Long categoriaId,
                                 Long cuentaId, Factura factura, String fileExtension, String fileContent)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException {

        RazonSocial razonSocial = razonSocialId == null ? null : getRazonSocialFromId(razonSocialId);
        Concepto concepto = conceptoId != null ? getConceptoFromId(conceptoId) : null;
        Categoria categoria = categoriaId != null ? getCategoriaFromId(categoriaId) : null;
        Cuenta cuenta = cuentaId != null ? getCuentaFromId(cuentaId) : null;

        movimiento.setRazonSocial(razonSocial);
        movimiento.setConcepto(concepto);
        movimiento.setCategoria(categoria);
        movimiento.setCuenta(cuenta);

        Movimiento movimientoUpdate = movimientoDao.save(movimiento);

        if (factura != null) {

            String path = commonService.saveFile(Base64.getDecoder().decode(fileContent), fileExtension, folderPaths[0]);

            factura.setFilepath(path);
            factura.setMovimiento(movimientoUpdate);

            facturaDao.save(factura);

        }

    }

    @Override
    public void updateMovimiento(Long id, LocalDate fecha, boolean esGasto, BigDecimal base0, BigDecimal base4,
                                 BigDecimal base10, BigDecimal base21, Long razonSocialId, Long conceptoId,
                                 Long categoriaId, Long cuentaId)
            throws InstanceNotFoundException {

        Movimiento movimiento = getMovimientoFromId(id);

        RazonSocial razonSocial = razonSocialId != null ? getRazonSocialFromId(razonSocialId) : null;
        Concepto concepto = conceptoId != null ? getConceptoFromId(conceptoId) : null;
        Categoria categoria = categoriaId != null ? getCategoriaFromId(categoriaId) : null;
        Cuenta cuenta = cuentaId != null ? getCuentaFromId(cuentaId) : null;

        movimiento.setFecha(fecha);
        movimiento.setEsGasto(esGasto);
        movimiento.setBase0(base0);
        movimiento.setBase4(base4);
        movimiento.setBase10(base10);
        movimiento.setBase21(base21);
        movimiento.setRazonSocial(razonSocial);
        movimiento.setConcepto(concepto);
        movimiento.setCategoria(categoria);
        movimiento.setCuenta(cuenta);

        movimientoDao.save(movimiento);

    }

    @Override
    public void deleteMovimiento(Long id)
            throws InstanceNotFoundException, IOException {

        Movimiento movimiento = getMovimiento(id);

        if (movimiento.getFactura() != null)
            commonService.deleteFile(movimiento.getFactura().getFilepath());

        movimientoDao.delete(movimiento);

    }

    @Override
    public SummaryConta getResumenBalance(LocalDate fechaInicio, LocalDate fechaFin) {

        SummaryConta summaryConta = new SummaryConta();

        List<Concepto> conceptoList = conceptoDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
        conceptoList.add(null);
        List<Categoria> categoriaList = categoriaDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
        categoriaList.add(null);
        List<Cuenta> cuentaList = cuentaDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
        cuentaList.add(null);

        for (Concepto concepto : conceptoList) {
            SummaryGeneric summaryConcepto = new SummaryGeneric(concepto != null ? concepto.getName() : null);
            List<Movimiento> movimientoList = movimientoDao.findByConceptoAndFechaBetween(concepto, fechaInicio, fechaFin);
            for (Movimiento movimiento : movimientoList) {
                if (movimiento.isEsGasto())
                    summaryConcepto.addGasto(movimiento.getTotal());
                else
                    summaryConcepto.addIngreso(movimiento.getTotal());
            }
            summaryConta.addConceptoSummary(summaryConcepto);
        }

        for (Categoria categoria : categoriaList) {
            SummaryGeneric summaryCategotia = new SummaryGeneric(categoria != null ? categoria.getName() : null);
            List<Movimiento> movimientoList = movimientoDao.findByCategoriaAndFechaBetween(categoria, fechaInicio, fechaFin);
            for (Movimiento movimiento : movimientoList) {
                if (movimiento.isEsGasto())
                    summaryCategotia.addGasto(movimiento.getTotal());
                else
                    summaryCategotia.addIngreso(movimiento.getTotal());
            }
            summaryConta.addCategoriaSummary(summaryCategotia);
        }

        for (Cuenta cuenta : cuentaList) {
            SummaryGeneric summaryCuenta = new SummaryGeneric(cuenta != null ? cuenta.getName() : null);
            List<Movimiento> movimientoList = movimientoDao.findByCuentaAndFechaBetween(cuenta, fechaInicio, fechaFin);
            for (Movimiento movimiento : movimientoList) {
                if (movimiento.isEsGasto())
                    summaryCuenta.addGasto(movimiento.getTotal());
                else
                    summaryCuenta.addIngreso(movimiento.getTotal());
            }
            summaryConta.addCuentaSummary(summaryCuenta);
        }

        return summaryConta;
    }

    private static void generarContenidoHoja(List<Movimiento> movimientos, Sheet sheet, boolean esGasto) {
        int rowNum = 0;
        int aux = 0;
        Row rowFirst = sheet.createRow(rowNum++);
        rowFirst.createCell(aux++).setCellValue("Fecha");
        rowFirst.createCell(aux++).setCellValue("Cif/Nif");
        rowFirst.createCell(aux++).setCellValue("Denominacion");
        rowFirst.createCell(aux++).setCellValue("Concepto");
        rowFirst.createCell(aux++).setCellValue("Categoria");
        rowFirst.createCell(aux++).setCellValue("Cuenta");
        rowFirst.createCell(aux++).setCellValue("Base0");
        rowFirst.createCell(aux++).setCellValue("Base4");
        rowFirst.createCell(aux++).setCellValue("Iva4");
        rowFirst.createCell(aux++).setCellValue("Base10");
        rowFirst.createCell(aux++).setCellValue("Iva10");
        rowFirst.createCell(aux++).setCellValue("Base21");
        rowFirst.createCell(aux++).setCellValue("Iva21");
        rowFirst.createCell(aux++).setCellValue("Base Total");
        rowFirst.createCell(aux++).setCellValue("Iva Total");
        rowFirst.createCell(aux).setCellValue("Total");

        for (Movimiento movimiento : movimientos) {
            if (movimiento.isEsGasto() == esGasto) {
                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(movimiento.getFecha().toString());

                if (movimiento.getRazonSocial() != null) {
                    row.createCell(1).setCellValue(movimiento.getRazonSocial().getCifnif());
                    row.createCell(2).setCellValue(movimiento.getRazonSocial().getDenominacion());
                } else {
                    row.createCell(1).setCellValue("");
                    row.createCell(2).setCellValue("");
                }

                if (movimiento.getConcepto() != null) {
                    row.createCell(3).setCellValue(movimiento.getConcepto().getName());
                } else {
                    row.createCell(3).setCellValue("");
                }

                if (movimiento.getCategoria() != null) {
                    row.createCell(4).setCellValue(movimiento.getCategoria().getName());
                } else {
                    row.createCell(4).setCellValue("");
                }

                if (movimiento.getCuenta() != null) {
                    row.createCell(5).setCellValue(movimiento.getCuenta().getName());
                } else {
                    row.createCell(5).setCellValue("");
                }

                // Bases y totales
                int columnNum = 6;
                row.createCell(columnNum++).setCellValue(movimiento.getBase0().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getBase4().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getIva4().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getBase10().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getIva10().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getBase21().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getIva21().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getBaseTotal().doubleValue());
                row.createCell(columnNum++).setCellValue(movimiento.getIvaTotal().doubleValue());
                row.createCell(columnNum).setCellValue(movimiento.getTotal().doubleValue());
            }
        }
    }

    @Override
    public byte[] getExcel(LocalDate fecha, Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId, Boolean tipo) throws IOException {
        List<Movimiento> movimientos = movimientoDao.find(fecha, razonSocialId, conceptoId, categoriaId, cuentaId, tipo);
        Workbook workbook = new XSSFWorkbook();

        // Hoja para gastos
        if (tipo == null || tipo) {
            Sheet sheetGastos = workbook.createSheet("Gastos");
            generarContenidoHoja(movimientos, sheetGastos, true);
        }

        // Hoja para ingresos
        if (tipo == null || !tipo) {
            Sheet sheetIngresos = workbook.createSheet("Ingresos");
            generarContenidoHoja(movimientos, sheetIngresos, false);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        byte[] excelBytes = outputStream.toByteArray();
        outputStream.close();

        return excelBytes;

    }

    private RazonSocial getRazonSocial(String denominacion, String cifNif) {
        if (cifNif == null || cifNif.isEmpty()) {
            return null;
        } else {
            Optional<RazonSocial> razonSocialOpt = razonSocialDao.getRazonSocialsByCifnif(cifNif);

            if (razonSocialOpt.isEmpty()) {
                RazonSocial razonSocial = new RazonSocial(denominacion, cifNif);
                return razonSocialDao.save(razonSocial);
            } else {
                return razonSocialOpt.get();
            }
        }
    }

    private Concepto getConcepto(String conceptoName) {
        if (conceptoName == null || conceptoName.isEmpty()) {
            return null;
        } else {
            Optional<Concepto> conceptoOpt = conceptoDao.getConceptoByName(conceptoName);

            if (conceptoOpt.isEmpty()) {
                Concepto concepto = new Concepto(conceptoName);
                return conceptoDao.save(concepto);
            } else {
                return conceptoOpt.get();
            }
        }
    }

    private Categoria getCategoria(String categoriaName) {
        if (categoriaName == null || categoriaName.isEmpty()) {
            return null;
        } else {
            Optional<Categoria> categoriaOpt = categoriaDao.getCategoriaByName(categoriaName);

            if (categoriaOpt.isEmpty()) {
                Categoria categoria = new Categoria(categoriaName);
                return categoriaDao.save(categoria);
            } else {
                return categoriaOpt.get();
            }
        }
    }

    private Cuenta getCuenta(String cuentaName) {
        if (cuentaName == null || cuentaName.isEmpty()) {
            return null;
        } else {
            Optional<Cuenta> cuentaOpt = cuentaDao.getCuentaByName(cuentaName);

            if (cuentaOpt.isEmpty()) {
                Cuenta cuenta = new Cuenta(cuentaName);
                return cuentaDao.save(cuenta);
            } else {
                return cuentaOpt.get();
            }
        }
    }

    private void createMovimientoFromRow(Row row, Map<String, Integer> headerIndexMap, boolean esGasto) {
        Movimiento movimiento = new Movimiento();
        movimiento.setEsGasto(esGasto);
        movimiento.setFecha(row.getCell(headerIndexMap.get("Fecha")).getLocalDateTimeCellValue().toLocalDate());
        movimiento.setRazonSocial(getRazonSocial(
                row.getCell(headerIndexMap.get("Razón Social")).getStringCellValue().trim(),
                row.getCell(headerIndexMap.get("NIF/CIF")).getStringCellValue().trim()
        ));
        movimiento.setConcepto(getConcepto(row.getCell(headerIndexMap.get("Concepto")).getStringCellValue().trim()));
        movimiento.setCategoria(getCategoria(row.getCell(headerIndexMap.get("Categoría")).getStringCellValue().trim()));
        movimiento.setCuenta(getCuenta(row.getCell(headerIndexMap.get("Cuenta")).getStringCellValue().trim()));
        movimiento.setBase0(BigDecimal.valueOf(row.getCell(headerIndexMap.get("Base 0")).getNumericCellValue()));
        movimiento.setBase4(BigDecimal.valueOf(row.getCell(headerIndexMap.get("Base 4")).getNumericCellValue()));
        movimiento.setBase10(BigDecimal.valueOf(row.getCell(headerIndexMap.get("Base 10")).getNumericCellValue()));
        movimiento.setBase21(BigDecimal.valueOf(row.getCell(headerIndexMap.get("Base 21")).getNumericCellValue()));
        movimientoDao.save(movimiento);
    }

    private int createMovimientosFromSheet(Sheet sheet, boolean esGasto) {
        int cont = 0;

        if (sheet == null)
            return cont;

        Row headerRow = sheet.getRow(0);

        if (headerRow == null) {
            return cont;
        }

        // Cabeceras que se esperan
        String[] expectedHeaders = {"Fecha", "Razón Social", "NIF/CIF", "Concepto", "Categoría", "Cuenta",
                "Base 0", "Base 4", "Base 10", "Base 21"};
        Map<String, Integer> headerIndexMap = new HashMap<>();

        // Obtención de cabezeras
        for (Cell cell : headerRow) {
            String headerValue = cell.getStringCellValue().trim();
            for (String expectedHeader : expectedHeaders) {
                if (expectedHeader.equalsIgnoreCase(headerValue)) {
                    headerIndexMap.put(expectedHeader, cell.getColumnIndex());
                    break;
                }
            }
        }

        //Comprobacion de presencia de todas las filas
        for (String expectedHeader : expectedHeaders) {
            if (!headerIndexMap.containsKey(expectedHeader)) {
                return cont;
            }
        }

        //Iterar por las columnas
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue; // Saltar col. vacias

            createMovimientoFromRow(row, headerIndexMap, esGasto);

            cont++;
        }

        return cont;
    }

    @Override
    public int uploadExcel(InputStream file) throws IOException {
        Workbook workbook = WorkbookFactory.create(file);
        int cont = 0;

        cont += createMovimientosFromSheet(workbook.getSheet("Gastos"), true);
        cont += createMovimientosFromSheet(workbook.getSheet("Ingresos"), false);

        workbook.close();
        return cont;
    }

    @Override
    public Block<Factura> getFacturasBlock(String keyword, int page, int size) {

        Page<Factura> facturaPage;

        if (keyword == null || keyword.isEmpty()) {
            facturaPage = facturaDao.findAll(PageRequest.of(page, size));
        } else {
            facturaPage =
                    facturaDao.findByCodigoIsLikeIgnoreCaseOrAnotacionIsLikeIgnoreCaseOrEmisorIsLikeIgnoreCaseOrReceptorIsLikeIgnoreCase(
                            "%" + keyword + "%", "%" + keyword + "%", "%" + keyword + "%",
                            "%" + keyword + "%", PageRequest.of(page, size));
        }

        return new Block<>(facturaPage.getContent(), facturaPage.getTotalElements());
    }

    @Override
    public FileType getFacturaFile(Long facturaId)
            throws InstanceNotFoundException, IOException {

        Factura factura = getFacturaFromId(facturaId);

        return commonService.getFile(factura.getFilepath());
    }

    private static final float MARGIN_TOP = 50;
    private static final float MARGIN_BOTTOM = 50;
    private static final float MARGIN_LEFT = 50;
    private static final float MARGIN_RIGHT = 50;
    private static final float FONT_SIZE = 12;
    private static final float LEADING = 1.5f * FONT_SIZE;
    private final static String MAIN_BODY_RECIBI = "project.text.MainBodyRecibi";

    private float writeEncabezado(PDPageContentStream contentStream, PDFont font1, float width, float height)
            throws IOException, UninitializedParameterException {

        // Escribir el título centrado
        String titulo = configuracionService.findValorByClave("club").toUpperCase();
        float tituloFontSize = 24;
        contentStream.setFont(font1, tituloFontSize);
        float tituloWidth = font1.getStringWidth(titulo) / 1000 * tituloFontSize;
        float tituloX = (width - tituloWidth) / 2;
        contentStream.beginText();
        contentStream.newLineAtOffset(tituloX, height - (MARGIN_TOP + tituloFontSize));
        contentStream.setNonStrokingColor(java.awt.Color.BLUE);
        contentStream.showText(titulo);
        contentStream.endText();

        String subTitulo = configuracionService.findValorByClave("direccion") + ". Tfno.: " +
                configuracionService.findValorByClave("telefono") + ". NIF " +
                configuracionService.findValorByClave("nif") + " " + configuracionService.getValorByClave("otros");
        float subTituloFontSize = 9;
        contentStream.setFont(font1, subTituloFontSize);
        float subTituloWidth = font1.getStringWidth(subTitulo) / 1000 * subTituloFontSize;
        float subTituloX = (width - subTituloWidth) / 2;
        contentStream.beginText();
        contentStream.newLineAtOffset(subTituloX, height - (MARGIN_TOP + tituloFontSize + subTituloFontSize * 1.5f));
        contentStream.showText(subTitulo);
        contentStream.endText();

        return (tituloFontSize * 1.5f + subTituloFontSize * 1.5f);
    }

    private float writeEncabezado(PDFA4 factura, PDFont font, float width, float height)
            throws IOException, UninitializedParameterException {

        // Escribir el título centrado
        String titulo = configuracionService.findValorByClave("club").toUpperCase();
        factura.writeTextAlignCenter(titulo, 24f, font, java.awt.Color.BLUE, height, width);

        String subTitulo = configuracionService.findValorByClave("direccion") + ". Tfno.: " +
                configuracionService.findValorByClave("telefono") + ". NIF " +
                configuracionService.findValorByClave("nif") + " " + configuracionService.getValorByClave("otros");

        float altura = factura.writeTextAlignCenter(subTitulo, 9f, font, java.awt.Color.BLUE, height - 24f, width);

        return altura - 16f;
    }

    @Override
    public FileType createRecebi(String receptor, String receptorRol, String emisor, String cantidad, String concepto, Locale locale)
            throws IOException, UninitializedParameterException {

        try (PDDocument recibi = new PDDocument()) {
            PDFont font1 = new PDType1Font(FontName.HELVETICA);
            PDPage page = new PDPage(PDRectangle.A4);
            recibi.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(recibi, page);

            // Obtener dimensiones de la página
            PDRectangle mediaBox = page.getMediaBox();
            float width = mediaBox.getWidth();
            float height = mediaBox.getHeight();

            float contentWidth = width - MARGIN_LEFT - MARGIN_RIGHT;

            // Texto a escribir
            Object[] parametros = new Object[]{
                    receptor,
                    receptorRol,
                    configuracionService.findValorByClave("club"),
                    emisor,
                    cantidad + "€",
                    concepto,
            };
            String text = messageSource.getMessage(MAIN_BODY_RECIBI, parametros, MAIN_BODY_RECIBI, locale);

            //Añadir titulo
            float heightEncabezado = writeEncabezado(contentStream, font1, width, height);

            contentStream.beginText();
            contentStream.setFont(font1, FONT_SIZE);
            float actualHeight = height - MARGIN_TOP - heightEncabezado - 40;
            contentStream.newLineAtOffset(MARGIN_LEFT, actualHeight);
            contentStream.setNonStrokingColor(java.awt.Color.BLACK);

            // Dividir texto en líneas que quepan en el ancho del contenido
            List<String> lines = PDFA4.getLines(text, FONT_SIZE, font1, contentWidth);

            for (String line : lines) {
                contentStream.showText(line);
                contentStream.newLineAtOffset(0, -LEADING);
                actualHeight -= LEADING;

                // Si la línea está fuera del área de contenido, crear una nueva página
                if (actualHeight < MARGIN_BOTTOM) {
                    contentStream.endText();
                    contentStream.close();
                    actualHeight = height - MARGIN_TOP;

                    page = new PDPage(PDRectangle.A4);
                    recibi.addPage(page);
                    contentStream = new PDPageContentStream(recibi, page);
                    contentStream.beginText();
                    contentStream.setFont(font1, FONT_SIZE);
                    contentStream.newLineAtOffset(MARGIN_LEFT, height - MARGIN_TOP);
                }
            }

            contentStream.endText();
            contentStream.close();

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            recibi.save(out);

            return new FileType("application/pdf", out.toByteArray());

        }

    }

    @Override
    public FileType createRecebi(Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId, String receptor,
                                 String receptorRol, String emisor, BigDecimal cantidad, String concepto, Locale locale)
            throws IOException, UninitializedParameterException, InstanceNotFoundException, UnsupportedFileTypeException {

        Movimiento movimiento = new Movimiento(LocalDate.now(), false, cantidad, BigDecimal.ZERO,
                BigDecimal.ZERO, BigDecimal.ZERO);
        Factura factura = new Factura(null, Factura.Tipo.RECIBI, concepto, emisor, receptor);
        FileType fileType = createRecebi(receptor, receptorRol, emisor, cantidad.toString(), concepto, locale);
        createMovimiento(movimiento, razonSocialId, conceptoId, categoriaId, cuentaId, factura,
                fileType.getContentType(), fileType.getBase64Content());

        return fileType;
    }

    @Override
    public FileType createFactura(LocalDate fecha, String codigo, String receptor, List<FacturaItem> facturaItems, Locale locale)
            throws IOException, UninitializedParameterException {

        PDFA4 factura = new PDFA4(50f);
        PDFont font = new PDType1Font(FontName.HELVETICA);
        float fontSize = 10f;
        float height = factura.getAvaibleHeight();
        float width = factura.getAvaibleWidth();

        height = writeEncabezado(factura, font, width, height);
        height -= 20f;

        float withOffsetHeaderLeft = PDFA4.getWidthOfString("Factura a:", fontSize, font) + 10f;
        factura.writeTextAlignLeft(List.of("Factura a:"), fontSize, font, null, height, width / 2);
        float headerLeft = factura.writeTextAlignLeft(List.of(receptor.split("\n")), fontSize, font, null, height, (width / 2) - withOffsetHeaderLeft, withOffsetHeaderLeft);

        DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        float widhOffsetHeaderRight = width / 7;
        factura.writeTextAlignRight(List.of("Nº factura: "), fontSize, font, null, height, (width / 2) - widhOffsetHeaderRight, widhOffsetHeaderRight);
        float headerRight = factura.writeTextAlignRight(List.of(codigo), fontSize, font, null, height, widhOffsetHeaderRight);
        factura.writeTextAlignRight(List.of("Fecha de factura: "), fontSize, font, null, headerRight, (width / 2) - widhOffsetHeaderRight, widhOffsetHeaderRight);
        headerRight = factura.writeTextAlignRight(List.of(fecha.format(formatoFecha)), fontSize, font, null, headerRight, widhOffsetHeaderRight);

        height = Math.min(headerLeft, headerRight);
        height -= 30f;

        List<Float> widthCells = List.of(width * 3 / 7, width / 7, width / 7, width / 7, width / 7);
        List<Float> offSetCells = List.of(0f, 0f, width * 2 / 7, width / 7, 0f);

        factura.writeTextAlignLeft("Concepto", fontSize, font, null, height, widthCells.get(0), offSetCells.get(0));
        factura.writeTextAlignCenter("Cantidad", fontSize, font, null, height, widthCells.get(1), offSetCells.get(1));
        factura.writeTextAlignRight("Precio", fontSize, font, null, height, widthCells.get(2), offSetCells.get(2));
        factura.writeTextAlignRight("IVA", fontSize, font, null, height, widthCells.get(3), offSetCells.get(3));
        height = factura.writeTextAlignRight("Importe", fontSize, font, null, height, widthCells.get(4), offSetCells.get(4));

        height = factura.paintLine(0f, width, height);
        height -= fontSize * 1.5f;

        DecimalFormat formatoDinero = new DecimalFormat("#0.00");
        for (FacturaItem facturaItem : facturaItems) {
            float minHeight = height;
            minHeight = Math.min(minHeight, factura.writeTextAlignLeft(facturaItem.getConcepto(), fontSize, font, null, height, widthCells.get(0), offSetCells.get(0)));
            minHeight = Math.min(minHeight, factura.writeTextAlignCenter(Integer.toString(facturaItem.getCantidad()), fontSize, font, null, height, widthCells.get(1), offSetCells.get(1)));
            minHeight = Math.min(minHeight, factura.writeTextAlignRight(formatoDinero.format(facturaItem.getPrecio()), fontSize, font, null, height, widthCells.get(2), offSetCells.get(2)));
            minHeight = Math.min(minHeight, factura.writeTextAlignRight(facturaItem.getTipoIVA().toString(), fontSize, font, null, height, widthCells.get(3), offSetCells.get(3)));
            minHeight = Math.min(minHeight, factura.writeTextAlignRight(formatoDinero.format(facturaItem.getPrecio().multiply(BigDecimal.valueOf(facturaItem.getCantidad()))), fontSize, font, null, height, widthCells.get(4), offSetCells.get(4)));

            height = minHeight;
        }

        height = factura.paintLine(0f, width, height);
        height -= fontSize * 1.5f;

        BigDecimal subTotal = facturaItems.stream()
                .map(item -> item.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal subTotalIva4 = facturaItems.stream()
                .filter(item -> item.getTipoIVA().equals(TipoIVA.IVA4))
                .map(item ->
                        item.getPrecio().multiply(BigDecimal.valueOf(0.04))
                                .setScale(2, RoundingMode.HALF_DOWN).multiply(BigDecimal.valueOf(item.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal subTotalIva10 = facturaItems.stream()
                .filter(item -> item.getTipoIVA().equals(TipoIVA.IVA10))
                .map(item ->
                        item.getPrecio().multiply(BigDecimal.valueOf(0.1))
                                .setScale(2, RoundingMode.HALF_DOWN).multiply(BigDecimal.valueOf(item.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal subTotalIva21 = facturaItems.stream()
                .filter(item -> item.getTipoIVA().equals(TipoIVA.IVA21))
                .map(item ->
                        item.getPrecio().multiply(BigDecimal.valueOf(0.21))
                                .setScale(2, RoundingMode.HALF_DOWN).multiply(BigDecimal.valueOf(item.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        factura.writeTextAlignLeft("Subtotal sin IVA", fontSize, font, null, height, width / 2, width / 2);
        height = factura.writeTextAlignRight(formatoDinero.format(subTotal), fontSize, font, null, height, width / 2);

        if (!subTotalIva4.equals(BigDecimal.ZERO)) {
            factura.writeTextAlignLeft("IVA 4%", fontSize, font, null, height, width / 2, width / 2);
            height = factura.writeTextAlignRight(formatoDinero.format(subTotalIva4), fontSize, font, null, height, width / 2);
        }

        if (!subTotalIva10.equals(BigDecimal.ZERO)) {
            factura.writeTextAlignLeft("IVA 10%", fontSize, font, null, height, width / 2, width / 2);
            height = factura.writeTextAlignRight(formatoDinero.format(subTotalIva10), fontSize, font, null, height, width / 2);
        }

        if (!subTotalIva21.equals(BigDecimal.ZERO)) {
            factura.writeTextAlignLeft("IVA 21%", fontSize, font, null, height, width / 2, width / 2);
            height = factura.writeTextAlignRight(formatoDinero.format(subTotalIva21), fontSize, font, null, height, width / 2);
        }

        factura.writeTextAlignLeft("Total EUR", fontSize, font, null, height, width / 2, width / 2);
        height = factura.writeTextAlignRight("Subtotal sin IVA", fontSize, font, null, height, width / 2);

        height = factura.paintLine(width / 2, width, height);
        height -= fontSize * 1.5f;

        BigDecimal total = subTotal.add(subTotalIva4).add(subTotalIva10).add(subTotalIva21);

        factura.writeTextAlignLeft("Importe a pagar (EUR)", fontSize, font, null, height, width / 2, width / 2);
        factura.writeTextAlignRight(formatoDinero.format(total), fontSize, font, null, height, width / 2);

        return factura.close();
    }

    @Override
    public FileType createFactura(Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId, LocalDate fecha,
                                  String codigo, String receptor, List<FacturaItem> facturaItems, Locale locale)
            throws IOException, UninitializedParameterException, InstanceNotFoundException, UnsupportedFileTypeException {
        BigDecimal subTotalIva4 = facturaItems.stream()
                .filter(item -> item.getTipoIVA().equals(TipoIVA.IVA4))
                .map(item -> item.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal subTotalIva10 = facturaItems.stream()
                .filter(item -> item.getTipoIVA().equals(TipoIVA.IVA10))
                .map(item -> item.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal subTotalIva21 = facturaItems.stream()
                .filter(item -> item.getTipoIVA().equals(TipoIVA.IVA21))
                .map(item -> item.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Movimiento movimiento = new Movimiento(LocalDate.now(), false, BigDecimal.ZERO, subTotalIva4,
                subTotalIva10, subTotalIva21);
        Factura factura = new Factura(null, Factura.Tipo.FACTURA, receptor.split("\n")[0], configuracionService.findValorByClave("club"), receptor);
        FileType fileType = createFactura(fecha, codigo, receptor, facturaItems, locale);
        createMovimiento(movimiento, razonSocialId, conceptoId, categoriaId, cuentaId, factura,
                fileType.getContentType(), fileType.getBase64Content());

        return fileType;

    }

}
