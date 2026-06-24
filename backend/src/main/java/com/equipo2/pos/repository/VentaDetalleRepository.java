package com.equipo2.pos.repository;

import com.equipo2.pos.entity.VentaDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaDetalleRepository extends JpaRepository<VentaDetalle, Long> {
}