package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.entities.Movimiento;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.services.Block;
import es.minstrel.app.model.services.ContabilidadService;
import es.minstrel.app.rest.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static es.minstrel.app.rest.dtos.MovimientoConversor.*;

@RestController
@RequestMapping("/api/contabilidad")
public class ContabilidadController {

    @Autowired
    private ContabilidadService contabilidadService;

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

    //TODO: Añadir campo razon social
    @GetMapping("/movimientos")
    public BlockDto<ShortMovimientoDto> getMovimientos(@RequestParam(required = false) Long fecha,
                                                       @RequestParam(required = false) Long razonSocialId,
                                                       @RequestParam(required = false) Long conceptoId,
                                                       @RequestParam(required = false) Long categoriaId,
                                                       @RequestParam(required = false) Long cuentaId,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "12") int size) {

        Block<Movimiento> movimientoBlock = contabilidadService.getMovimientos(fromDays(fecha), conceptoId, categoriaId,
                cuentaId, page, size);

        return new BlockDto<>(toShortMovimientoDtos(movimientoBlock.getItems()), movimientoBlock.getExistMoreItems());
    }

    @GetMapping("/movimientos/{id}")
    public MovimientoDto getMovimiento(@PathVariable Long id) throws InstanceNotFoundException {
        return toMovimientoDto(contabilidadService.getMovimiento(id));
    }

    @PostMapping("/movimientos")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createMovimientos(@RequestBody MovimientoDto movimientoDto) throws InstanceNotFoundException {
        contabilidadService.createMovimiento(toMovimiento(movimientoDto), movimientoDto.getRazonSocial(),
                movimientoDto.getConcepto(), movimientoDto.getCategoria(), movimientoDto.getCuenta());
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
            throws InstanceNotFoundException {
        contabilidadService.deleteMovimiento(id);
    }

}
