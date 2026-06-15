package com.equipo2.pos.dto;

public class LoginResponse {

    private String mensaje;
    private String rol;
    private Long usuarioId;

    public LoginResponse(String mensaje, String rol, Long usuarioId) {
        this.mensaje = mensaje;
        this.rol = rol;
        this.usuarioId = usuarioId;
    }

    public String getMensaje() {
        return mensaje;
    }

    public String getRol() {
        return rol;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }
}