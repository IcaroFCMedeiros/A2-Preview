const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function handleButtonClick(event) {
    if (event.type === "touchstart" && event.cancelable) event.preventDefault();
    event.stopPropagation();
    nav.classList.toggle("active");
    handleClickOutside(menu, () => {
        nav.classList.remove("active");
    });
    setAria(); // Chamar a função para atualizar os atributos "aria-label" e "aria-expanded"
}

function handleClickOutside(targetElement, callback) {
    const html = document.documentElement;
    function handleHTMLClick(event) {
        if (!targetElement.contains(event.target)) {
            targetElement.removeAttribute("data-target");
            html.removeEventListener("click", handleHTMLClick);
            html.removeEventListener("touchstart", handleHTMLClick);
            callback();
        }
    }
    if (!targetElement.hasAttribute("data-target")) {
        html.addEventListener("click", handleHTMLClick);
        html.addEventListener("touchstart", handleHTMLClick);
        targetElement.setAttribute("data-target", "");
    }
}

function setAria() {
    const isActive = nav.classList.contains("active");
    btnMenu.setAttribute("aria-expanded", isActive);
    if (isActive) {
        btnMenu.setAttribute("aria-label", "Fechar Menu");
    } else {
        btnMenu.setAttribute("aria-label", "Abrir Menu");
    }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);

let time = 3000,
    currentImageIndex = 0,
    images = document.querySelectorAll("#slider img"),
    max = images.length;

function nextImage() {
    images[currentImageIndex].classList.remove("selected");

    currentImageIndex++;

    if (currentImageIndex >= max)
        currentImageIndex = 0;

    images[currentImageIndex].classList.add("selected");
}

function start() {
    setInterval(nextImage, time);
}

window.addEventListener("load", start);

// Adicionando suporte a teclado
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        nextImage();
    } else if (event.key === "ArrowLeft") {
        images[currentImageIndex].classList.remove("selected");
        
        currentImageIndex--;
        
        if (currentImageIndex < 0)
            currentImageIndex = max - 1;
        
        images[currentImageIndex].classList.add("selected");
    }
});