const navegador = document.querySelector("#navegador")
const open_menu = document.querySelector("#open-menu")
const close_menu = document.querySelector("#close-menu")

open_menu.addEventListener("click" , () => {
    navegador.classList.add("visible")
})

close_menu.addEventListener("click" , () => {
    navegador.classList.remove("visible")
})