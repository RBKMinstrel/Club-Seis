package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CuentaDao extends JpaRepository<Cuenta, Long> {
}
