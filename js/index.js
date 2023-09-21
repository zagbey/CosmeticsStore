
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
//! home sidebar end

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

//! ////////////////////////////////////////////////////////////

//! add product to local storage 

async function getData() {
    const photos = await fetch("../js/data.json");
    const data = await photos.json();

    data ? localStorage.setItem("products", JSON.stringify(data)) : [];
}
getData();

const products = localStorage.getItem("products");
// console.log(JSON.parse(products));


//! single-product tıklanan ürüne gitme 
function productRoute() {
    const productLink = document.getElementsByClassName("product-link");
    Array.from(productLink).forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            console.log(e.target.dataset.id);
            const id = e.target.dataset.id;
            localStorage.setItem("productId", JSON.stringify(id));
            window.location.href = "single-product.html";
        });
    });
}
//! list product local storage 
let productsZ = []
function productFunc() {
    productsZ = (localStorage.getItem("products"))
        ? JSON.parse(localStorage.getItem("products"))
        : [];
    const productsContainer = document.getElementById("product-list");

    let results = "";
    productsZ.forEach((item) => {
        results += `
        <li class="product-item">
                <div class="product-image">
                    <a href="#">
                        <img src=${item.img.singleImage} alt="" class="img1">
                        <img src=${item.img.thumbs[0]} alt="" class="img2">
                    </a>
                </div>
                <div class="product-info">
                    <a href="$" class="product-title">${item.name}</a>
                    <ul class="product-star">
                        <li>
                            <i class="bi bi-star-fill"></i>
                        </li>
                        <li>
                            <i class="bi bi-star-fill"></i>
                        </li>
                        <li>
                            <i class="bi bi-star-fill"></i>
                        </li>
                        <li>
                            <i class="bi bi-star-fill"></i>
                        </li>
                        <li>
                            <i class="bi bi-star-half"></i>
                        </li>
                    </ul>
                    <div class="product-prices">
                        <strong>$${item.price.newPrice.toFixed(2)}</strong>
                        <span>$${item.price.oldPrice.toFixed(2)}</span>
                    </div>
                    <span class="product-discount">-${item.discount}%</span>
                    <div class="product-links">
                        <button>
                            <i class="bi bi-basket-fill"></i>
                        </button>
                        <button>
                            <i class="bi bi-heart-fill"></i>
                        </button>
                        <a href="#" class="product-link" data-id=${item.id}>
                            <i class="bi bi-eye-fill"></i>
                        </a>
                        <a href="#">
                            <i class="bi bi-share-fill"></i>
                        </a>
                    </div>
                    </div>
                    </li>
                    
                    `;
        productsContainer.innerHTML = results;
    });
}
productFunc();
productRoute();

