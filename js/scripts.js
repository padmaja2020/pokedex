//IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let container = $(".container");
  let row = $(".row");

  //Function to get all the pokemon names from pokemonList
  function getAll() {
    return pokemonList;
  }

  //Function to add the pokemon names to pokemonList
  function add(pokemon) {
    return pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonList = $(".pokemon-list");
    let listGroup = $(
      '<div id="list" class = " col-xs-12  list-group  col-md-3  "></div>'
    );
    let button = $(
      '<button type = "button"  class = " pokemon-name list-group-item list-group-action text-capitalize " data-toggle = "modal" data-target = "#modal-container">' +
        pokemon.name +
        "</button>"
    );
    listGroup.append(button);
    pokemonList.append(listGroup);
    button.on("click", function (event) {
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
        item.weight = details.weight;
        item.id = details.id;
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
    let modalHeader = $(".modal-header");
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalContent = $(".modal-content");
    modalTitle.empty();
    modalBody.empty();
    let pokemonName = $(
      "<h1 class = 'text-capitalize'>" + pokemon.name + "</h1>"
    );

    let pokemonTypes = $(
      "<p><strong> Types:   " + pokemon.types + "</strong></p>"
    );
    let pokemonId = $("<p><strong> Id:  # " + pokemon.id + "</strong></p>");
    let pokemonWeight = $(
      "<p><strong> Weight:  " + pokemon.weight + "</strong></p>"
    );
    //function to get the color for the background
    let backGroundColor = modalBackgroundColor(pokemon);
    $(modalContent).css("background-color", backGroundColor);
    let pokemonHeight = $(
      "<p><strong>Height:  " + pokemon.height + "</strong></p>"
    );
    let pokemonImg = $(
      "<img class = 'img-fluid pokemon-image' alt ='Pokemon Image' src = " +
        pokemon.image +
        ">"
    );

    modalTitle.append(pokemonName);
    modalBody.append(pokemonId);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonImg);
  }

  function modalBackgroundColor(pokemon) {
    let color = "";
    if (pokemon.types.includes("grass")) {
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
    } else if (pokemon.types.includes("bug")) {
      color = "green";
    } else if (pokemon.types.includes("dragon")) {
      color = "red";
    }
    return color;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function myFunction() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.querySelectorAll("#list");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("button")[0];
    console.log(a.innerText);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
