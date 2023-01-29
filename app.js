let id = "1o4vIdjHUePyU90AAdjBTblO73Hn-de1sU3_KnBHr5l8";
const myWords = ["Hello", "World"];
// const myWords = [
//   "Hello",
//   "World",
//   "JavaScript",
//   "Code",
//   "HTML",
//   "Document",
//   "Tailwind",
// ];
const output = document.querySelector(".output");
const btn = document.createElement("button");

const startBtn = document.createElement("button");
startBtn.textContent = "Start Game";
startBtn.addEventListener("click", startGame);

const game = { sel: "", scramble: "", wordsLeft: 0 };
const gameArea = document.querySelector(".gameArea");
const mes = document.querySelector(".message");
gameArea.style.display = "none";

gameArea.querySelector("button").addEventListener("click", checkVal);

btn.textContent = "Load Sheet by ID";
const sheetID = document.createElement("input");
sheetID.setAttribute("type", "text");

const qs = window.location.search;

const urlParams = new URLSearchParams(qs);
const div1 = document.createElement("div");
output.append(div1);
div1.append(sheetID);
div1.append(btn);
output.append(startBtn);

if (urlParams.get("id")) {
  id = urlParams.get("id");
  // createShareLink(id);
  sheetID.value = id;
  div1.style.display = "none";
}
sheetID.value = id;

btn.addEventListener("click", (e) => {
  loadListFromSheet(true);
});

function loadListFromSheet(boo) {
  console.log(sheetID.value);
  const url =
    "https://spreadsheets.google.com/feeds/list/" +
    sheetID.value +
    "/1/public/values?alt=json";
  btn.disabled = true;
  console.log(url);

  const div = document.createElement("div");
  output.append(div);

  fetch(url)
    .then((req) => req.json())
    .then((json) => {
      messageOut("New World List Loaded");
      if (boo) {
        createShareLink(id);
      }
      console.log(json["feed"]["entry"]);
      myWords.length = 0;
      let enty = json.feed.entry;
      enty.forEach((el) => {
        console.log(el.title["$t"]);
        // let temp = el["gsx$word"]["$t"];

        let temp = el.title["$t"];
        console.log(temp.includes(":"));
        if (temp.length > 0 && !temp.includes(":")) {
          let holder = temp.split(" ");
          myWords.push(...holder);
        }
      });
      if (boo) {
        div.append(span);
      }
      span.textContent = myWords.join(", ");
      btn.disabled = false;
      console.log(myWords);
    })
    .catch((err) => {
      div.textContent = "Error: List not loaded  using default list ";
      messageOut("Error Loading List");
      btn.disabled = false;
      const span = document.createElement("span");
      div.append(span);
      span.textContent = myWords.join(", ");
    });
}

function startGame() {
  gameArea.style.display = "block";
  console.log("start game");
  output.style.display = "none";
  console.log(myWords);
  if (myWords.length <= 0) {
    messageOut("Game Over");
    gameArea.style.display = "none";
    output.style.display = "block";
  } else {
    myWords.sort(() => {
      return 0.5 - Math.random();
    });
    game.sel = myWords.shift();
    game.sel = game.sel.toLowerCase();
    game.wordsLeft = myWords.length;
    game.scramble = sorter(game.sel);
    gameArea.querySelector("div").textContent = game.scramble; // select the first "div" and update the textContent to have the game selected word
  }
}

function sorter(word) {
  word = word.toLowerCase();
  let temp = word.split("");
  console.log(temp);
  temp.sort(() => {
    return 0.5 - Math.random();
  });
  temp = temp.join("");
  if (word == temp) {
    return sorter(temp);
  }
  console.log(temp);
  return temp;
}

function checkVal() {
  console.log("working");
  let guessEle = gameArea.querySelector("input");
  let guess = guessEle.value;
  console.log(guess);
  guessEle.value = "";
  guess = guess.toLowerCase();

  if (guess == game.sel) {
    messageOut("correct - words left " + game.wordsLeft);
    startGame();
  } else {
    messageOut("incorrect");
  }
}

function messageOut(val) {
  console.log(val);
  mes.innerHTML = val;
}

function createShareLink(myId) {
  console.log(window.location.origin);
  let linkVal = window.location.origin + "?id=" + myId;
  const myURL = document.createElement("input");
  const aLink = document.createElement("a");
  aLink.textContent = "Shareable Link " + linkVal;
  aLink.classList.add("myLink");
  aLink.setAttribute("href", linkVal);
  aLink.setAttribute("target", "_blank");
  myURL.value = linkVal;
  myURL.addEventListener("focus", (e) => {
    myURL.select();
  });
  output.append(aLink);
  output.append(myURL);
}
