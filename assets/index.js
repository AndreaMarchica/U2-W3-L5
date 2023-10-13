const renderItems = function (arrayOfItems) {
  // riferimento alla riga
  const row = document.getElementById("items-row");

  arrayOfItems.forEach((item) => {
    // ora qua creerò una col nel DOM per ogni evento!
    const newCol = document.createElement("div");
    newCol.classList.add(
      "col",
      "col-12",
      "col-sm-6",
      "col-md-3",
      "col-lg-2",
      "myCard"
    );
    // <div class="col col-12 col-sm-6 col-md-3"></div>
    newCol.innerHTML = `
      <div class="card mb-3 ">
          <img src="${item.imageUrl}" class="card-img-top" alt="generic concert picture">
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
  // nascondo lo spinner, perchè la Promise non è più in pending
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
        // la chiamata è terminata correttamente con un 200
        return res.json();
      } else {
        throw new Error("Errore nel contattare il server");
      }
    })
    .then((items) => {
      console.log("ITEMS", items);
      // qua ora dovremmo creare delle cards per ogni evento ricevuto!
      // delego questo codice ad una funzione separata che chiamo renderEvents
      renderItems(items);
    })
    .catch((err) => {
      hideSpinner();
      console.log("Si è verificato un errore:", err);
    });
};

getItems();
