package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RazonSocialDao extends JpaRepository<RazonSocial, Long> {

    boolean existsByCifnif(String cifnif);

    List<RazonSocial> getAllByDenominacionOrCifnif(String denominacion, String cifnif);

    Optional<RazonSocial> getRazonSocialsByCifnif(String Cifnif);

}
