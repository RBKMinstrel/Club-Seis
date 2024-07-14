package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Carrito;
import es.minstrel.app.model.entities.CarritoItem;
import es.minstrel.app.model.entities.Existencias;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CarritoConversor {

    private CarritoConversor() {
    }

    public final static CarritoDto toCarritoDto(Carrito carrito) {

        List<CarritoItemDto> items =
                carrito.getCarritoItems().stream().map(CarritoConversor::toCarritoItemDto)
                        .sorted(Comparator.comparing(CarritoItemDto::getArticuloName)).collect(Collectors.toList());

        return new CarritoDto(carrito.getId(), items, carrito.getTotalPrecio(),
                carrito.getTotalPrecioSocio(), items.stream().allMatch(CarritoItemDto::isItemDisponible));

    }

    private final static CarritoItemDto toCarritoItemDto(CarritoItem item) {
        Optional<Existencias> existenciasOptional = item.getArticulo().getExistenciaByTalla(item.getTalla());
        boolean stockDisponible = existenciasOptional.isPresent() && existenciasOptional.get().getCantidad() >= item.getQuantity();

        return new CarritoItemDto(item.getArticulo().getId(), item.getArticulo().getName(),
                item.getTalla() == null ? null : item.getTalla().getId(), item.getArticulo().getPrecio(),
                item.getArticulo().getPrecioSocio(), (int) item.getQuantity(), stockDisponible);

    }
}
