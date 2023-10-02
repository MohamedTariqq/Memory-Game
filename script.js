document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's Your Name?");
  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blockContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blockContainer.children);
// creat Range of keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

Shuffle(orderRange);

// Add order css property to game Blocks
blocks.forEach((block, index) => {
  // Add css order property
  block.style.order = orderRange[index];
  //   Add click Event
  block.addEventListener("click", function () {
    //   Trigger the  flip Block Function
    flipBlock(block);
  });
});

// Flip BLock Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  //   Collect all Flipped cards
  let allFlippedBlocks = blocks.filter((flipBlock) =>
    flipBlock.classList.contains("is-flipped")
  );

  //   If Theres is two selected blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // checked matched block
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add class no clicking on main container
  blockContainer.classList.add("no-clicking");

  setTimeout(() => {
    // Remove class co clicking after duraion
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

// checked matched block
function checkMatchedBlocks(firstBlock, seconedBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.tech === seconedBlock.dataset.tech) {
    firstBlock.classList.remove("is-flipped");
    seconedBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    seconedBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      seconedBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

// Shuffle Function

function Shuffle(array) {
  // setting vars
  let current = array.length,
    remp,
    random;

  while (current > 0) {
    // get random number

    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // save current element in stash
    temp = array[current];

    // current element = random element
    array[current] = array[random];

    // Random element =get element from stash
    array[random] = temp;
  }
  return array;
}
