let carts = document.querySelectorAll('.add-cart');

let products = [{
    name: "Black Hoodie",
    tag: "blackhoodie",
    price: 25,
    inCart: 0
}, {
    name: "'Black T-shirt'",
    tag: "blackshirt'",
    price: 15,
    inCart: 0
}, {
    name: "Gray T-shirt",
    tag: "grayshirt'",
    price: 20,
    inCart: 0
}, {
    name: "Gray Hoodie",
    tag: "grayhoodie",
    price: 15,
    inCart: 0
}];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        console.log("add to carts");
        cartNumber(products[i]);
        totalcost(products[i]);

    });
}

function onLoadcartNumber() {

    let productNumber = localStorage.getItem('cartNumbers');
    if (productNumber) {
        document.querySelector('.cart span').textContent = productNumber;
    }
}

function cartNumber(product) {
    console.log("The product click is", product);
    let productNumber = localStorage.getItem('cartNumbers');
    //  console.log(productNumber);

    productNumber = parseInt(productNumber);
    // console.log(typeof productNumber);
    if (productNumber) {
        localStorage.setItem('cartNumbers', productNumber + 1);
        document.querySelector('.cart span').textContent = productNumber + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    //localStorage.setItem('cartNumber', 1);
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productincart", JSON.stringify(cartItems));

}

function totalcost(product) {

    let cartCost = localStorage.getItem('totalcost');

    console.log("cartcost is ", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalcost", cartCost + product.price);
    } else {
        localStorage.setItem("totalcost", product.price);
    }

    //  localStorage.setItem("total cost", product.price);
}

function displayCart() {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `<div class="product"> <ion-icon name="close-circle"></ion-icon>
            <img src = "./images/${item.tag}.png"> <span> ${item.name} </span>

             </div>
             <div class = "price"> ${item.price}</div>
             `
        });
    }

}
onLoadcartNumber();
displayCart();