document.querySelector(".formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById("Nombre").value.trim();
    const correo = document.getElementById("Correo").value.trim();
    const especializacion = document.getElementById("Especializacion").value.trim();
    const mensaje = document.getElementById("Mensaje").value.trim();

    // Número de WhatsApp de InfiCode
    const numeroWhatsApp = "573105643869";

    // Mensaje formateado para WhatsApp
    const texto = 
        `Hola, soy ${nombre}.\n` +
        `Mi especialización o tipo de negocio es: ${especializacion}.\n\n` +
        `Mensaje:\n${mensaje}\n\n` +
        (correo ? `Mi correo de contacto es: ${correo}` : "");

    // URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    // 🔹 Abre WhatsApp directamente
    window.open(urlWhatsApp, "_blank");

    // 🔹 Opcional: También podrías enviar por Gmail
    const asunto = encodeURIComponent(`Nuevo mensaje de ${nombre}`);
    const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${correo}\nEspecialización: ${especializacion}\n\nMensaje:\n${mensaje}`);
    const mailto = `mailto:infocode25@gmail.com?subject=${asunto}&body=${cuerpo}`;
});
