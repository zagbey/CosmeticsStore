//! home sidebar start
const btnOpenSidebar = document.querySelector("#btn-menu");
const sidebar = document.querySelector("#sidebar");
const btnCloseSidebar = document.querySelector("#close-sidebar");
btnOpenSidebar.addEventListener("click", function () {
    sidebar.style.left = "0";
});

btnCloseSidebar.addEventListener("click", function () {
    sidebar.style.left = "-100%";
});

//! home sidebar end

/* header moblie clik outsite start*/
document.addEventListener("click", function (event) {
    if (
        !event.composedPath().includes(sidebar) &&
        !event.composedPath().includes(btnOpenSidebar)
    ) {
        sidebar.style.left = "-100%";
    }
});
/* header moblie clik outsite end*/

//! slider start
//html collection array benzeri bir nesne
//bunu bir className olarak çağırdıysak array olmuyor

let slideIndex = 1;
showSlides(slideIndex);

setInterval(() => {
    showSlides((slideIndex += 1));
}, 4000);

function plusSlide(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slider-item");
    const dots = document.getElementsByClassName("slider-dot");

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " active";
}
//! slider end