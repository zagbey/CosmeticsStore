function productsFunc(){
    const products = JSON.parse(localStorage.getItem("products"));
    //her bir ürün 
    products.array.forEach(item => {
        console.log(item.name);
    });
}
export default productsFunc();