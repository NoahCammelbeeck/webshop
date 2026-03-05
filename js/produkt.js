"use strict";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const productContainer = document.querySelector("#productContainer");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = `
      <div class="${data.soldout ? " udsolgt" : ""}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="" />
        <p class="${data.soldout ? "" : "display_none"}">SOLD OUT</p>
      </div>

      <div class="allinfo">
        <h1>${data.productdisplayname}</h1>
        <p class="description">
          ${data.brandname}
        </p>
        <div class="moreinfo">
          <h2>Product info</h2>
          <div class="infodetail">
            <h3>Category</h3>
            <p>${data.category}</p>
          </div>
          <div class="infodetail">
            <h3>Season</h3>
            <p>${data.season}</p>
          </div>
          <div class="infodetail">
            <h3>Gender</h3>
            <p>${data.gender}</p>
          </div>
        </div>
      </div>
      <div class="buy">
        <div class="price">
          <p>Price</p>
          <p class="${data.discount ? " strikethrough" : " "}">DKK ${data.price}</p>
          <p class="${data.discount ? " discount" : " display_none"}">${data.discount} % </p>
        </div>
        <p class="${data.discount ? "" : "display_none"}"> Now DKK <span>${Math.ceil(data.price - (data.price / 100) * data.discount)} </span>,-</p>
        <div class="size">
          <p>Pick size:</p>
          <label for="størrrelser"></label>

          <select name="cars" id="cars">
            <option value="1person">XS</option>
            <option value="2person">S</option>
            <option value="3person">M</option>
            <option value="4person">L</option>
          </select>
        </div>
        <button>Put in basket</button>
      </div>`;
  });
//   .then((response) => response.json())
//   .then((data) => {
//     showProducts(data);
//   });
