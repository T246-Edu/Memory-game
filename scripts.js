let request =
  "https://api.giphy.com/v1/gifs/trending?api_key=avFa2FlLqK8eal2b3visbAbkA0dMHHLA&limit=100&rating=g";

let gifData = [];
const cardArray = [];

let cardsChosen = [];
let score = 0;
let cardsChosenIDs = [];
const gridDisplay = document.querySelector("#grid");

async function createBoard() {
  gifData = await (await fetch(request)).json();
  gifData = gifData.data;
  gifData.sort(() => 0.5 - Math.random());

  Object.entries(gifData.slice(0, 6)).map((x, y) => {
    let img = x[1].images.downsized.url;
    let id = x[1].id;
    cardArray.push({ name: id, img: img });
    cardArray.push({ name: id, img: img });
  });
  cardArray.sort(() => 0.5 - Math.random());
  for (let i = 0; i < 12; i++) {
    const card = document.createElement("img");
    card.src = "images/blank.png";
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}
createBoard();
function checkMatch() {
  let statusEL = document.getElementById("status");
  const cards = document.querySelectorAll("img");
  if (cardsChosen[0] === cardsChosen[1]) {
    statusEL.innerText = "status: you got a match";
    score += 1;
    document.getElementById("result").innerText = score;
    for (let i = 0; i < 2; i++) {
      cards[cardsChosenIDs[i]].className = "changed";
      cards[cardsChosenIDs[i]].src = "images/white.png";
      cards[cardsChosenIDs[i]].removeEventListener("click", flipCard);
    }
    cardsChosen = [];
    cardsChosenIDs = [];
    if (score == 6) {
      document.getElementById("result").innerText =
        "congratulations, you finished the game";
      alert("congratulations, you finished the game");
      location.reload();
    }
  } else {
    statusEL.innerText = "status: No, try again";
    cards[cardsChosenIDs[0]].src = "images/blank.png";
    cards[cardsChosenIDs[1]].src = "images/blank.png";
    cardsChosen = [];
    cardsChosenIDs = [];
  }
}

async function flipCard() {
  const cardId = this.getAttribute("data-id");
  if (!cardsChosenIDs.includes(cardId)) {
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIDs.push(cardId);
    await this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length == 2) {
      setTimeout(checkMatch, 500);
    }
  } else {
    alert("You entered the same image twice! try again.");
  }
}
