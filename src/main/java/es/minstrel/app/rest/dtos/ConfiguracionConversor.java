package es.minstrel.app.rest.dtos;

import java.util.HashMap;
import java.util.Map;

public class ConfiguracionConversor {

    private ConfiguracionConversor() {
    }

    public static final Map<String, String> toMap(ConfiguracionBaseDto configuracionBaseDto) {
        Map<String, String> map = new HashMap<>();

        map.put("club", configuracionBaseDto.getClub());
        map.put("direccion", configuracionBaseDto.getDireccion());
        map.put("telefono", configuracionBaseDto.getTelefono());
        map.put("nif", configuracionBaseDto.getNif());
        map.put("otros", configuracionBaseDto.getOtros());

        return map;

    }

    public static final ConfiguracionBaseDto toConfiguracionBaseDto(Map<String, String> map) {
        return new ConfiguracionBaseDto(map.get("club"), map.get("direccion"), map.get("telefono"),
                map.get("nif"), map.get("otros"));
    }

}
