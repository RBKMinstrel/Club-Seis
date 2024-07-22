package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.entities.Factura;
import es.minstrel.app.model.entities.Movimiento;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.UnsupportedFileTypeException;
import es.minstrel.app.model.services.ContabilidadService;
import es.minstrel.app.model.services.utils.Block;
import es.minstrel.app.model.services.utils.FileType;
import es.minstrel.app.model.services.utils.SummaryConta;
import es.minstrel.app.rest.common.ErrorsDto;
import es.minstrel.app.rest.dtos.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

import static es.minstrel.app.rest.dtos.FacturaConversors.toFactura;
import static es.minstrel.app.rest.dtos.FacturaConversors.toFacturaDtos;
import static es.minstrel.app.rest.dtos.MovimientoConversor.*;

@RestController
@RequestMapping("/api/contabilidad")
public class ContabilidadController {

    private final static String ERROR_GENERATION_FILE_EXCEPTION_CODE = "project.exceptions.IOException";

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private ContabilidadService contabilidadService;

    @ExceptionHandler(IOException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorsDto handleIOException(IOException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(ERROR_GENERATION_FILE_EXCEPTION_CODE, null,
                ERROR_GENERATION_FILE_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);
    }

    @GetMapping("/conceptos")
    public List<ConceptoDto> getConceptos() {
        return contabilidadService.getAllConcepto().stream().map(x -> new ConceptoDto(x.getId(), x.getName())).toList();
    }

    @PostMapping("/conceptos")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createConcepto(@RequestBody ConceptoDto conceptoDto)
            throws DuplicateInstanceException {
        contabilidadService.createConcepto(conceptoDto.getName());
    }

    @PutMapping("/conceptos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateConcepto(@PathVariable Long id, @RequestBody ConceptoDto conceptoDto)
            throws DuplicateInstanceException, InstanceNotFoundException {
        contabilidadService.updateConcepto(id, conceptoDto.getName());
    }

    @GetMapping("/categorias")
    public List<CategoriaDto> getCategorias() {
        return contabilidadService.getAllCategorias().stream().map(x -> new CategoriaDto(x.getId(), x.getName())).toList();
    }

    @PostMapping("/categorias")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createCategoria(@RequestBody CategoriaDto categoriaDto)
            throws DuplicateInstanceException {
        contabilidadService.createCategoria(categoriaDto.getName());
    }

    @PutMapping("/categorias/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCategoria(@PathVariable Long id, @RequestBody CategoriaDto categoriaDto)
            throws DuplicateInstanceException, InstanceNotFoundException {
        contabilidadService.updateCategoria(id, categoriaDto.getName());
    }

    @GetMapping("/cuentas")
    public List<CuentaDto> getCuentas() {
        return contabilidadService.getAllCuentas().stream().map(x -> new CuentaDto(x.getId(), x.getName())).toList();
    }

    @PostMapping("/cuentas")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createCategoria(@RequestBody CuentaDto cuentaDto)
            throws DuplicateInstanceException {
        contabilidadService.createCuentas(cuentaDto.getName());
    }

    @PutMapping("/cuentas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCuenta(@PathVariable Long id, @RequestBody CuentaDto cuentaDto)
            throws DuplicateInstanceException, InstanceNotFoundException {
        contabilidadService.updateCuentas(id, cuentaDto.getName());
    }

    @GetMapping("/razon-social")
    public List<RazonSocialDto> getRazonSocial(@RequestParam(required = false) String keywords) {

        if (keywords == null || keywords.isEmpty())
            return contabilidadService.getAllRazonSocial().stream().map(x -> new RazonSocialDto(x.getId(), x.getDenominacion(), x.getCifnif())).toList();
        else
            return contabilidadService.getAllRazonSocial(keywords).stream().map(x -> new RazonSocialDto(x.getId(), x.getDenominacion(), x.getCifnif())).toList();
    }

    @PostMapping("/razon-social")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createRazonSocial(@RequestBody RazonSocialDto razonSocialDto)
            throws DuplicateInstanceException {
        contabilidadService.createRazonSocial(razonSocialDto.getDenominacion(), razonSocialDto.getCifnif());
    }

    @PutMapping("/razon-social/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateRazonSocial(@PathVariable Long id, @RequestBody RazonSocialDto razonSocialDto)
            throws DuplicateInstanceException, InstanceNotFoundException {
        contabilidadService.updateRazonSocial(id, razonSocialDto.getDenominacion(), razonSocialDto.getCifnif());
    }

    @GetMapping("/movimientos")
    public BlockDto<MovimientoShortDto> getMovimientos(@RequestParam(required = false) Boolean tipo,
                                                       @RequestParam(required = false) Long fecha,
                                                       @RequestParam(required = false) Long razonSocialId,
                                                       @RequestParam(required = false) Long conceptoId,
                                                       @RequestParam(required = false) Long categoriaId,
                                                       @RequestParam(required = false) Long cuentaId,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "12") int size) {

        Block<Movimiento> movimientoBlock = contabilidadService.getMovimientos(fromDays(fecha), razonSocialId,
                conceptoId, categoriaId, cuentaId, tipo, page, size);

        return new BlockDto<>(toShortMovimientoDtos(movimientoBlock.getItems()), movimientoBlock.getTotalItems());
    }

    @GetMapping("/movimientos/{id}")
    public MovimientoDto getMovimiento(@PathVariable Long id) throws InstanceNotFoundException {
        return toMovimientoDto(contabilidadService.getMovimiento(id));
    }

    @PostMapping("/movimientos")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createMovimientos(@RequestBody MovimientoParamsDto movimientoParamsDto)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException {
        contabilidadService.createMovimiento(toMovimiento(movimientoParamsDto), movimientoParamsDto.getRazonSocial(),
                movimientoParamsDto.getConcepto(), movimientoParamsDto.getCategoria(), movimientoParamsDto.getCuenta(),
                movimientoParamsDto.getFileContent() == null ? null : toFactura(movimientoParamsDto),
                movimientoParamsDto.getFileExtension(), movimientoParamsDto.getFileContent());
    }

    @PutMapping("/movimientos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateMovimiento(@PathVariable Long id, @RequestBody MovimientoDto movimientoDto) throws InstanceNotFoundException {
        contabilidadService.updateMovimiento(id, fromDays(movimientoDto.getFecha()),
                movimientoDto.getEsGasto(), movimientoDto.getBase0(), movimientoDto.getBase4(),
                movimientoDto.getBase10(), movimientoDto.getBase21(), movimientoDto.getRazonSocial(),
                movimientoDto.getConcepto(), movimientoDto.getCategoria(), movimientoDto.getCuenta());
    }

    @DeleteMapping("/movimientos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMovimiento(@PathVariable Long id)
            throws InstanceNotFoundException, IOException {
        contabilidadService.deleteMovimiento(id);
    }

    @GetMapping("/summary")
    public SummaryContaDto getSummaryMovimientos(@RequestParam Long fechaInicio, @RequestParam Long fechaFin) {
        LocalDate fechaInicioParse = fromDays(fechaInicio);
        LocalDate fechaFinParse = fromDays(fechaFin);
        SummaryConta summaryConta = contabilidadService.getResumenBalance(fechaInicioParse, fechaFinParse);
        return new SummaryContaDto(
                summaryConta.getConceptoSummaryList().stream()
                        .map(x -> new SummaryGenericDto(x.getName(), x.getGasto(), x.getIngreso())).toList(),
                summaryConta.getCategoriaSummaryList().stream()
                        .map(x -> new SummaryGenericDto(x.getName(), x.getGasto(), x.getIngreso())).toList(),
                summaryConta.getCuentaSummaryList().stream()
                        .map(x -> new SummaryGenericDto(x.getName(), x.getGasto(), x.getIngreso())).toList());
    }

    @GetMapping("/descargar-excel")
    public ResponseEntity<Resource> descargarExcel(@RequestParam(required = false) Boolean tipo,
                                                   @RequestParam(required = false) Long fecha,
                                                   @RequestParam(required = false) Long razonSocialId,
                                                   @RequestParam(required = false) Long conceptoId,
                                                   @RequestParam(required = false) Long categoriaId,
                                                   @RequestParam(required = false) Long cuentaId) throws IOException {

        byte[] excelBytes = contabilidadService.getExcel(fromDays(fecha), razonSocialId,
                conceptoId, categoriaId, cuentaId, tipo);
        ByteArrayResource resource = new ByteArrayResource(excelBytes);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "movimientos.xlsx");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }

    @PostMapping("/subir-excel")
    public int subirExcel(@RequestParam("file") @NotNull MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {

            return contabilidadService.uploadExcel(inputStream);

        } catch (IOException e) {
            System.out.println(e.getMessage());
            return -1;
        }
    }

    @GetMapping("/facturas")
    public BlockDto<FacturaDto> getFacturasBlock(@RequestParam(required = false) String keyword,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "12") int size) {

        Block<Factura> facturasBlock = contabilidadService.getFacturasBlock(keyword, page, size);

        return new BlockDto<>(toFacturaDtos(facturasBlock.getItems()), facturasBlock.getTotalItems());

    }

    @GetMapping("/facturas/{id}")
    public FileTypeDto getFacturaFile(@PathVariable Long id)
            throws InstanceNotFoundException, IOException {

        FileType facturaFile = contabilidadService.getFacturaFile(id);

        return new FileTypeDto(facturaFile.getContentType(), facturaFile.getBase64Content());

    }

}
