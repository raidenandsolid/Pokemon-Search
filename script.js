'use strict'
//initialize constants
const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon/'
const typeAPI = 'https://pokeapi.co/api/v2/type/'
const speciesAPI = 'https://pokeapi.co/api/v2/pokemon-species/'

function buildResults(monster) {
  //initialize and print to console the object
  console.log(monster)
  let pokeName = '';
  let pokeType = '';
  let pokeID = '';
  let pokeWeight = '';
  //set returned data
  pokeName = monster.name;
  pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
  pokeID = monster.id;
  pokeWeight = monster.weight;
  for (let i = 0; i < monster.types.length; i++) {
    if ((i + 1) < monster.types.length) {
        pokeType += monster.types[i].type.name + ", ";
    } else {
        pokeType += monster.types[i].type.name;
    }
  }
  $('.results').append(`<h1>Pokemon found</h1>
    <div class="js-single-result">
      <p>Name: ${pokeName}</p>
      <p>ID: ${pokeID}</p>
      <p>Type: ${pokeType}</p>
      <p>Weight: ${pokeWeight} hectograms</p>
    </div>`
  );
}

function searchPokedex(searchName) {
  const urlName = searchName.toLowerCase();
  let searchURL = pokemonAPI + urlName;
  fetch(searchURL)
    .then(response => response.json())
    .then(responseJson =>
      buildResults(responseJson))
    .catch(err => {
      $('.results').append(`<h1>Pokemon not found</h1>`)
      console.log('Fetch Error :-S', err)
    })
  }

function handleForm() {
  $('.search-area').submit(event => {
    event.preventDefault();
    let searchName = $('#pokemon-in').val();
    $('.results').empty();
    searchPokedex(searchName);
  });
}
$(handleForm());
