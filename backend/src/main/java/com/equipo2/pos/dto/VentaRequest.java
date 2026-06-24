package com.equipo2.pos.dto;

import java.util.List;

public class VentaRequest {

    private Long clienteId;
    private List<VentaDetalleRequest> productos;

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public List<VentaDetalleRequest> getProductos() {
        return productos;
    }

    public void setProductos(List<VentaDetalleRequest> productos) {
        this.productos = productos;
    }
}