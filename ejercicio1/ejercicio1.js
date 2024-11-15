// 1º Hacemos la llamada GET para traer los datos de los personajes de GOT
fetch("https://thronesapi.com/api/v2/Characters") 
    .then((res) => res.json())  // Convertimos la respuesta a JSON
    .then((data) => {
        console.log(data); // Muestra la respuesta para verificar la estructura

        // 2º Accedemos al contenedor del select y la imagen
        const characterList = document.getElementById("character-list");
        const characterImage = document.querySelector(".character-image");

        // 3º Almacenamos los personajes en una constante, dependiendo de la estructura
        const characters = data.results || data; // Si la respuesta tiene 'results', usa eso

// Añadimos la opción inicial "Selecciona un personaje"
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "Selecciona un personaje";
characterList.appendChild(defaultOption);


        // 4º Recorremos la lista de personajes y añadimos cada personaje al select
        for (const character of characters) {
            const option = document.createElement("option");
            option.value = character.id;
            option.textContent = character.fullName;
            characterList.appendChild(option);
        }

        // 5º Añadimos un escuchador de eventos para mostrar la imagen correspondiente
        characterList.addEventListener("change", function () {
            const characterId = characterList.value;

            if (characterId) {
                // 6º Hacemos otra llamada para obtener los datos del personaje seleccionado
                fetch(`https://thronesapi.com/api/v2/Characters/${characterId}`)
                    .then((res) => res.json())
                    .then((characterData) => {
                        console.log(characterData); // Muestra los datos del personaje

                        // 7º Si existe la imagen, la mostramos
                        if (characterData.imageUrl) {
                            characterImage.src = characterData.imageUrl;
                            characterImage.style.display = "block"; // Mostramos la imagen
                        } else {
                            characterImage.style.display = "none"; // Ocultamos la imagen si no hay
                        }
                    })
                    .catch((error) => {
                        console.error("Error al intentar obtener los datos del personaje: ", error);
                        characterImage.style.display = "none"; // Ocultamos la imagen si hay error
                    });
            } else {
                characterImage.style.display = "none"; // Ocultamos la imagen si no se selecciona personaje
            }
        });
    })
    .catch((error) => {
        console.error("Error al obtener los personajes: ", error);
    });
