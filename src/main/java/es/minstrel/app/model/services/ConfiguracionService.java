package es.minstrel.app.model.services;

import es.minstrel.app.model.exceptions.UninitializedParameterException;

import java.util.Map;

public interface ConfiguracionService {

    String getValorByClave(String clave);

    String findValorByClave(String clave)
            throws UninitializedParameterException;

    Map<String, String> findConfiguracionBase();

    void updateConfiguracionBase(Map<String, String> claveValor);

}
