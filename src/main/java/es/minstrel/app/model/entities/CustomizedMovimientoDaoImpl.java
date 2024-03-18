package es.minstrel.app.model.entities;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.time.LocalDate;
import java.util.List;

public class CustomizedMovimientoDaoImpl implements CustomizedMovimientoDao {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public Slice<Movimiento> find(LocalDate fecha, Long razonSocialId, Long conceptoId, Long categoriaId,
                                  Long cuentaId, int page, int size) {

        boolean aux = false;
        String queryString = "SELECT m FROM Movimiento m";

        if (fecha != null || razonSocialId != null || conceptoId != null || categoriaId != null || cuentaId != null) {
            queryString += " WHERE ";
        }

        if (fecha != null) {
            queryString += "m.fecha = :fecha";
            aux = true;
        }

        if (razonSocialId != null) {

            if (aux) {
                queryString += " AND ";
            }

            queryString += "m.razonSocial.id = :razonSocialId";
            aux = true;

        }

        if (conceptoId != null) {

            if (aux) {
                queryString += " AND ";
            }

            queryString += "m.concepto.id = :conceptoId";
            aux = true;

        }

        if (categoriaId != null) {

            if (aux) {
                queryString += " AND ";
            }

            queryString += "m.categoria.id = :categoriaId";
            aux = true;

        }

        if (cuentaId != null) {

            if (aux) {
                queryString += " AND ";
            }

            queryString += "m.cuenta.id = :cuentaId";

        }

        queryString += " ORDER BY m.fecha";

        Query query = entityManager.createQuery(queryString).setFirstResult(page * size).setMaxResults(size + 1);

        if (fecha != null) {
            query.setParameter("fecha", fecha);
        }

        if (razonSocialId != null) {
            query.setParameter("razonSocialId", razonSocialId);
        }

        if (conceptoId != null) {
            query.setParameter("conceptoId", conceptoId);
        }

        if (categoriaId != null) {
            query.setParameter("categoriaId", categoriaId);
        }

        if (cuentaId != null) {
            query.setParameter("cuentaId", cuentaId);
        }

        List<Movimiento> movimientos = query.getResultList();
        boolean hasNext = movimientos.size() == (size + 1);

        if (hasNext) {
            movimientos.remove(movimientos.size() - 1);
        }

        return new SliceImpl<>(movimientos, PageRequest.of(page, size), hasNext);
    }
}
