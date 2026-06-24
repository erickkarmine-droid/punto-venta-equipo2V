package com.equipo2.pos.service;

import com.equipo2.pos.entity.Categoria;
import com.equipo2.pos.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    public List<Categoria> buscarCategorias(String categoria) {
        if (categoria == null || categoria.trim().isEmpty()) {
            return listarCategorias();
        }

        return categoriaRepository.findByCategoriaContainingIgnoreCase(categoria);
    }

    public Categoria crearCategoria(Categoria categoria) {
        if (categoria.getCategoria() == null || categoria.getCategoria().trim().isEmpty()) {
            throw new RuntimeException("Debe ingresar el nombre de la categoría");
        }

        categoria.setCategoria(categoria.getCategoria().trim());

        if (!categoria.getCategoria().matches("^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new RuntimeException("La categoría solo debe contener letras, números y espacios");
        }

        if (categoria.getCategoria().length() > 50) {
            throw new RuntimeException("La categoría no debe exceder 50 caracteres");
        }

        if (categoriaRepository.existsByCategoriaIgnoreCase(categoria.getCategoria())) {
            throw new RuntimeException("La categoría ya está registrada");
        }

    return categoriaRepository.save(categoria);
}

    public void eliminarCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        categoriaRepository.delete(categoria);
    }
}