package com.equipo2.pos.controller;

import com.equipo2.pos.dto.RegistroRequest;
import com.equipo2.pos.entity.Usuario;
import com.equipo2.pos.dto.MensajeResponse;
import com.equipo2.pos.service.UsuarioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.equipo2.pos.dto.LoginRequest;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
public ResponseEntity<?> registrar(@RequestBody RegistroRequest request) {
    try {
        Usuario usuario = usuarioService.registrarCliente(request);
        return ResponseEntity.ok(usuario);
    } catch (RuntimeException e) {
        return ResponseEntity
                .badRequest()
                .body(new MensajeResponse(e.getMessage()));
    }
}

@PostMapping("/login")
public Object login(@RequestBody LoginRequest request) {
    try {
        return usuarioService.login(request);
    } catch (RuntimeException e) {
        return new MensajeResponse("Correo o contraseña inválidos");
    }
}
}