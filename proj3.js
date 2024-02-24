//the javasript code im using for the cart page

window.onload = function () {
    //cart container
    const iconshopping = document.querySelector('.iconShopping');
    const cartPage = document.querySelector('#cart');
    const addCartSec = document.querySelector('#cart-add')
    //const cartCloseBtn = document.querySelector('#close-cart');
    //iconshopping.addEventListener("click", function () {
    //  cartBox.classList.add('active');
    //});
    //cartCloseBtn.addEventListener("click", function () {
    // cartBox.classList.remove('active');
    //});

    // adding data to localstorage
    const attToCartBtn = document.getElementsByClassName('attToCart');
    let items = [];
    for (let i = 0; i < attToCartBtn.length; i++) {
        attToCartBtn[i].addEventListener("click", function (e) {
            console.log(e.target.parentElement.parentElement);

            if (typeof (Storage) !== 'undefined') {
                console.log(e.target.parentElement.children[0]);
                let item = {
                    image: e.target.parentElement.parentElement.children[0],
                    id: i + 1,
                    brand: e.target.parentElement.children[0].textContent,
                    name: e.target.parentElement.children[1].textContent,
                    price: e.target.parentElement.children[2].children[0].textContent,
                    no: 1
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.no = data.no + 1;
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    window.location.reload();
                }
            } else {
                alert('local storage is not working on your browser');
            }
        });

    }
    // adding data to shopping cart 
    const iconShoppingP = document.querySelector('.iconShopping p');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        no = no + data.no;
    });
    iconShoppingP.innerHTML = no;
    


    //adding cartbox data in table
    const cardBoxTable = cartPage.querySelector('tbody');
    let tableData = '';
    //tableData += '';
    if (JSON.parse(localStorage.getItem('items'))[0] === null) {
        tableData += '<tr><td colspan="6">No items found</td></tr>'
    } else {
        JSON.parse(localStorage.getItem('items')).map(data => {
            tableData += '<tr class="cart-cell"><td>'+'<a href="#" onclick=Delete(this);>' + '<i class=" far fa-times-circle"></i></a ></td><td>' + data.image + '</td><td class="cart-p-title">' + data.name + '</td><td class="cart-price">$ ' + data.price + '</td><td><input type="number" value=' + '"' + data.no + '"' + 'class="cart-quantity"></td><td>' + data.id + '</td></tr>';
        });
    }
    cardBoxTable.innerHTML = tableData;
    
    // Total cart
    const totalAmnt = document.querySelector('.total-price');
    let total = 0;
    JSON.parse(localStorage.getItem('items')).map(data => {
        //var price = parseFloat(data.price.replace("$", ""));
        //alert(data.price);
        total = total +  data.no * Number(data.price);
        total = Math.round(total * 100) / 100;
    });
    totalAmnt.innerHTML = "$ " + total;
    

}

