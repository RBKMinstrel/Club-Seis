package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ContabilidadServiceImpl implements ContabilidadService {

    @Autowired
    private CategoriaDao categoriaDao;

    @Autowired
    private ConceptoDao conceptoDao;

    @Autowired
    private RazonSocialDao razonSocialDao;

    @Autowired
    private CuentaDao cuentaDao;

    @Override
    public List<Categoria> getAllCategorias() {
        return categoriaDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void createCategoria(String name) throws DuplicateInstanceException {

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        categoriaDao.save(new Categoria(name));

    }

    @Override
    public void updateCategoria(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException {

        Optional<Categoria> categoriaOptional = categoriaDao.findById(id);

        if (categoriaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.categoria", id);

        Categoria categoria = categoriaOptional.get();

        if (categoria.getName().equals(name))
            return;

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        categoria.setName(name);

    }

    @Override
    public List<Concepto> getAllConcepto() {
        return conceptoDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void createConcepto(String name) throws DuplicateInstanceException {

        if (conceptoDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.concepto", name);

        conceptoDao.save(new Concepto(name));
    }

    @Override
    public void updateConcepto(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException {

        Optional<Concepto> conceptoOptional = conceptoDao.findById(id);

        if (conceptoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.concepto", id);

        Concepto concepto = conceptoOptional.get();

        if (concepto.getName().equals(name))
            return;

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        concepto.setName(name);

    }

    @Override
    public List<RazonSocial> getAllRazonSocial(String keywords) {
        return razonSocialDao.getAllByDenominacionOrCifnif(keywords, keywords);
    }

    @Override
    public void createRazonSocial(String denominacion, String cifnif) throws DuplicateInstanceException {

        if (razonSocialDao.existsByCifnif(cifnif))
            throw new DuplicateInstanceException("project.entities.razonSocial", cifnif);

        razonSocialDao.save(new RazonSocial(denominacion, cifnif));

    }

    @Override
    public void updateRazonSocial(Long id, String denominacion, String cifnif) throws InstanceNotFoundException, DuplicateInstanceException {

        Optional<RazonSocial> razonSocialOptional = razonSocialDao.findById(id);

        if (razonSocialOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.razonSocial", id);

        RazonSocial razonSocial = razonSocialOptional.get();

        if (razonSocial.getDenominacion().equals(denominacion) && razonSocial.getCifnif().equals(cifnif))
            return;

        if (!razonSocial.getCifnif().equals(cifnif) && razonSocialDao.existsByCifnif(cifnif))
            throw new DuplicateInstanceException("project.entities.razonSocial", cifnif);

        razonSocial.setDenominacion(denominacion);
        razonSocial.setCifnif(cifnif);

    }

    @Override
    public List<Cuenta> getAllCuentas() {
        return cuentaDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void createCuentas(String name) throws DuplicateInstanceException {

        if (cuentaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.cuenta", name);

        cuentaDao.save(new Cuenta(name));

    }

    @Override
    public void updateCuentas(Long id, String name) throws DuplicateInstanceException, InstanceNotFoundException {


        Optional<Cuenta> cuentaOptional = cuentaDao.findById(id);

        if (cuentaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.cuenta", id);

        Cuenta cuenta = cuentaOptional.get();

        if (cuenta.getName().equals(name))
            return;

        if (cuentaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.cuenta", name);

        cuenta.setName(name);

    }
}
