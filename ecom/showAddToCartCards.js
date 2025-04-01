import products from "./api/products.json"
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js"
import { getCartProductFromLS } from './getCartProducts.js'
import { incrementDecrement } from "./IncrementDecrement.js"
import { removeProdFromCart } from "./removeProdFromCart.js"
import { updateCartProductTotal } from "./updateCartProductTotal.js"
//import { updateCartValue } from "./updateCartValue"




let cartProducts = getCartProductFromLS()

let filterProducts = products.filter((curProd)=>{
   return cartProducts.some( (curElem)=> curElem.id === curProd.id)
})

console.log(filterProducts)


const cartElement = document.querySelector("#productCartContainer")
const templateContainer = document.querySelector("#productCartTemplate")

const showCartProduct=() =>{
    filterProducts.forEach((curProd)=>{
        const { category, id, image, name, stock, price } = curProd;
        let productClone = document.importNode(templateContainer.content, true);

        const lsActualData = fetchQuantityFromCartLS(id,price)

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;

        productClone.querySelector(".productQuantity").textContent = lsActualData.quantity
        productClone.querySelector(".productPrice").textContent = lsActualData.price

        productClone.querySelector(".stockElement").addEventListener
        ("click",(event)=>{
            incrementDecrement(event,id,stock,price)
        })

        productClone
        .querySelector(".remove-to-cart-button")
        .addEventListener('click',()=> removeProdFromCart(id))

        cartElement.appendChild(productClone)
    })
}

showCartProduct()

updateCartProductTotal()