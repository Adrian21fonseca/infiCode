document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
    const logo = document.querySelector(".logo");

    // Espera a que termine la animación de aparición del logo
    logo.addEventListener("animationend", () => {
        // Pequeño delay antes de iniciar la salida
        setTimeout(() => {
            // Animación de salida del logo
            logo.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            logo.style.opacity = "0";
            logo.style.transform = "scale(0.8)";

            // Después de que termina la transición del logo, ocultamos el loader
            setTimeout(() => {
                loader.style.transition = "opacity 1s ease, visibility 1s ease";
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";

                // Mostrar contenido después de la transición del loader
                setTimeout(() => {
                    loader.style.display = "none";
                    content.classList.remove("hidden");
                    document.body.style.overflow = "auto";
                }, 1000); // coincide con la transición del loader
            }, 600); // coincide con la transición de salida del logo
        }, 300); // delay antes de salir el logo
    }, { once: true });
});
