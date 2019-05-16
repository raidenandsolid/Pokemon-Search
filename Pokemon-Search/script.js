'use strict'
//initialize constants
const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon/'
const typeAPI = 'https://pokeapi.co/api/v2/type/'
const speciesAPI = 'https://pokeapi.co/api/v2/pokemon-species/'

function buildResults(monster) {
  let pokeName = '';
  let pokeType = '';
  let pokeID = '';
  let pokeWeight = '';
  //set returned data
  pokeName = monster.name;
  pokeID = monster.id;
  pokeWeight = monster.weight;
  $('.results').append(`<h1>Pokemon found</h1>`);
  /*
    <div class="js-single-result">
    <p class="js-name">${pokeName}</p>
    <p>Type: ${pokeType}</p>
    <p>Weight: ${pokeWeight} hectograms</p>
    </div>
  */
}

function searchPokedex(searchName) {
  const urlName = searchName.toLowerCase();
  let searchURL = pokemonAPI + urlName;
  fetch(searchURL)
    /*
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Error returning data. Status Code: ' + response.status);
          return;
        }
        response.json().then(function(data) {
          buildResults(data);
          console.log(data);
        });
        */
    .then(response => response.json())
    .then(responseJson =>
      buildResults(responseJson),
      console.log(responseJson)
      )
    .catch(err =>
      alert('Error occured during fetch'),
      console.log('Fetch Error :-S', err)
    )
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
