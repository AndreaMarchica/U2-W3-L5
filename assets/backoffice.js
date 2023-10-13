const addressBarContent = new URLSearchParams(location.search);
const itemId = addressBarContent.get("itemId");
console.log(itemId);

if (itemId) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    headers: {
      method: "DELETE",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("ERRORE NEL RECUPERO DETTAGLIO");
      }
    })
    .then((itemDetails) => {
      const nameInput = document.getElementById("item-name");
      const descriptionInput = document.getElementById("description");
      const brandInput = document.getElementById("brand");
      const imageUrl = document.getElementById("image-url");
      const priceInput = document.getElementById("price");

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
  e.preventDefault();
  console.log("invio i dati all'API");

  const nameInput = document.getElementById("item-name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrl = document.getElementById("image-url");
  const priceInput = document.getElementById("price");

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
    method: methodToUse,
    body: JSON.stringify(newItem),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWVhNTEzOWM0MzAwMTg4MTQ1NjIiLCJpYXQiOjE2OTcxODEzNDksImV4cCI6MTY5ODM5MDk0OX0.-Qb6qs9N1Ow6qhNffjv_4NKxntH_IABx95hoVnaei4w",

      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("OGGETTO RESPONSE DELLA NOSTRA CHIAMATA POST", res);
      if (res.ok) {
        Swal.fire("Good job!", "Item correctly added", "success");
      } else {
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
