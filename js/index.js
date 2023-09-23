
function sidebarFunc() {
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

}
sidebarFunc();




//! ////////////////////////////////////////////////////////////

//! add product to local storage (localStorage ürün kaydetme)

async function getData() {
    const photos = await fetch("../js/data.json");
    const data = await photos.json();

    data ? localStorage.setItem("products", JSON.stringify(data)) : [];
    productFunc();
}
getData();

const products = localStorage.getItem("products");
console.log(JSON.parse(products));


//! single-product tıklanan ürününe gitme 
function productRoute() {
    const productLink = document.getElementsByClassName("product-link");
    console.log(productLink)
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



//! list product local storage (Datadan ürün listeleme)

async function productFunc() {
    const products = localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [];
    const productsContainer = document.getElementById("product-list");

    let results = "";
    products.forEach((item) => {
        results += `
    <li class="product-item glide__slide">
      <div class="product-image">
        <a href="#">
          <img src=${item.img.singleImage} alt="" class="img1">
          <img src=${item.img.thumbs[1]} alt="" class="img2">
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
          <strong class="new-price">$${item.price.newPrice.toFixed(2)}</strong>
          <span class="old-price">$${item.price.oldPrice.toFixed(2)}</span>
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
    productRoute();
}
productFunc();


function singleProduct() {

    const productId = localStorage.getItem("productId")
        ? JSON.parse(localStorage.getItem("productId"))
        : localStorage.setItem("productId", JSON.stringify(1));

    const products = localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : localStorage.setItem("products", JSON.stringify([]));

    const findProduct = products.find((item) => item.id === Number(productId));

    console.log(findProduct);

    /* product title */
    const productTitle = document.querySelector(".product-title");
    console.log(productTitle)
    productTitle.innerHTML = findProduct.name;

    /* product price */
    const productNewPrice = document.querySelector(".new-price")
    const productOldPrice = document.querySelector(".old-price")

    productOldPrice.innerHTML = findProduct.price.oldPrice.toFixed(2);
    productNewPrice.innerHTML = findProduct.price.newPrice.toFixed(2);

    /* product image */
    const singleImage = document.querySelector("#single-image");
    singleImage.src = findProduct.img.singleImage

}

singleProduct();


