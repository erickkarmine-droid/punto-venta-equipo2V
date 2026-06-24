package com.equipo2.pos.dto;

public class LoginResponse {

    private String mensaje;
    private String rol;
    private Long usuarioId;
    private String nombre;

    public LoginResponse(String mensaje, String rol, Long usuarioId, String nombre) {
        this.mensaje = mensaje;
        this.rol = rol;
        this.usuarioId = usuarioId;
        this.nombre = nombre;
    }

public String getNombre() {

    return nombre;

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