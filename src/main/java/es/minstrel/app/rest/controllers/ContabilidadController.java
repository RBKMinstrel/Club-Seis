package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.services.ContabilidadService;
import es.minstrel.app.rest.dtos.ConceptoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void createConcepto(@RequestBody ConceptoDto conceptoDto)
            throws DuplicateInstanceException {
        contabilidadService.createConcepto(conceptoDto.getName());
    }

    @PutMapping("/conceptos/{id}")
    public void updateConcepto(@PathVariable Long id, @RequestBody ConceptoDto conceptoDto)
            throws DuplicateInstanceException, InstanceNotFoundException {
        contabilidadService.updateConcepto(conceptoDto.getId(), conceptoDto.getName());
    }

}
