package com.equipo2.pos.service;

import com.equipo2.pos.dto.VentaDetalleRequest;
import com.equipo2.pos.dto.VentaRequest;
import com.equipo2.pos.dto.VentaResponse;
import com.equipo2.pos.entity.Producto;
import com.equipo2.pos.entity.Usuario;
import com.equipo2.pos.entity.Venta;
import com.equipo2.pos.entity.VentaDetalle;
import com.equipo2.pos.repository.ProductoRepository;
import com.equipo2.pos.repository.UsuarioRepository;
import com.equipo2.pos.repository.VentaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public VentaService(VentaRepository ventaRepository,
                        ProductoRepository productoRepository,
                        UsuarioRepository usuarioRepository) {
        this.ventaRepository = ventaRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public VentaResponse finalizarVenta(VentaRequest request) {

        if (request.getClienteId() == null ||
                request.getProductos() == null ||
                request.getProductos().isEmpty()) {
            throw new RuntimeException("La venta no tiene datos válidos");
        }

        Usuario cliente = usuarioRepository.findById(request.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Venta venta = new Venta();
        venta.setCliente(cliente);
        venta.setFolio("VENTA-" + System.currentTimeMillis());
        venta.setFechaVenta(LocalDateTime.now());

        BigDecimal subtotalVenta = BigDecimal.ZERO;

        for (VentaDetalleRequest item : request.getProductos()) {

            if (item.getProductoId() == null ||
                    item.getCantidad() == null ||
                    item.getCantidad() <= 0) {
                throw new RuntimeException("Producto inválido en la venta");
            }

            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (!producto.getActivo()) {
                throw new RuntimeException("El producto no está disponible");
            }

            if (producto.getStockActual() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
            }

            BigDecimal cantidad = BigDecimal.valueOf(item.getCantidad());
            BigDecimal subtotalDetalle = producto.getPrecioVenta().multiply(cantidad);

            VentaDetalle detalle = new VentaDetalle();
            detalle.setVenta(venta);
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecioVenta());
            detalle.setSubtotal(subtotalDetalle);

            venta.getDetalles().add(detalle);

            producto.setStockActual(producto.getStockActual() - item.getCantidad());
            productoRepository.save(producto);

            subtotalVenta = subtotalVenta.add(subtotalDetalle);
        }

        BigDecimal impuesto = subtotalVenta.multiply(new BigDecimal("0.16"));
        BigDecimal total = subtotalVenta.add(impuesto);

        venta.setSubtotal(subtotalVenta);
        venta.setImpuesto(impuesto);
        venta.setTotal(total);

        Venta ventaGuardada = ventaRepository.save(venta);

        return new VentaResponse(
                ventaGuardada.getId(),
                ventaGuardada.getFolio(),
                ventaGuardada.getFechaVenta(),
                ventaGuardada.getSubtotal(),
                ventaGuardada.getImpuesto(),
                ventaGuardada.getTotal()
        );
    }

    public List<VentaResponse> historialPorCliente(Long clienteId) {
        return ventaRepository.findByClienteIdOrderByFechaVentaDesc(clienteId)
                .stream()
                .map(venta -> new VentaResponse(
                        venta.getId(),
                        venta.getFolio(),
                        venta.getFechaVenta(),
                        venta.getSubtotal(),
                        venta.getImpuesto(),
                        venta.getTotal()
                ))
                .toList();
    }
}