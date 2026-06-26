package com.equipo2.pos.controller;

import com.equipo2.pos.dto.MensajeResponse;
import com.equipo2.pos.dto.ProductoRequest;
import com.equipo2.pos.entity.Producto;
import com.equipo2.pos.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public ResponseEntity<?> registrarProducto(
            @RequestBody ProductoRequest request) {

        try {

            Producto producto =
                productoService.registrarProducto(request);

            return ResponseEntity.ok(producto);

        } catch (RuntimeException e) {

            return ResponseEntity
                .badRequest()
                .body(new MensajeResponse(e.getMessage()));
        }
    }
    @GetMapping
    public ResponseEntity<?> listarProductos() {
    return ResponseEntity.ok(productoService.listarProductosActivos());
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorNombre(@RequestParam String nombre) {
    return ResponseEntity.ok(productoService.buscarProductosPorNombre(nombre));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProducto(@PathVariable Long id) {
        try {

            return ResponseEntity.ok(productoService.obtenerProductoPorId(id));

        } catch (RuntimeException e) {
        return ResponseEntity

            .badRequest()
            .body(new MensajeResponse(e.getMessage()));

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {

        try {

            productoService.eliminarProducto(id);

            return ResponseEntity.ok(
            new MensajeResponse("Producto eliminado correctamente"));

        } catch (RuntimeException e) {

            return ResponseEntity
            .badRequest()
            .body(new MensajeResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<?> actualizarStock(
        @PathVariable Long id,
        @RequestBody ProductoRequest request) {

        try {
            Producto producto = productoService.actualizarStock(
                id,
                request.getStockActual()
            );

            return ResponseEntity.ok(producto);

        } catch (RuntimeException e) {
            return ResponseEntity
            .badRequest()
            .body(new MensajeResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarProducto(
        @PathVariable Long id,
        @RequestBody ProductoRequest request) {

        try {

            Producto producto = productoService.editarProducto(id, request);

            return ResponseEntity.ok(producto);

        } catch (RuntimeException e) {

            return ResponseEntity

            .badRequest()

            .body(new MensajeResponse(e.getMessage()));

        }

    }

    @PutMapping("/{id}/reactivar")
    public ResponseEntity<?> reactivarProducto(
            @PathVariable Long id) {

        try {

            Producto producto =
            productoService.reactivarProducto(id);

            return ResponseEntity.ok(producto);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(new MensajeResponse(
                            e.getMessage()
            ));
        }
    }
}