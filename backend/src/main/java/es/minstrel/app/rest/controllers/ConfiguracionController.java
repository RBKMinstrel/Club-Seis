package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.services.ConfiguracionService;
import es.minstrel.app.rest.dtos.ConfiguracionBaseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static es.minstrel.app.rest.dtos.ConfiguracionConversor.toConfiguracionBaseDto;
import static es.minstrel.app.rest.dtos.ConfiguracionConversor.toMap;

@RestController
@RequestMapping("/api/configuracion")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionService configuracionService;

    @GetMapping("/configBase")
    public ConfiguracionBaseDto findConfiguracionBase() {
        return toConfiguracionBaseDto(configuracionService.findConfiguracionBase());
    }

    @PostMapping("/configBase")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateConfiguracionBase(@RequestBody ConfiguracionBaseDto configuracionBaseDto) {
        configuracionService.updateConfiguracionBase(toMap(configuracionBaseDto));
    }
}
