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

document.addEventListener('DOMContentLoaded', () => {
  // Soportamos ambos nombres que has usado en distintos momentos
    const toggle = document.getElementById('menu-toggle') || document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');

    // Si no existen, salimos sin romper la página
    if (!toggle || !navbar) return;

    // Seleccionamos los enlaces dentro del navbar
    const links = navbar.querySelectorAll('a');

    // Abrir / cerrar con el icono
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en cualquier enlace del navbar
    links.forEach(link => {
        link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navbar.classList.remove('active');
        });
    });

    const preloader = document.getElementById("preloader");
    const preloaderLogo = preloader?.querySelector(".preloader__logo");

    if (preloader && preloaderLogo) {
        const logoAnimationFinished = new Promise((resolve) => {
            preloaderLogo.addEventListener("animationend", resolve, { once: true });
        });

        const pageLoaded = document.readyState === "complete"
            ? Promise.resolve()
            : new Promise((resolve) => {
                window.addEventListener("load", resolve, { once: true });
            });

        Promise.all([logoAnimationFinished, pageLoaded]).then(() => {
            preloader.classList.add("is-hidden");
            preloader.addEventListener("transitionend", (event) => {
                if (event.target === preloader && event.propertyName === "opacity") {
                    preloader.remove();
                }
            }, { once: true });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        return;
    }

    const animatedElements = document.querySelectorAll([
        "main > section",
        "main .reveal",
        "main .texto-informativo",
        "main .card-informativo",
        "main .card-informativo-servicio",
        "main .dinamica-informativa",
        "main .formulario",
        "footer .site-footer__main > *",
        "footer .site-footer__bottom"
    ].join(", "));

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    animatedElements.forEach((element) => {
        element.classList.add("scroll-reveal");
        observer.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-project-carousel]");

    if (!carousel) {
        return;
    }

    const slides = Array.from(carousel.querySelectorAll("[data-project-slide]"));
    const previousButton = carousel.querySelector("[data-project-previous]");
    const nextButton = carousel.querySelector("[data-project-next]");
    const toggleButton = carousel.querySelector("[data-project-toggle]");
    const counter = carousel.querySelector("[data-project-counter]");
    const pagination = Array.from(carousel.querySelectorAll("[data-project-index]"));

    if (slides.length < 2 || !previousButton || !nextButton || !toggleButton || !counter) {
        return;
    }

    let currentIndex = 0;
    let autoplayTimer;
    let userPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isHovered = false;
    let isFocused = false;
    let isPageVisible = !document.hidden;
    let isCarouselVisible = !("IntersectionObserver" in window);

    const updateAutoplay = () => {
        window.clearInterval(autoplayTimer);
        autoplayTimer = undefined;

        const shouldPlay = !userPaused && !isHovered && !isFocused && isPageVisible && isCarouselVisible;
        toggleButton.setAttribute("aria-pressed", String(userPaused));
        toggleButton.setAttribute(
            "aria-label",
            userPaused ? "Reanudar reproducción automática" : "Pausar reproducción automática"
        );
        toggleButton.title = userPaused
            ? "Reanudar reproducción automática"
            : "Pausar reproducción automática";
        toggleButton.querySelector("span").textContent = userPaused ? "▶" : "Ⅱ";

        if (shouldPlay) {
            autoplayTimer = window.setInterval(() => {
                showProject(currentIndex + 1);
            }, 2000);
        }
    };

    const showProject = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        const previousIndex = (currentIndex - 1 + slides.length) % slides.length;
        const nextIndex = (currentIndex + 1) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.remove("is-current", "is-previous", "is-next", "is-hidden");

            if (slideIndex === currentIndex) {
                slide.classList.add("is-current");
                slide.setAttribute("aria-hidden", "false");
            } else if (slideIndex === previousIndex) {
                slide.classList.add("is-previous");
                slide.setAttribute("aria-hidden", "true");
            } else if (slideIndex === nextIndex) {
                slide.classList.add("is-next");
                slide.setAttribute("aria-hidden", "true");
            } else {
                slide.classList.add("is-hidden");
                slide.setAttribute("aria-hidden", "true");
            }

            const link = slide.querySelector(".project-slide__link");
            if (link) {
                link.tabIndex = slideIndex === currentIndex ? 0 : -1;
            }
        });

        pagination.forEach((button, buttonIndex) => {
            button.classList.toggle("is-current", buttonIndex === currentIndex);
            if (buttonIndex === currentIndex) {
                button.setAttribute("aria-current", "true");
            } else {
                button.removeAttribute("aria-current");
            }
        });

        counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };

    previousButton.addEventListener("click", () => showProject(currentIndex - 1));
    nextButton.addEventListener("click", () => showProject(currentIndex + 1));

    toggleButton.addEventListener("click", () => {
        userPaused = !userPaused;

        if (!userPaused) {
            isHovered = false;
            isFocused = false;
        }

        updateAutoplay();
    });

    carousel.addEventListener("mouseenter", () => {
        isHovered = true;
        updateAutoplay();
    });

    carousel.addEventListener("mouseleave", () => {
        isHovered = false;
        updateAutoplay();
    });

    carousel.addEventListener("focusin", () => {
        isFocused = true;
        updateAutoplay();
    });

    carousel.addEventListener("focusout", () => {
        window.setTimeout(() => {
            isFocused = carousel.contains(document.activeElement);
            updateAutoplay();
        }, 0);
    });

    document.addEventListener("visibilitychange", () => {
        isPageVisible = !document.hidden;
        updateAutoplay();
    });

    if ("IntersectionObserver" in window) {
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            isCarouselVisible = entry.isIntersecting;
            updateAutoplay();
        }, { threshold: 0.25 });

        visibilityObserver.observe(carousel);
    }

    pagination.forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.projectIndex);
            if (Number.isInteger(index)) {
                showProject(index);
            }
        });
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showProject(currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            showProject(currentIndex + 1);
        }
    });

    let pointerStart = null;

    carousel.addEventListener("pointerdown", (event) => {
        if (event.target instanceof Element && event.target.closest("a, button")) {
            return;
        }

        pointerStart = { x: event.clientX, y: event.clientY };
    });

    carousel.addEventListener("pointerup", (event) => {
        if (!pointerStart) {
            return;
        }

        const deltaX = event.clientX - pointerStart.x;
        const deltaY = event.clientY - pointerStart.y;
        pointerStart = null;

        if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY)) {
            return;
        }

        showProject(currentIndex + (deltaX < 0 ? 1 : -1));
    });

    carousel.addEventListener("pointercancel", () => {
        pointerStart = null;
    });

    updateAutoplay();
});