//to make sure the document is loaded before accessing the element

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}

else{
    ready()
}


function ready(){

    //update for remove button
    var removeCartItemButtons= document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for(var i=0;i<removeCartItemButtons.length; i++){
        var button=removeCartItemButtons[i]
        button.addEventListener('click', remove)
    }
    
    //update for quantity input
    var updateCartQuantity = document.getElementsByClassName('cart-quantity-input')
    console.log(updateCartQuantity)

    for(var i=0 ; i<updateCartQuantity.length; i++){
        var input=updateCartQuantity[i]
        input.addEventListener('input',quantityChange)
    }

    //update if button add to cart pressed

    var ItemAddToCart = document.getElementsByClassName('shop-item-button')
    console.log(ItemAddToCart)
    for(var i=0 ; i<ItemAddToCart.length; i++){
   
        var input= ItemAddToCart[i]
        input.addEventListener('click', UpdateCartItem)
    }

    //Update after the purchased button clicked


    var purchaseButton = document.getElementsByClassName('btn-purchase')[0]
    purchaseButton.addEventListener('click', purchaseClicked)



 
}

function purchaseClicked(){
    alert('Thank you for your purchase')
    var ItemsPurchased=document.getElementsByClassName('cart-items')[0]
    while(ItemsPurchased.hasChildNodes()){
        //remove the child class one by one, the first child~continuosly run
        ItemsPurchased.removeChild(ItemsPurchased.firstChild)
    }

    updateCartTotal()
    

}



function UpdateCartItem(event){
    var input= event.target
    var shopItem= input.parentElement.parentElement
    var itemTitle= shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var imgSrc=shopItem.getElementsByClassName('shop-item-image')[0].src
    var itemPrice= shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(itemTitle,imgSrc,itemPrice)
    updateCartTotal()
    
}

function addItemToCart(itemTitle,imgSrc,itemPrice){
    var cartRow= document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems= document.getElementsByClassName('cart-items')[0]
    var itemNames= cartItems.getElementsByClassName('cart-item-title')

    for(i=0; i< itemNames.length; i++){
        if(itemNames[i].innerText==itemTitle){
            alert('this item already added to the cart')

            //out of function
            return
        }
    }
    var cartRowContent =`
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${itemTitle}</span>
        </div>
        <span class="cart-price cart-column">${itemPrice}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)

    //add event listener to the new button and quantity input
    //because the ready function already loaded (sooo, the new class just uploaded should have listener too)
    //to make sure to add the event listener after creating the new rows
    //because the ready() function already loaded. their event listener doesnt valid 
    //for the new element
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',remove)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)
   
    
    
  

}
//var contain button with class btn-danger



//remove respective cart when the respective button pressed


//function where total price is updated, price and quantity are calculated
//function run when remove button is clicked
function updateCartTotal(){
var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('cart-row')
total =0;

for(var i=0 ; i< cartRows.length ; i++){
    var cartRow = cartRows[i]
    var priceElement= cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price= parseFloat(priceElement.innerText.replace('$',''))
    var quantity= quantityElement.value
 
    total= total + (price*quantity)
}
total=Math.round(total*100)/100

document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total

}

function quantityChange(event){
    var input= event.target
    if(isNaN(input.value) || input.value<=0){
        input.value= 1;

    }
    updateCartTotal()
}

function remove(event){
    var buttonCLicked= event.target
    buttonCLicked.parentElement.parentElement.remove()
    updateCartTotal()

}


