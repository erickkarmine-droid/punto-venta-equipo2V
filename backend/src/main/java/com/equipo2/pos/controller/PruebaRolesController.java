package com.equipo2.pos.controller;

import com.equipo2.pos.entity.Usuario;
import com.equipo2.pos.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class PruebaRolesController {

    private final UsuarioRepository usuarioRepository;

    public PruebaRolesController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/validar/{usuarioId}")
    public String validarRol(@PathVariable Long usuarioId) {

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuario.getRol().equals("Administrador")) {
            return "Acceso permitido: Administrador";
        }

        if (usuario.getRol().equals("Cliente")) {
            return "Acceso permitido: Cliente";
        }

        return "Rol no válido";
    }
}