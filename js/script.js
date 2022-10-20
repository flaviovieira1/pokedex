const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonSprite = document.querySelector(".pokemon-image");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonSprite.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = '#'+data.id+ ' -';
    pokemonSprite.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    searchPokemon = data.id
  } else {        
    pokemonName.innerHTML = 'Não encontrado'
    pokemonNumber.innerHTML = ''
    pokemonSprite.style.display = 'none'
  }
  input.value = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonNext.addEventListener("click", () => {
    searchPokemon+=1
    renderPokemon(searchPokemon);
  });

  buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1){
    searchPokemon-=1
    renderPokemon(searchPokemon);
    }
  });




renderPokemon(searchPokemon)