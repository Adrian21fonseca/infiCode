async function loadSection(id, file) {
    const container = document.getElementById(id);
    const response = await fetch(`sections/${file}`);
    const html = await response.text();
    container.innerHTML = html;
}

loadSection("header", "header.html");
loadSection("hero", "hero.html");
loadSection("footer", "footer.html");
