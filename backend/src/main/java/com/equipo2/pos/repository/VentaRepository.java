package com.equipo2.pos.repository;

import com.equipo2.pos.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {
    List<Venta> findByClienteIdOrderByFechaVentaDesc(Long clienteId);
}