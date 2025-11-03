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




const toggleThemeBtn = document.getElementById("toggle-theme");
const body = document.body;

// Ver si ya hay un tema guardado en localStorage
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    toggleThemeBtn.textContent = "☀️"; // icono de sol
}

toggleThemeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
        toggleThemeBtn.textContent = "☀️"; // modo oscuro activo → mostrar sol
        localStorage.setItem("theme", "dark");
    } else {
        toggleThemeBtn.textContent = "🌙"; // modo claro activo → mostrar luna
        localStorage.setItem("theme", "light");
    }
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






// ====== Carrusel 3D Infinito ======
const carrusel = document.querySelector('.carrusel-proyectos');
const track = document.querySelector('.carrusel-track');
const proyectos = Array.from(document.querySelectorAll('.proyecto'));
let current = 0;

// Actualiza las clases según la posición
function updateCarrusel() {
    proyectos.forEach((proyecto, index) => {
        proyecto.classList.remove('focus','prev','next','other');

        if(index === current) proyecto.classList.add('focus');
        else if(index === (current - 1 + proyectos.length) % proyectos.length) proyecto.classList.add('prev');
        else if(index === (current + 1) % proyectos.length) proyecto.classList.add('next');
        else proyecto.classList.add('other');
    });

    // Centrar la card focus en el carrusel
    const card = proyectos[current];
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const containerCenter = carrusel.offsetWidth / 2;
    const scrollPosition = cardCenter - containerCenter;
    carrusel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// ====== Drag con mouse ======
let startX = 0;
let isDragging = false;

carrusel.addEventListener('mousedown', e => {
    startX = e.pageX;
    isDragging = true;
});

document.addEventListener('mousemove', e => {
    if(!isDragging) return;
    const diff = e.pageX - startX;
    // Opcional: puedes mover track mientras arrastras
});

document.addEventListener('mouseup', e => {
    if(!isDragging) return;
    const diff = e.pageX - startX;
    if(diff > 50) current = (current - 1 + proyectos.length) % proyectos.length;
    else if(diff < -50) current = (current + 1) % proyectos.length;
    updateCarrusel();
    isDragging = false;
});

document.addEventListener('mouseleave', () => {
    isDragging = false;
});

// ====== Touch para móviles ======
carrusel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

carrusel.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if(diff > 50) current = (current - 1 + proyectos.length) % proyectos.length;
    else if(diff < -50) current = (current + 1) % proyectos.length;
    updateCarrusel();
});

// ====== Inicialización ======
updateCarrusel();


