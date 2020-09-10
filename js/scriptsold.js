//IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = $("#modal-container");
  let unOrderedList = $(".pokemon-list");

  //Function to get all the pokemon names from pokemonList
  function getAll() {
    return pokemonList;
  }

  //Function to add the pokemon names to pokemonList
  function add(pokemon) {
    return pokemonList.push(pokemon);
  }

  //Function to add pokemon names

  function addListItem(pokemon) {
    let listItem = $('<li class = "list-item"></li>');
    let button = $(
      '<button class = "pokemon-name">' + pokemon.name + "</button>"
    );
    $(listItem).append(button);
    $(unOrderedList).append(listItem);

    $(button).on("click", function () {
      showDetails(pokemon);
    });
  }

  //Function to console log the name of pokemon when clicked
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      //show modal with pokemon details

      showModal(pokemon);
    });
  }

  // function to load the pokemon using pokemon api

  function loadList() {
    //using JQuery to make HTTP request

    return $.ajax(apiUrl, { dataType: "json" })
      .then(function (response) {
        return response;
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //function to fetch the details each pokemon
  function loadDetails(item) {
    var url = item.detailsUrl;
    //using JQuery to make HTTP request

    return $.ajax(url, { dataType: "json" })
      .then(function (response) {
        return response;
      })
      .then(function (details) {
        item.image = details.sprites.front_default;
        item.height = details.height;
        //item.type = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Function to show modal with Pokemon details
  function showModal(pokemon) {
    $(modalContainer).html("");
    let modal = $("<div class = 'modal'></div>");
    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    let closeButton = $("<button class = 'close-button'>Close</button>");

    // Eventlistener to hide modal

    $(closeButton).on("click", function () {
      hideModal();
    });

    let pokemonHeight = $("<p>Height:" + pokemon.height + "</p>");
    let pokemonImg = $(
      "<img class = 'pokemon-img' alt ='Pokemon Image' src = " +
        pokemon.image +
        ">"
    );

    $(modal).append(closeButton);
    $(modal).append(pokemonName);
    $(modal).append(pokemonHeight);
    $(modal).append(pokemonImg);
    $(modalContainer).append(modal);
    $(modalContainer).addClass("is_visible");
  }

  //function to hide modal

  function hideModal() {
    $(modalContainer).removeClass("is_visible");
  }

  // hide modal when user presses the escape key

  $(window).keydown(function (e) {
    let key = e.key;
    if (key === "Escape" && $(modalContainer).hasClass("is_visible")) {
      hideModal();
    }
  });
  //hide modal when user clicks outside the modal
  $(modalContainer).click(function (e) {
    var target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
