package com.equipo2.pos.repository;

import com.equipo2.pos.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Optional<Producto> findByCodigoBarras(String codigoBarras);

    boolean existsByCodigoBarras(String codigoBarras);

    List<Producto> findByActivoTrue();

    List<Producto> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre);
}