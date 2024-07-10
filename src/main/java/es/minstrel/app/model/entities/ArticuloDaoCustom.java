package es.minstrel.app.model.entities;

import org.springframework.data.domain.Page;

public interface ArticuloDaoCustom {

    Page<Articulo> find(String name, Boolean tipo, Byte genero, int page, int size);

}
