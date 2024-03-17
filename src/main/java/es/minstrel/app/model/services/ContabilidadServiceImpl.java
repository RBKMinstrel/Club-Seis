package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.DuplicateInstanceException;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @Autowired
    private MovimientoDao movimientoDao;

    private Categoria recuperarCategoria(Long id)
            throws InstanceNotFoundException {

        Optional<Categoria> categoriaOptional = categoriaDao.findById(id);

        if (categoriaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.categoria", id);
        else
            return categoriaOptional.get();
    }

    private Concepto recuperarConcepto(Long id)
            throws InstanceNotFoundException {

        Optional<Concepto> conceptoOptional = conceptoDao.findById(id);

        if (conceptoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.concepto", id);
        else
            return conceptoOptional.get();

    }

    private RazonSocial recuperarRazonSocial(Long id)
            throws InstanceNotFoundException {

        Optional<RazonSocial> razonSocialOptional = razonSocialDao.findById(id);

        if (razonSocialOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.razonSocial", id);
        else
            return razonSocialOptional.get();

    }

    private Cuenta recuperarCuenta(Long id)
            throws InstanceNotFoundException {

        Optional<Cuenta> cuentaOptional = cuentaDao.findById(id);

        if (cuentaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.cuenta", id);
        else
            return cuentaOptional.get();

    }

    private Movimiento recuperarMovimiento(Long id)
            throws InstanceNotFoundException {

        Optional<Movimiento> movimientoOptional = movimientoDao.findById(id);

        if (movimientoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.movimiento", id);
        else
            return movimientoOptional.get();

    }

    @Override
    public List<Categoria> getAllCategorias() {
        return categoriaDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public void createCategoria(String name)
            throws DuplicateInstanceException {

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        categoriaDao.save(new Categoria(name));

    }

    @Override
    public void updateCategoria(Long id, String name)
            throws DuplicateInstanceException, InstanceNotFoundException {

        Categoria categoria = recuperarCategoria(id);

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
        Concepto concepto = recuperarConcepto(id);

        if (concepto.getName().equals(name))
            return;

        if (categoriaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.categoria", name);

        concepto.setName(name);

    }

    @Override
    public List<RazonSocial> getAllRazonSocial() {
        return razonSocialDao.findAll(Sort.by(Sort.Direction.ASC, "denominacion"));
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
    public void updateRazonSocial(Long id, String denominacion, String cifnif)
            throws InstanceNotFoundException, DuplicateInstanceException {
        RazonSocial razonSocial = recuperarRazonSocial(id);

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
        Cuenta cuenta = recuperarCuenta(id);

        if (cuenta.getName().equals(name))
            return;

        if (cuentaDao.existsByName(name))
            throw new DuplicateInstanceException("project.entities.cuenta", name);

        cuenta.setName(name);

    }

    @Override
    public Block<Movimiento> getMovimientos(LocalDate fecha, Long conceptoId, Long categoriaId, Long cuentaId, int page, int size) {

        Slice<Movimiento> slice = movimientoDao.find(fecha, conceptoId, categoriaId, cuentaId, page, size);

        return new Block<>(slice.getContent(), slice.hasNext());
    }

    @Override
    public Movimiento getMovimiento(Long id) throws InstanceNotFoundException {
        return recuperarMovimiento(id);
    }

    @Override
    public void createMovimiento(Movimiento movimiento, Long razonSocialId, Long conceptoId, Long categoriaId, Long cuentaId)
            throws InstanceNotFoundException {

        RazonSocial razonSocial = razonSocialId != null ? recuperarRazonSocial(razonSocialId) : null;
        Concepto concepto = conceptoId != null ? recuperarConcepto(conceptoId) : null;
        Categoria categoria = categoriaId != null ? recuperarCategoria(categoriaId) : null;
        Cuenta cuenta = cuentaId != null ? recuperarCuenta(cuentaId) : null;

        movimiento.setRazonSocial(razonSocial);
        movimiento.setConcepto(concepto);
        movimiento.setCategoria(categoria);
        movimiento.setCuenta(cuenta);

        movimientoDao.save(movimiento);

    }

    @Override
    public void updateMovimiento(Long id, LocalDate fecha, boolean esGasto, BigDecimal base0, BigDecimal base4,
                                 BigDecimal base10, BigDecimal base21, Long razonSocialId, Long conceptoId,
                                 Long categoriaId, Long cuentaId)
            throws InstanceNotFoundException {

        Movimiento movimiento = recuperarMovimiento(id);

        RazonSocial razonSocial = razonSocialId != null ? recuperarRazonSocial(razonSocialId) : null;
        Concepto concepto = conceptoId != null ? recuperarConcepto(conceptoId) : null;
        Categoria categoria = categoriaId != null ? recuperarCategoria(categoriaId) : null;
        Cuenta cuenta = cuentaId != null ? recuperarCuenta(cuentaId) : null;

        movimiento.setFecha(fecha);
        movimiento.setEsGasto(esGasto);
        movimiento.setBase0(base0);
        movimiento.setBase4(base4);
        movimiento.setBase10(base10);
        movimiento.setBase21(base21);
        movimiento.setRazonSocial(razonSocial);
        movimiento.setConcepto(concepto);
        movimiento.setCategoria(categoria);
        movimiento.setCuenta(cuenta);

        movimientoDao.save(movimiento);

    }

    @Override
    public void deleteMovimiento(Long id)
            throws InstanceNotFoundException {

        if (movimientoDao.existsById(id))
            movimientoDao.deleteById(id);
        else
            throw new InstanceNotFoundException("project.entities.movimiento", id);

    }
}
