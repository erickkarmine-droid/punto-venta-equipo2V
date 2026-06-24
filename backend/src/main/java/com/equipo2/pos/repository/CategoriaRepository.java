package com.equipo2.pos.repository;

import com.equipo2.pos.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    boolean existsByCategoriaIgnoreCase(String categoria);

    List<Categoria> findByCategoriaContainingIgnoreCase(String categoria);
}