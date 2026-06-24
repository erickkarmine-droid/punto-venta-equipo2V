package com.equipo2.pos.controller;

import com.equipo2.pos.dto.MensajeResponse;
import com.equipo2.pos.entity.Categoria;
import com.equipo2.pos.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<?> listarCategorias() {
        return ResponseEntity.ok(categoriaService.listarCategorias());
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarCategorias(@RequestParam String categoria) {
        return ResponseEntity.ok(categoriaService.buscarCategorias(categoria));
    }

    @PostMapping
    public ResponseEntity<?> crearCategoria(@RequestBody Categoria categoria) {
        try {
            return ResponseEntity.ok(categoriaService.crearCategoria(categoria));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MensajeResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long id) {
        try {
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.ok(new MensajeResponse("Categoría eliminada correctamente"));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MensajeResponse("No se puede eliminar la categoría porque tiene productos asociados"));
        }
    }
}