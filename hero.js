tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: {
        color: "#f4f4f4ff",
    },
    particles: {
        number: {
            value: 80,
            density: { enable: true, area: 800 },
        },
        color: { value: ["#3F71AE", "#3F71AE", "#3F71AE"] },
        shape: { type: "circle" },
        opacity: { value: 2, random: true },
        size: { value: { min: 1.2, max: 5 }, random: true },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
        },
        links: {
            enable: true,
            distance: 130,
            color: "#3F71AE",
            opacity: 0.3,
            width: 1,
        },
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
        },
        modes: {
            repulse: { distance: 100 },
            push: { quantity: 4 },
        },
    },
    detectRetina: true,
});
