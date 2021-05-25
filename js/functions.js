
//sets list of letters
const setLettersList = () => {
  let selectLyrics = $("letter");
  alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  alphabet.forEach((element) => {
    let option = document.createElement("option");
    option.value = element;
    option.innerHTML = element;
    selectLyrics.appendChild(option);
  });
};

//updates character on page
const changeCharacter = () => {
  let selectCharacter = $("characters").value;
  fetchCharacter(selectCharacter);
};

const selectCharacterChange = () => {
    let selectCharacter = $("characters");
    selectCharacter.addEventListener("change", changeCharacter);
  };

//sets list according to letter value
const setCharactersList = () => {
  let selectLyrics = $("letter").value;
  fetch(
    "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
      selectLyrics +
      "&ts=1&apikey=3e8159f9102a91676ab9339a3b0e7135&hash=6126f0add6159a284067d294bbd98c92&limit=100"
  )
    .then((response) => response.json())
    .then((dataResponse) => {
      let characterList = dataResponse.data.results;
      let selectCharacter = $("characters");

      for (let i = selectCharacter.length - 1; i >= 1; i--) {
        selectCharacter.remove(i);
      }

      characterList.forEach((element) => {
        let option = document.createElement("option");
        option.value = element.name;
        option.innerHTML = element.name;
        selectCharacter.appendChild(option);
      });
    });
};

const updateCharactersList = () => {
    let selectLyrics = $("letter");
    selectLyrics.addEventListener("change", setCharactersList);
  };

const $ = (value) => {
  return document.getElementById(value);
};

//default
(() => {
  fetchCharacter("spider-man");
})();

window.addEventListener("load", setLettersList);
window.addEventListener("load", updateCharactersList);
window.addEventListener("load", selectCharacterChange);

function fetchCharacter(characterName) {
  return fetch(
    `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&ts=1&apikey=3e8159f9102a91676ab9339a3b0e7135&hash=6126f0add6159a284067d294bbd98c92`
  )
    .then((response) => response.json())
    .then((dataResponse) => {
      let character = dataResponse.data.results[0];
      let imgURL =
        character.thumbnail.path + "." + character.thumbnail.extension;
      document.getElementById("profile-image").src = imgURL;

      $("td-character-name").innerHTML = character.name;
      $("description").innerHTML =
        character.description ||
        "Sorry! No info available for this character";
    });
}
