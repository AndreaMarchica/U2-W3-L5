const addressBarContent = new URLSearchParams(location.search);

const itemId = addressBarContent.get("itemId");
console.log(itemId);

const deleteItem = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
    },
  })
    .then((res) => {
      if (res.ok) {
        Swal.fire("Good job!", "Item correctly deleted", "success");
        location.assign("index.html");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        throw new Error("Errore nella CANCELLAZIONE");
      }
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

const generateItemDetails = function (details) {
  const row = document.getElementById("item-details");
  row.innerHTML = `
          <div class="col col-12 col-lg-6">
              <h5 class="text-center mt-3">DETTAGLI DEL PRODOTTO</h5>
              <img
                src='${details.imageUrl}'
                class="w-100 border border-black"
                alt="product picture"
              />
              <h3 class="text-center mt-4">${details.name}</h3>
              <p>
                ${details.description}
              </p>
              <p>Brand:${details.brand}</p>
              <p>Prezzo: ${details.price}€</p>
              <button class="btn btn-danger mb-5" onclick="deleteItem()">DELETE</button>
              <a class="btn btn-warning mb-5" href="./backoffice.html?itemId=${details._id}">MODIFY</a>
          </div>
      `;
};

const hideSpinner = function () {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("d-none");
};

const getSingleItemDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
    },
  })
    .then((res) => {
      hideSpinner();
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel caricamento dei dettagli");
      }
    })
    .then((itemData) => {
      generateItemDetails(itemData);
    })
    .catch((err) => {
      hideSpinner();
      console.log("ERRORE", err);
    });
};

getSingleItemDetails();
