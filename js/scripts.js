//IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let container = $(".container");
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
    $(container).append(unOrderedList);
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
        item.types = [];
        //Get the type names from the array
        details.types.forEach(function (typeItem) {
          item.types.push(typeItem.type.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Function to show modal with Pokemon details
  function showModal(pokemon) {
    let modalContainer = $("#modal-container");
    modalContainer.empty();
    let modal = $("<div class = 'modal'></div>");
    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    let pokemonTypes = $("<p>" + pokemon.types + "</p>");

    //function to get the color for the background
    let backGroundColor = modalBackgroundColor(pokemon);
    $(modal).css("background-color", backGroundColor);

    let closeButton = $("<button class = 'close-button'>Close</button>");

    // Eventlistener to hide modal

    $(closeButton).on("click", hideModal);

    let pokemonHeight = $("<p>Height:" + pokemon.height + "</p>");
    let pokemonImg = $(
      "<img class = 'pokemon-img' alt ='Pokemon Image' src = " +
        pokemon.image +
        ">"
    );

    modal.append(closeButton);
    modal.append(pokemonName);
    modal.append(pokemonHeight);
    modal.append(pokemonTypes);
    modal.append(pokemonImg);

    modalContainer.append(modal);
    modalContainer.addClass("is_visible");
  }

  function modalBackgroundColor(pokemon) {
    let color = "";
    if (pokemon.types.includes("grass" || "bug")) {
      color = "green";
    } else if (pokemon.types.includes("fire" || "dragon")) {
      color = "red";
    } else if (pokemon.types.includes("water")) {
      color = "blue";
    } else if (pokemon.types.includes("normal")) {
      color = "gray";
    } else if (pokemon.types.includes("poison")) {
      color = "purple";
    } else if (pokemon.types.includes("psychic")) {
      color = "#f366b9";
    } else if (pokemon.types.includes("electric")) {
      color = "yellow";
    } else if (pokemon.types.includes("fairy")) {
      color = "light pink";
    } else if (pokemon.types.includes("fighting")) {
      color = "#d56723";
    } else if (pokemon.types.includes("ground")) {
      color = "#ab9842";
    } else if (pokemon.types.includes("rock")) {
      color = "#a38c21";
    } else if (pokemon.types.includes("ice")) {
      color = "light blue";
    } else if (pokemon.types.includes("ghost")) {
      color = "#7b62a3";
    }
    return color;
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
  $(window).click(function (e) {
    var target = $(e.target);
    let modal = $(".modal");
    if (!target.is(modal)) {
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
