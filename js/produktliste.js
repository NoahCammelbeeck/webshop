"use strict";
const params = new URLSearchParams(window.location.search);
let category = params.get("category") ?? "Apparel";

let leData;

document.querySelector(".asc").addEventListener("click", klikSorterAsc);
document.querySelector(".des").addEventListener("click", klikSorterDes);
function klikSorterAsc(evt) {
  console.log("KLIK SORTER", evt.target.dataset.direction);
  leData.sort(function (a, b) {
    return a.realPrice - b.realPrice;
  });
  showProducts(leData);
}
function klikSorterDes(evt) {
  console.log("KLIK SORTER", evt.target.dataset.direction);
  leData.sort(function (a, b) {
    return b.realPrice - a.realPrice;
  });
  showProducts(leData);
}

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}&limit=50`)
  .then((response) => response.json())
  .then((data) => {
    //if (product.discount) data.realPrice = Math.ceil(product.price - (product.price / 100) * product.discount);
    data.forEach((product) => {
      if (product.discount) {
        product.realPrice = Math.ceil(product.price - (product.price / 100) * product.discount);
      } else {
        product.realPrice = product.price;
      }
    });
    leData = data;

    showProducts(leData);
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
            <div class="saving">
              <p class="${product.discount ? " strikethrough" : " "}">DKK ${product.price} ,-</p>
              <p class="${product.discount ? " discount" : " display_none"}">${product.discount} %</p>
           </div>
            <p class="${product.discount ? "" : "display_none"}"> Now DKK <span>${Math.ceil(product.price - (product.price / 100) * product.discount)} </span>,-</p>
            </section>
            </div>
        </a>`;
  });
}
