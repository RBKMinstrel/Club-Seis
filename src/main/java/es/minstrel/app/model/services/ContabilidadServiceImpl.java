package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.services.utils.Block;
import es.minstrel.app.model.services.utils.SummaryConta;
import es.minstrel.app.model.services.utils.SummaryGeneric;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ContabilidadServiceImpl implements ContabilidadService {

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

    private Categoria recuperarCategoria(Long id)
            throws InstanceNotFoundException {

        Optional<Categoria> categoriaOptional = categoriaDao.findById(id);

        if (categoriaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.categoria", id);
        else
            return categoriaOptional.get();
    }

    private Concepto recuperarConcepto(Long id)
            throws InstanceNotFoundException {

        Optional<Concepto> conceptoOptional = conceptoDao.findById(id);

        if (conceptoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.concepto", id);
        else
            return conceptoOptional.get();

    }

    private RazonSocial recuperarRazonSocial(Long id)
            throws InstanceNotFoundException {

        Optional<RazonSocial> razonSocialOptional = razonSocialDao.findById(id);

        if (razonSocialOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.razonSocial", id);
        else
            return razonSocialOptional.get();

    }

    private Cuenta recuperarCuenta(Long id)
            throws InstanceNotFoundException {

        Optional<Cuenta> cuentaOptional = cuentaDao.findById(id);

        if (cuentaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.cuenta", id);
        else
            return cuentaOptional.get();

    }

    private Movimiento recuperarMovimiento(Long id)
            throws InstanceNotFoundException {

        Optional<Movimiento> movimientoOptional = movimientoDao.findById(id);

        if (movimientoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.movimiento", id);
        else
            return movimientoOptional.get();

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

        Categoria categoria = recuperarCategoria(id);

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
        Concepto concepto = recuperarConcepto(id);

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
        RazonSocial razonSocial = recuperarRazonSocial(id);

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
        Cuenta cuenta = recuperarCuenta(id);

        if (cuenta.getName().equals(name))
            return;

        if (cuentaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.cuenta", name);

        cuenta.setName(name);

    }

    @Override
    public Block<Movimiento> getMovimientos(LocalDate fecha, Long razonSocialId, Long conceptoId, Long categoriaId,
                                            Long cuentaId, Boolean tipo, int page, int size) {

        Slice<Movimiento> slice = movimientoDao.find(fecha, razonSocialId, conceptoId, categoriaId, cuentaId, tipo, page, size);

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public Movimiento getMovimiento(Long id) throws InstanceNotFoundException {
        return recuperarMovimiento(id);
    }

    @Override
    public void createMovimiento(Movimiento movimiento, Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId)
            throws InstanceNotFoundException {

        RazonSocial razonSocial = razonSocialId != null ? recuperarRazonSocial(razonSocialId) : null;
        Concepto concepto = conceptoId != null ? recuperarConcepto(conceptoId) : null;
        Categoria categoria = categoriaId != null ? recuperarCategoria(categoriaId) : null;
        Cuenta cuenta = cuentaId != null ? recuperarCuenta(cuentaId) : null;

        movimiento.setRazonSocial(razonSocial);
        movimiento.setConcepto(concepto);
        movimiento.setCategoria(categoria);
        movimiento.setCuenta(cuenta);

        movimientoDao.save(movimiento);

    }

    @Override
    public void updateMovimiento(Long id, LocalDate fecha, boolean esGasto, BigDecimal base0, BigDecimal base4,
                                 BigDecimal base10, BigDecimal base21, Long razonSocialId, Long conceptoId,
                                 Long categoriaId, Long cuentaId)
            throws InstanceNotFoundException {

        Movimiento movimiento = recuperarMovimiento(id);

        RazonSocial razonSocial = razonSocialId != null ? recuperarRazonSocial(razonSocialId) : null;
        Concepto concepto = conceptoId != null ? recuperarConcepto(conceptoId) : null;
        Categoria categoria = categoriaId != null ? recuperarCategoria(categoriaId) : null;
        Cuenta cuenta = cuentaId != null ? recuperarCuenta(cuentaId) : null;

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
            throws InstanceNotFoundException {

        if (movimientoDao.existsById(id))
            movimientoDao.deleteById(id);
        else
            throw new InstanceNotFoundException("project.entities.movimiento", id);

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
}
