let button = document.getElementById("button");
let image = document.getElementById("image");
let pokemonNumber = document.getElementById("number");
let pokeName = document.getElementById("name");
let abilities = document.getElementById("abilities");
let weight = document.getElementById("weight");
let type = document.getElementById("type");
let idInput = document.querySelector("#idPokemon");
console.log(idInput);

const changePokemon = async () => {
  let randomNumber = Math.ceil(Math.random() * 150 + 1); // entre 1 et 150
  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
  let response = await fetch(requestString);

  let data = await response.json();
  console.log(data);

  image.src = data.sprites.other.dream_world.front_default;
  image.setAttribute("alt", `${data.name}`);
  pokeName.innerText = `${data.name.toUpperCase()}`;
  pokemonNumber.innerText = `N° : ${data.id}`;
  abilities.innerText = `Experience : ${data.base_experience}`;
  weight.innerText = `Weight : ${data.weight} ${
    data.weight <= 1 ? "lb" : "lbs"
  }`;
  type.innerText = `Type : ${data.types[0].type.name}`;
};

// appel pour afficher une premire fois/ sinon rien s'affiche
changePokemon();

button?.addEventListener("click", changePokemon);

const choiceIdPokemon = async () => {
  idInput?.addEventListener("input", async function (event) {
    let numberMax = event.target.value;
    if (numberMax <= 649 && numberMax > 0) {
      let requestString = `https://pokeapi.co/api/v2/pokemon/${event.target.value}`;
      console.log(requestString);
      let response = await fetch(requestString);

      let data = await response.json();
      console.log(data);

      image.src = data.sprites.other.dream_world.front_default;
      image.setAttribute("alt", `${data.name}`);
      pokeName.innerText = `${data.name.toUpperCase()}`;
      pokemonNumber.innerText = `N° : ${data.id}`;
      abilities.innerText = `Experience : ${data.base_experience}`;
      weight.innerText = `Weight : ${data.weight} ${
        data.weight <= 1 ? "lb" : "lbs"
      }`;
      type.innerText = `Type : ${data.types[0].type.name}`;
    } else {
      console.log("Veuillez entrer un nombre entre 1 et 649");
      let errorMessage = document.querySelector(".errorMessage");
      let messageError = document.createElement("p");
      messageError.innerText = "Veuillez entrer un nombre entre 1 et 649";
      messageError.setAttribute("style", "color: red");
      errorMessage?.appendChild(messageError);
      setInterval(() => {
        messageError.innerText = "";
      }, 3000);
    }
  });
};

choiceIdPokemon();
