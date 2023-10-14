const renderItems = function (arrayOfItems) {
  const row = document.getElementById("items-row");

  arrayOfItems.forEach((item) => {
    const newCol = document.createElement("div");
    newCol.classList.add(
      "col",
      "col-12",
      "col-sm-6",
      "col-md-3",
      "col-lg-2",
      "myCard"
    );

    newCol.innerHTML = `
      <div class="card mb-3 ">
          <img src="${item.imageUrl}" class="card-img-top border border-bottom-black" alt="generic concert picture">
          <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <p class="card-text">${item.brand}</p>
              <p class="card-text">${item.price}€</p>
              <a href="details.html?itemId=${item._id}" class="btn btn-primary">DETAILS</a>
          </div>
      </div>
      `;
    row.appendChild(newCol);
  });
};

const hideSpinner = function () {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("d-none");
};

const getItems = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
    },
  })
    .then((res) => {
      hideSpinner();

      console.log("Response ottenuta dalla GET", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel contattare il server");
      }
    })
    .then((items) => {
      console.log("ITEMS", items);

      renderItems(items);
    })
    .catch((err) => {
      hideSpinner();
      console.log("Si è verificato un errore:", err);
    });
};

getItems();
