function productsFunc(){
    const products = JSON.parse(localStorage.getItem("products"));

    products.array.forEach(item => {
        console.log(item.name);
    });
}
export default productsFunc();