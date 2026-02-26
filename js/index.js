const grid3X2 = document.querySelector("#categorylist");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((category) => {
      categoryContainer.innerHTML += `<a class="indexbutton" href="produktliste.html">${category.category}</a>`;
    });
  });
