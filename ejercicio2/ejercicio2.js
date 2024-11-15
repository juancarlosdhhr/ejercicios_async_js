// Creamos una función para obtener números aleatorios entre 1 y 151

function RandomPokemonId () {
return Math.floor(Math.random() * 151) + 1;

}

// id del pokemon aleatorio

const pokemonId = RandomPokemonId();

// URL de la API con el id aleatorio

const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

//Llamamos a la imagen por la clase

const randomImage = document.querySelector(".random-image");

// Hacemos la petición a la API

fetch(url)
.then((res) => res.json())
.then((data) => {

console.log("Datos del Pokémon",data); 


const imageUrl = data.sprites.other["official-artwork"].front_default;
console.log("URL de la imagen del Pokémon:", imageUrl);

if (imageUrl) {

randomImage.src = imageUrl;
randomImage.alt= data.name;

} else {
randomImage.alt = "Imagen no disponible";
randomImage.style.display = "none";

}


})

.catch((error) => {

console.error("Error al intentar recuperar el Pokémon: ", error);
randomImage.alt = "Error al cargar la imagen";

});




