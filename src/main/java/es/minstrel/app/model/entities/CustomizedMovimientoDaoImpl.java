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
                                  Long cuentaId, Boolean esGasto, int page, int size) {

        boolean aux = false;
        String queryString = "SELECT m FROM Movimiento m";

        if (fecha != null || razonSocialId != null || conceptoId != null || categoriaId != null ||
                cuentaId != null || esGasto != null) {
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

            if (razonSocialId != -1)
                queryString += "m.razonSocial.id = :razonSocialId";
            else
                queryString += "m.razonSocial IS NULL";

            aux = true;

        }

        if (conceptoId != null) {

            if (aux) {
                queryString += " AND ";
            }

            if (conceptoId != -1)
                queryString += "m.concepto.id = :conceptoId";
            else
                queryString += "m.concepto IS NULL";

            aux = true;

        }

        if (categoriaId != null) {

            if (aux) {
                queryString += " AND ";
            }

            if (categoriaId != -1)
                queryString += "m.categoria.id = :categoriaId";
            else
                queryString += "m.categoria IS NULL";

            aux = true;

        }

        if (cuentaId != null) {

            if (aux) {
                queryString += " AND ";
            }

            if (cuentaId != -1)
                queryString += "m.cuenta.id = :cuentaId";
            else
                queryString += "m.cuenta IS NULL";

            aux = true;

        }

        if (esGasto != null) {

            if (aux) {
                queryString += " AND ";
            }

            queryString += "m.esGasto = :esGasto";

        }

        queryString += " ORDER BY m.fecha";

        Query query = entityManager.createQuery(queryString).setFirstResult(page * size).setMaxResults(size + 1);

        if (fecha != null) {
            query.setParameter("fecha", fecha);
        }

        if (razonSocialId != null && razonSocialId != -1) {
            query.setParameter("razonSocialId", razonSocialId);
        }

        if (conceptoId != null && conceptoId != -1) {
            query.setParameter("conceptoId", conceptoId);
        }

        if (categoriaId != null && categoriaId != -1) {
            query.setParameter("categoriaId", categoriaId);
        }

        if (cuentaId != null && cuentaId != -1) {
            query.setParameter("cuentaId", cuentaId);
        }

        if (esGasto != null) {
            query.setParameter("esGasto", esGasto);
        }

        List<Movimiento> movimientos = query.getResultList();
        boolean hasNext = movimientos.size() == (size + 1);

        if (hasNext) {
            movimientos.remove(movimientos.size() - 1);
        }

        return new SliceImpl<>(movimientos, PageRequest.of(page, size), hasNext);
    }
}
