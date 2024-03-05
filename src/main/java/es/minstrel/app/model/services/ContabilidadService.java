package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Categoria;
import es.minstrel.app.model.entities.Concepto;
import es.minstrel.app.model.entities.Cuenta;
import es.minstrel.app.model.entities.RazonSocial;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;

import java.util.List;

public interface ContabilidadService {

    List<Categoria> getAllCategorias();

    void createCategoria(String name) throws DuplicateInstanceException;

    void updateCategoria(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException;

    List<Concepto> getAllConcepto();

    void createConcepto(String name) throws DuplicateInstanceException;

    void updateConcepto(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException;

    List<RazonSocial> getAllRazonSocial(String keywords);

    void createRazonSocial(String denominacion, String cifnif) throws DuplicateInstanceException;

    void updateRazonSocial(Long id, String denominacion, String cifnif) throws DuplicateInstanceException, InstanceNotFoundException;

    List<Cuenta> getAllCuentas();

    void createCuentas(String name) throws DuplicateInstanceException;

    void updateCuentas(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException;

}
