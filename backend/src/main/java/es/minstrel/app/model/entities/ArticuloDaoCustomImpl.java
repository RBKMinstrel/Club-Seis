package es.minstrel.app.model.entities;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public class ArticuloDaoCustomImpl implements ArticuloDaoCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public Page<Articulo> find(String name, Boolean tipo, Byte genero, int page, int size) {

        boolean aux = false;
        String queryString = "SELECT a FROM Articulo a";
        String countQueryString = "SELECT COUNT(a) FROM Articulo a";

        if (name != null || tipo != null || genero != null) {
            queryString += " WHERE ";
            countQueryString += " WHERE ";
        }

        if (name != null) {
            queryString += "LOWER(a.name) LIKE LOWER(:name)";
            ;
            countQueryString += "LOWER(a.name) LIKE LOWER(:name)";
            aux = true;
        }

        if (tipo != null) {

            if (aux) {
                queryString += " AND ";
                countQueryString += " AND ";
            }

            queryString += "a.esRopa = :tipo";
            countQueryString += "a.esRopa = :tipo";
            aux = true;
        }

        if (genero != null) {

            if (aux) {
                queryString += " AND ";
                countQueryString += " AND ";
            }

            queryString += "a.genero = :genero";
            countQueryString += "a.genero = :genero";
            aux = true;
        }

        queryString += " ORDER BY a.name DESC";

        Query query = entityManager.createQuery(queryString)
                .setFirstResult(page * size)
                .setMaxResults(size);

        Query countQuery = entityManager.createQuery(countQueryString);

        if (name != null) {
            query.setParameter("name", name);
            countQuery.setParameter("name", name);
        }

        if (tipo != null) {
            query.setParameter("tipo", tipo);
            countQuery.setParameter("tipo", tipo);
        }

        if (genero != null) {
            query.setParameter("genero", Articulo.Genero.fromValor(genero));
            countQuery.setParameter("genero", Articulo.Genero.fromValor(genero));
        }

        List<Articulo> articulos = query.getResultList();
        Long totalResultados = (Long) countQuery.getSingleResult();

        return new PageImpl<>(articulos, PageRequest.of(page, size), totalResultados);
    }
}
