package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfiguracionDao extends JpaRepository<Configuracion, Long> {

    Optional<Configuracion> findByClave(String clave);

}
