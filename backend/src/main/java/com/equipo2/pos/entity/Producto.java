package com.equipo2.pos.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_barras", unique = true, length = 100)
    private String codigoBarras;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(length = 250)
    private String descripcion;

    @Column(name = "imagen_url", length = 255)
    private String imagenUrl;

    @Column(name = "precio_compra", nullable = false, precision = 6, scale = 2)
    private BigDecimal precioCompra;

    @Column(name = "precio_venta", nullable = false, precision = 6, scale = 2)
    private BigDecimal precioVenta;

    @Column(name = "stock_actual", nullable = false)
    private Integer stockActual = 0;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Column(nullable = false)
    private Boolean activo = true;

    public Long getId() {
        return id;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public BigDecimal getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(BigDecimal precioCompra) {
        this.precioCompra = precioCompra;
    }

    public BigDecimal getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(BigDecimal precioVenta) {
        this.precioVenta = precioVenta;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}