package com.equipo2.pos.controller;

import com.equipo2.pos.dto.VentaRequest;
import com.equipo2.pos.dto.VentaResponse;
import com.equipo2.pos.service.VentaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "http://localhost:4200")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping("/finalizar")
    public VentaResponse finalizarVenta(@RequestBody VentaRequest request) {
        return ventaService.finalizarVenta(request);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<VentaResponse> historialPorCliente(@PathVariable Long clienteId) {
        return ventaService.historialPorCliente(clienteId);
    }
}