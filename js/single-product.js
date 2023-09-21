function productList() {
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

    /* product image */
    const singleImage = document.querySelector("#single-image");
    singleImage.src = findProduct.img.singleImage

}
productList();