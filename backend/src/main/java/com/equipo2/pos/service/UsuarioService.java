package com.equipo2.pos.service;

import com.equipo2.pos.dto.LoginRequest;
import com.equipo2.pos.dto.LoginResponse;
import com.equipo2.pos.dto.RegistroRequest;
import com.equipo2.pos.entity.Usuario;
import com.equipo2.pos.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario registrarCliente(RegistroRequest request) {
        validarRegistro(request);

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellidoPaterno(request.getApellidoPaterno());
        usuario.setApellidoMaterno(request.getApellidoMaterno());
        usuario.setEmail(request.getEmail());
        usuario.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        usuario.setTelefono(formatearTelefono(request.getTelefono()));
        usuario.setRol("CLIENTE");
        usuario.setActivo(true);

        return usuarioRepository.save(usuario);
    }

    private void validarRegistro(RegistroRequest request) {
        if (esVacio(request.getNombre()) ||
                esVacio(request.getApellidoPaterno()) ||
                esVacio(request.getApellidoMaterno()) ||
                esVacio(request.getEmail()) ||
                esVacio(request.getPassword()) ||
                esVacio(request.getTelefono())) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (!request.getNombre().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{4,19}$")) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (!request.getApellidoPaterno().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{4,29}$") ||
                !request.getApellidoMaterno().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{4,29}$")) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (request.getPassword().length() < 8 || request.getPassword().length() > 15) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }

        if (!request.getTelefono().matches("^\\d{10}$")) {
            throw new RuntimeException("Debe ingresar todos los campos correctamente");
        }
    }

    private boolean esVacio(String valor) {
        return valor == null || valor.trim().isEmpty();
    }

    private String formatearTelefono(String telefono) {
        return "+52" + telefono;
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Correo o contraseña inválidos"));

        if (!usuario.getActivo()) {
            throw new RuntimeException("Correo o contraseña inválidos");
        }

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())) {
            throw new RuntimeException("Correo o contraseña inválidos");
        }

        return new LoginResponse(
                "Inicio de sesión exitoso",
                usuario.getRol(),
                usuario.getId()
        );
    }
}