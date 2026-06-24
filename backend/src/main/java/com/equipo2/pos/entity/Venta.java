package com.equipo2.pos.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ventas")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String folio;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Usuario cliente;

    @Column(name = "fecha_venta", nullable = false)
    private LocalDateTime fechaVenta;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal impuesto;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VentaDetalle> detalles = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (fechaVenta == null) {
            fechaVenta = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }

    public String getFolio() { return folio; }
    public void setFolio(String folio) { this.folio = folio; }

    public Usuario getCliente() { return cliente; }
    public void setCliente(Usuario cliente) { this.cliente = cliente; }

    public LocalDateTime getFechaVenta() { return fechaVenta; }
    public void setFechaVenta(LocalDateTime fechaVenta) { this.fechaVenta = fechaVenta; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getImpuesto() { return impuesto; }
    public void setImpuesto(BigDecimal impuesto) { this.impuesto = impuesto; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public List<VentaDetalle> getDetalles() { return detalles; }
    public void setDetalles(List<VentaDetalle> detalles) { this.detalles = detalles; }
}