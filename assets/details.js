const addressBarContent = new URLSearchParams(location.search);
// questo crea un oggetto di tipo URLSearchParams a partire dal contenuto della barra degli indirizzi
// recupero nello specifico eventId
const itemId = addressBarContent.get("itemId"); // <-- recupero solamente il valore di itemId
console.log(itemId);

const deleteItem = function () {
  // questa funzione servirà ad eliminare l'evento corrente
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
    },
  })
    .then((res) => {
      if (res.ok) {
        // EVENTO ELIMINATO CORRETTAMENTE!
        Swal.fire("Good job!", "Item correctly deleted", "success");
        location.assign("index.html"); // facciamo tornare l'utente in homepage
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
  // prendo un riferimento alla row
  const row = document.getElementById("item-details");
  row.innerHTML = `
          <div class="col col-12 col-lg-6">
              <h5 class="text-center mt-3">DETTAGLI DEL PRODOTTO</h5>
              <img
                src='${details.imageUrl}'
                class="w-100"
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

const getSingleItemDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
    },
  })
    .then((res) => {
      if (res.ok) {
        // abbiamo ottenuto i dettagli del singolo evento su cui abbiamo cliccato
        // recuperiamo il suo JSON
        return res.json();
      } else {
        throw new Error("Errore nel caricamento dei dettagli");
      }
    })
    .then((itemData) => {
      // eventData è UN OGGETTO! sono i singoli dettagli dell'evento, il suo name, il suo price, etc.
      generateItemDetails(itemData);
    })
    .catch((err) => console.log("ERRORE", err));
};

getSingleItemDetails();
