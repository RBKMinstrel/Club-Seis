package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Carrito;
import es.minstrel.app.model.entities.User;
import es.minstrel.app.model.exceptions.InstanceNotFoundException;
import es.minstrel.app.model.exceptions.PermissionException;

public interface PermissionChecker {

    void checkUserExists(Long userId) throws InstanceNotFoundException;

    User checkUser(Long userId) throws InstanceNotFoundException;

    boolean checkUserIsAdmin(Long userId) throws InstanceNotFoundException;

    Carrito checkCarritoExistsAndBelongsTo(Long carritoId, Long userId)
            throws PermissionException, InstanceNotFoundException;
}
