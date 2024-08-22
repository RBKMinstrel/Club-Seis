package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PermissionCheckerImpl implements PermissionChecker {

    @Autowired
    private UserDao userDao;

    @Autowired
    private CarritoDao carritoDao;

    @Override
    public void checkUserExists(Long userId) throws InstanceNotFoundException {

        if (!userDao.existsById(userId)) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

    }

    @Override
    public User checkUser(Long userId) throws InstanceNotFoundException {

        Optional<User> user = userDao.findById(userId);

        if (user.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }

        return user.get();

    }

    @Override
    public boolean checkUserIsAdmin(Long userId) throws InstanceNotFoundException {
        User user = checkUser(userId);

        if (user.getUserRols() != null)
            for (UserRol userRol : user.getUserRols()) {
                if (userRol.getRol().getRole().equals("ADMIN"))
                    return true;
            }

        return false;
    }

    @Override
    public Carrito checkCarritoExistsAndBelongsTo(Long carritoId, Long userId)
            throws PermissionException, InstanceNotFoundException {

        Optional<Carrito> carritoOptional = carritoDao.findById(carritoId);

        if (carritoOptional.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.carrito", carritoId);
        }

        if (carritoOptional.get().getUser().getId() != userId) {
            throw new PermissionException();
        }

        return carritoOptional.get();

    }

}
