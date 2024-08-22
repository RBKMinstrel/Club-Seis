package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Configuracion;
import es.minstrel.app.model.entities.ConfiguracionDao;
import es.minstrel.app.model.exceptions.UninitializedParameterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ConfiguracionServiceImpl implements ConfiguracionService {

    @Autowired
    private ConfiguracionDao configuracionDao;

    private void updateClaveValor(String clave, String valor) {

        Optional<Configuracion> configuracionOptional = configuracionDao.findByClave(clave);

        Configuracion configuracion;

        if (configuracionOptional.isEmpty()) {
            configuracion = new Configuracion(clave, valor);
        } else {
            configuracion = configuracionOptional.get();
            configuracion.setValor(valor);
        }

        configuracionDao.save(configuracion);

    }

    @Override
    public String getValorByClave(String clave) {

        Optional<Configuracion> configuracionOptional = configuracionDao.findByClave(clave);

        if (configuracionOptional.isPresent())
            return configuracionOptional.get().getValor();
        else
            return "";

    }

    @Override
    public String findValorByClave(String clave)
            throws UninitializedParameterException {

        Optional<Configuracion> configuracionOptional = configuracionDao.findByClave(clave);

        if (configuracionOptional.isPresent())
            return configuracionOptional.get().getValor();
        else
            throw new UninitializedParameterException();

    }

    @Override
    public Map<String, String> findConfiguracionBase() {
        Map<String, String> claveValor = new HashMap<>();

        claveValor.put("club", getValorByClave("club"));
        claveValor.put("direccion", getValorByClave("direccion"));
        claveValor.put("telefono", getValorByClave("telefono"));
        claveValor.put("nif", getValorByClave("nif"));
        claveValor.put("otros", getValorByClave("otros"));

        return claveValor;
    }

    @Override
    public void updateConfiguracionBase(Map<String, String> claveValor) {
        for (Map.Entry<String, String> entry : claveValor.entrySet()) {
            updateClaveValor(entry.getKey(), entry.getValue());
        }
    }
}
