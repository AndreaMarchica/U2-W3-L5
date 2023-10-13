const addressBarContent = new URLSearchParams(location.search);
const itemId = addressBarContent.get("itemId");
console.log(itemId); // può essere una stringa, nel caso il parametro ci sia, oppure può essere null

// SE e solo SE siamo in modalità modifica, ovvero se eventId è una stringa (e non è null), facciamo una fetch
// aggiuntiva per prelevare i dettagli dell'evento, in modo da ripopolare il form!

if (itemId) {
  // se siamo in modalità modifica...
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    headers: {
      method: "DELETE",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
    },
  })
    .then((res) => {
      if (res.ok) {
        // la response è ok! estraiamo i dettagli
        return res.json();
      } else {
        throw new Error("ERRORE NEL RECUPERO DETTAGLIO");
      }
    })
    .then((itemDetails) => {
      // luce verde! abbiamo ottenuto i dettagli
      // dobbiamo ora ripopolare il form!
      const nameInput = document.getElementById("item-name");
      const descriptionInput = document.getElementById("description");
      const brandInput = document.getElementById("brand");
      const imageUrl = document.getElementById("image-url");
      const priceInput = document.getElementById("price");

      // li ripopolo con i dettagli di eventDetails
      nameInput.value = itemDetails.name;
      descriptionInput.value = itemDetails.description;
      brandInput.value = itemDetails.brand;
      imageUrl.value = itemDetails.imageUrl;
      priceInput.value = itemDetails.price;
    })
    .catch((err) => {
      console.log("errore", err);
    });
}

const formReference = document.getElementById("form");
formReference.addEventListener("submit", function (e) {
  e.preventDefault(); // fermiamo il comportamento di default
  console.log("invio i dati all'API");

  // dobbiamo ora recuperare i valori individuali degli input
  const nameInput = document.getElementById("item-name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrl = document.getElementById("image-url");
  const priceInput = document.getElementById("price");

  // ora mi basterà leggere le loro proprietà "value" per ottenere i valori correnti del form

  const newItem = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrl.value,
    price: priceInput.value,
  };

  console.log("Ecco l'oggetto che manderò alle API", newItem);

  let methodToUse = "POST";
  if (itemId) {
    methodToUse = "PUT";
  }

  let urlToUse = "https://striveschool-api.herokuapp.com/api/product";
  if (itemId) {
    urlToUse = "https://striveschool-api.herokuapp.com/api/product/" + itemId;
  }
  fetch(urlToUse, {
    method: methodToUse, // dichiaro che questa chiamata non è una GET, ma una POST (o una PUT!)
    body: JSON.stringify(newItem), // invio il mio evento alle API, ma devo prima trasformarlo in stringa!
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
      // headers è un oggetto in cui inseriamo le nostre "meta-informazioni"
      "Content-Type": "application/json", // informiamo l'API che anche se il nostro body sta arrivando sotto forma
      // di stringa, in origine era un oggetto! e che quindi va ri-parsato a destinazione
    },
  })
    .then((res) => {
      console.log("OGGETTO RESPONSE DELLA NOSTRA CHIAMATA POST", res);
      if (res.ok) {
        // la nostra chiamata POST è andata a buon fine, e l'evento è stato salvato!
        // alert("PRODOTTO SALVATO CORRETTAMENTE!");
        Swal.fire("Good job!", "Item correctly added", "success");
      } else {
        // la nostra chiamata POST NON è andata a buon fine, e c'è stato un errore!
        // esplora il tab "Network" per capire cosa è andato storto
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        throw new Error("Errore nella POST");
      }
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
    });
});
