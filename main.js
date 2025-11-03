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



// Animación de aparición de las tarjetas
const estadisticasTrabajo = document.querySelectorAll('.como-trabajamos .estadistica');

const observerTrabajo = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.animation = "fadeUp 0.8s forwards";
            obs.unobserve(entry.target);
        }
    });
},{threshold: 0.5});

estadisticasTrabajo.forEach(stat => observerTrabajo.observe(stat));

// Contadores animados
const counters = document.querySelectorAll('.contador');

const startCounting = (entry) => {
    const counter = entry.target;
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 segundos
    const startTime = performance.now();

    const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        counter.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
};

const observerCounters = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            startCounting(entry);
            obs.unobserve(entry.target);
        }
    });
},{threshold: 0.5});

counters.forEach(counter => observerCounters.observe(counter));


const servicios = document.querySelectorAll('.servicio');

const observerServicios = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.animation = "fadeUp 0.8s forwards";
            obs.unobserve(entry.target);
        }
    });
},{threshold: 0.3});

servicios.forEach(servicio => observerServicios.observe(servicio));

