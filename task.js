let items = document.getElementById( 'items' );
let img = document.getElementById( 'loader' );
let insert = '';

function addValute( code, value, currency ) {
  value = String( value );
  value = value.replace( /[^0-9,.]/g, '' );
  code = code.replace( /[^A-Z]/g, '' );
  currency = currency.replace( /[^а-я,.]/g, '' );

  insert +=  `
    <div class="item">
      <div class="item__code"> ${code} </div>
      <div class="item__value"> ${value} </div>
      <div class="item__currency"> ${currency} </div>
    </div>
    ` ;
}

function delClass( element, classStr) {
  element.classList.remove( classStr );
}

function time() {
  console.error( 'Мы очень сожалеем, но время ожидания превышенно' );
}

let xhr = new XMLHttpRequest();
xhr.open( 'GET',  'https://netology-slow-rest.herokuapp.com' );
xhr.timeout = 15000;
xhr.send();
xhr.addEventListener( 'load', () => {
  let arrayAll = JSON.parse( xhr.responseText );
  let arrayValuts = arrayAll.response.Valute;

  for ( let item in arrayValuts ) {
    addValute( arrayValuts[item].CharCode, arrayValuts[item].Value, 'руб.' );
  }

  delClass( img, 'loader_active' );
  items.innerHTML = insert;
  insert = '';
});

xhr.ontimeout = () => {
  time();
  delClass( img, 'loader_active' );
}
