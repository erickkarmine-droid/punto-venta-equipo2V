package com.equipo2.pos.config;

import com.equipo2.pos.entity.Usuario;
import com.equipo2.pos.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AdminInitializer(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) {
        String adminEmail = "admin@equipo2.com";

        if (!usuarioRepository.existsByEmail(adminEmail)) {
            Usuario admin = new Usuario();
            admin.setNombre("Administrador");
            admin.setApellidoPaterno("Inicial");
            admin.setApellidoMaterno("Sistema");
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode("Admin12345"));
            admin.setTelefono("+525512345678");
            admin.setRol("Administrador");
            admin.setActivo(true);

            usuarioRepository.save(admin);

            System.out.println("Administrador inicial creado: " + adminEmail);
        }
    }
}