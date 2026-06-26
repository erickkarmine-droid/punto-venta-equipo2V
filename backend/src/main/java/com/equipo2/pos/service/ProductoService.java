package com.equipo2.pos.service;

import com.equipo2.pos.dto.ProductoRequest;
import com.equipo2.pos.entity.Categoria;
import com.equipo2.pos.entity.Producto;
import com.equipo2.pos.repository.CategoriaRepository;
import com.equipo2.pos.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoService(ProductoRepository productoRepository,
                           CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public Producto registrarProducto(ProductoRequest request) {
        validarProducto(request, null);

        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("La categoría seleccionada no existe"));

        Producto producto = new Producto();
        producto.setCodigoBarras(request.getCodigoBarras());
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setImagenUrl(request.getImagenUrl());
        producto.setPrecioCompra(request.getPrecioCompra());
        producto.setPrecioVenta(request.getPrecioVenta());
        producto.setStockActual(request.getStockActual() == null ? 0 : request.getStockActual());
        producto.setCategoria(categoria);
        producto.setActivo(true);

        return productoRepository.save(producto);
    }

    public List<Producto> listarProductosActivos() {
    return productoRepository.findAll();
    }

    public List<Producto> buscarProductosPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre);
    }

    public void eliminarProducto(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setActivo(false);
        productoRepository.save(producto);
    }

    public Producto actualizarStock(Long id, Integer stockActual) {
        if (stockActual == null || stockActual < 0 || stockActual > 500) {
            throw new RuntimeException("El stock debe ser un número entero entre 0 y 500");
        }

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setStockActual(stockActual);

        return productoRepository.save(producto);
    }

    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Producto editarProducto(Long id, ProductoRequest request) {
        validarProducto(request, id);

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("La categoría seleccionada no existe"));

        producto.setCodigoBarras(request.getCodigoBarras());
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setImagenUrl(request.getImagenUrl());
        producto.setPrecioCompra(request.getPrecioCompra());
        producto.setPrecioVenta(request.getPrecioVenta());
        producto.setStockActual(request.getStockActual() == null ? 0 : request.getStockActual());
        producto.setCategoria(categoria);

        return productoRepository.save(producto);
    }

    private void validarProducto(ProductoRequest request, Long idProductoActual) {

        if (esVacio(request.getNombre()) ||
                request.getCategoriaId() == null ||
                request.getPrecioCompra() == null ||
                request.getPrecioVenta() == null) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (!request.getNombre().matches("^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ ]{1,50}$")) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (!esVacio(request.getImagenUrl())) {
            String imagen = request.getImagenUrl().toLowerCase();

            if (!(imagen.endsWith(".jpg") ||
                    imagen.endsWith(".jpeg") ||
                    imagen.endsWith(".png"))) {
                throw new RuntimeException("La imagen debe tener formato JPG, JPEG o PNG");
            }
        }

        if (!esVacio(request.getDescripcion())) {
            if (request.getDescripcion().length() > 250) {
                throw new RuntimeException("La descripción no debe exceder 250 caracteres");
            }

            if (!request.getDescripcion().matches("^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ .,]+$")) {
                throw new RuntimeException("La descripción debe ser alfanumérica");
            }
        }

        validarPrecio(request.getPrecioCompra());
        validarPrecio(request.getPrecioVenta());

        if (request.getStockActual() != null &&
                (request.getStockActual() < 0 || request.getStockActual() > 500)) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (!esVacio(request.getCodigoBarras())) {
            productoRepository.findByCodigoBarras(request.getCodigoBarras())
                    .ifPresent(productoExistente -> {
                        if (idProductoActual == null ||
                                !productoExistente.getId().equals(idProductoActual)) {
                            throw new RuntimeException("El código de barras ya está registrado");
                        }
                    });
        }
    }

    private void validarPrecio(BigDecimal precio) {
        if (precio.compareTo(BigDecimal.ZERO) <= 0 ||
                precio.compareTo(new BigDecimal("9999.99")) > 0 ||
                precio.scale() > 2) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }
    }

    private boolean esVacio(String valor) {
        return valor == null || valor.trim().isEmpty();
    }

    public Producto reactivarProducto(Long id) {

    Producto producto = productoRepository.findById(id)
                .orElseThrow(() ->
                new RuntimeException("Producto no encontrado"));

        producto.setActivo(true);

        return productoRepository.save(producto);
    }
}