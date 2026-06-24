package com.equipo2.pos.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class VentaResponse {

    private Long id;
    private String folio;
    private LocalDateTime fechaVenta;
    private BigDecimal subtotal;
    private BigDecimal impuesto;
    private BigDecimal total;

    public VentaResponse(Long id, String folio, LocalDateTime fechaVenta,
                         BigDecimal subtotal, BigDecimal impuesto, BigDecimal total) {
        this.id = id;
        this.folio = folio;
        this.fechaVenta = fechaVenta;
        this.subtotal = subtotal;
        this.impuesto = impuesto;
        this.total = total;
    }

    public Long getId() { return id; }
    public String getFolio() { return folio; }
    public LocalDateTime getFechaVenta() { return fechaVenta; }
    public BigDecimal getSubtotal() { return subtotal; }
    public BigDecimal getImpuesto() { return impuesto; }
    public BigDecimal getTotal() { return total; }
}