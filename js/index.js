
import headerFunc from "./header.js"



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

