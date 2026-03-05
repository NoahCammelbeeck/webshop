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

    // if (product.soldout) {
    //   console.log("product status: udsolgt");
    // } else {
    //   console.log("product status: på lager");
    // }

    // product.soldout ? console.log("product status: udsolgt") : console.log("product status: på lager");

    productContainer.innerHTML += `
    <a href="produkt.html?id=${product.id}" class="card">
          <div>
            <div class="${product.soldout ? " udsolgt" : ""}">
              <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Shorts for running" />
              <p class="${product.soldout ? "" : "display_none"}">SOLD OUT</p>
            </div>
            <h2>${product.productdisplayname}</h2>
            <p class="details">${product.articletype} | ${product.brandname} | ${product.gender}</p>
            <section class="pricesection">
            <p class="${product.discount ? " strikethrough" : " "}">DKK ${product.price} ,-</p>
            <p class="${product.discount ? " discount" : " display_none"}">${product.discount} %</p>
            <p class="${product.discount ? "" : "display_none"}"> Now DKK <span>${Math.ceil(product.price - (product.price / 100) * product.discount)} </span>,-</p>
            </section>
            </div>
        </a>`;
  });
}
