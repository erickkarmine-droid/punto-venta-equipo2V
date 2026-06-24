package com.equipo2.pos.controller;

import com.equipo2.pos.dto.MensajeResponse;
import com.equipo2.pos.entity.Usuario;
import com.equipo2.pos.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<?> listarUsuarios(
            @RequestParam(required = false) String busqueda,
            @RequestParam(required = false, defaultValue = "AMBOS") String rol) {

        return ResponseEntity.ok(
                usuarioService.listarUsuarios(busqueda, rol)
        );
    }

    @PutMapping("/{id}/hacer-administrador")
    public ResponseEntity<?> convertirAAdministrador(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.convertirAAdministrador(id);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MensajeResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}/eliminar-administrador")
    public ResponseEntity<?> eliminarAdministrador(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.eliminarAdministrador(id);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MensajeResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}/desactivar")
    public ResponseEntity<?> desactivarUsuario(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.desactivarUsuario(id);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MensajeResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}/reactivar")
    public ResponseEntity<?> reactivarUsuario(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.reactivarUsuario(id);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MensajeResponse(e.getMessage()));
        }
    }
}