"use strict";
const params = new URLSearchParams(window.location.search);
const category = params.get("category");
// console.log("hej med dig", category);

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}&limit=50`)
  .then((response) => response.json())
  .then((data) => {
    showProducts(data);
  });

const productContainer = document.querySelector(".sportsgrid");

function showProducts(productsArr) {
  // console.log("productsArr", productsArr);
  document.querySelector("#heading").innerHTML = `<h1>${category}</h1>`;
  productContainer.innerHTML = "";

  productsArr.forEach((product) => {
    console.log("product", product.id);

    productContainer.innerHTML += `
    <a href="produkt.html?id=${product.id}" class="card">
          <div>
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Shorts for running" />
            <h2>${product.productdisplayname}</h2>
            <p class="details">${product.articletype} | ${product.brandname} | ${product.gender}</p>
            <p>${product.price}</p>
            
          </div>
        </a>`;
  });
}
