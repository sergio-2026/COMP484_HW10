// Wait for the page HTML to be ready.
$(function () {
  // Message Logging - Log Custom (styled message)
  console.log(
    "%cGigaPet DevTools demo loaded. Click the buttons and watch the console.",
    "color: green; font-size: 16px; font-weight: bold;"
  );

  // Show the starting stats when the page first loads.
  checkAndUpdatePetInfoInHtml();

  // Hook up each button to its function.
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".nap-button").click(clickedNapButton);

  // Hide the comment at first so the visual effect is easier to see.
  $(".pet-comment").hide();

  // Extra jQuery interaction from earlier project:
  // Double‑click on the pet image to give a small happiness boost.
  $(".pet-image").dblclick(function () {
    pet_info.happiness = pet_info.happiness + 1;
    showPetComment("*wags tail* Thanks for the pets!");
    checkAndUpdatePetInfoInHtml();
  });

  // Show a hint when the mouse enters the pet image.
  $(".pet-image").mouseenter(function () {
    showPetComment("Hint: Double‑click me!");
  });

  // Hide the comment when the mouse leaves the pet image.
  $(".pet-image").mouseleave(function () {
    $(".pet-comment").hide();
  });
});

// 1 Create a pet_info object with keys "name", "weight", "happiness" and set initial values.
// Set this equal to variable "pet_info"
var pet_info = {
  name: "Mr Bean",
  weight: 10,
  happiness: 10,
  energy: 10
};

// 2 Add a behavior to button interaction.
// When your pet receives a treat, add to its happiness and weight.
function clickedTreatButton() {
  // Message Logging - Log Group
  console.group("Button click: Treat");
  console.log("Before treat:", pet_info); // Message Logging - Log Info

  pet_info.happiness = pet_info.happiness + 2;
  pet_info.weight = pet_info.weight + 1;
  pet_info.energy = pet_info.energy + 1;

  // If we overfeed the pet, it gains too much weight and becomes less happy / less energy.
  if (pet_info.weight > 15) {
    pet_info.happiness = pet_info.happiness - 3;
    pet_info.energy = pet_info.energy - 2;

    // Message Logging - Log Warning
    console.warn("Warning: Pet may be overfed. Weight is", pet_info.weight);
  }

  showPetComment("Deliciosooo!");
  checkAndUpdatePetInfoInHtml();

  // Message Logging - Log Table
  console.table(pet_info);
  console.groupEnd();
}

// When your pet plays, add to its happiness and reduce its weight.
function clickedPlayButton() {
  // Message Logging - Log Group
  console.group("Button click: Play");
  console.log("Before play:", pet_info); // Message Logging - Log Info

  pet_info.happiness = pet_info.happiness + 2;
  pet_info.weight = pet_info.weight - 1;
  pet_info.energy = pet_info.energy - 1;

  showPetComment("I watch the news for fun!");
  checkAndUpdatePetInfoInHtml();

  // Message Logging - Log Table
  console.table(pet_info);
  console.groupEnd();
}

// When your pet exercises, reduce its happiness and weight.
function clickedExerciseButton() {
  // Message Logging - Log Group
  console.group("Button click: Exercise");
  console.log("Before exercise:", pet_info); // Message Logging - Log Info

  pet_info.happiness = pet_info.happiness - 1;
  pet_info.weight = pet_info.weight - 2;
  pet_info.energy = pet_info.energy - 2;

  // Message Logging - Log Error (if no energy)
  if (pet_info.energy <= 0) {
    console.error(
      "Error: Pet is out of energy but exercise was clicked."
    );
  }

  showPetComment("I don't like exercising... but I hate guilt more :(");
  checkAndUpdatePetInfoInHtml();

  // Message Logging - Log Table
  console.table(pet_info);
  console.groupEnd();
}

// 5 Add a new behavior that correlates with the new button you added.
function clickedNapButton() {
  // Message Logging - Log Group
  console.group("Button click: Nap");
  console.log("Before nap:", pet_info); // Message Logging - Log Info

  // A nap gives the pet more energy and a little more happiness.
  pet_info.energy = pet_info.energy + 3;
  pet_info.happiness = pet_info.happiness + 1;

  showPetComment("Napping is my only hobby : |");
  checkAndUpdatePetInfoInHtml();

  // Message Logging - Log Table
  console.table(pet_info);
  console.groupEnd();
}

// 3 Fix key bugs to make sure certain key values can't go below zero. (can use conditional)
function checkAndUpdatePetInfoInHtml() {
  if (pet_info.weight < 3) {
    pet_info.weight = 3;
  }
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }

  updatePetInfoInHtml();

  // Message Logging - Log Table (current state after any change)
  console.table(pet_info);
}

// Updates the HTML with the current values in the pet_info object.
function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
  $(".energy").text(pet_info.energy);

  // Complex happy / normal / tired image swap based on happiness / energy / weight.
  if (pet_info.happiness < 5 || pet_info.energy <= 0 || pet_info.weight <= 3) {
    animatePet();
    $(".pet-image").attr("src", "images/dog-dead.jpg");
  } else if (pet_info.happiness <= 9) {
    $(".pet-image").attr("src", "images/dog-sad.jpg");
  } else if (pet_info.happiness >= 15) {
    $(".pet-image").attr("src", "images/dog-very-happy.jpg");
  } else {
    $(".pet-image").attr("src", "images/dog-happy.jpg");
  }
}

// 6 Add a visual notification after each button press with a comment from your pet.
// For this requirement you can not use console.log() or alert().
function showPetComment(message) {
  // Put the new message into the comment paragraph.
  $(".pet-comment").text(message);
  $(".pet-comment").show();
}

// 9 Add animations and/or sound effects to your pet when certain conditions occur.
function animatePet() {
  // If pet passes away, make it give a whimper sound
  var whimper = new Audio("sounds/whimper.mp3");
  whimper.play();
}

/* ===== DevTools specific demo helpers ===== */

/**
 * Cause a TypeError on purpose for the assignment.
 * Call this from the Console:  causeTypeErrorDemo()
 */
function causeTypeErrorDemo() {
  var nothing = null;
  // This will cause "TypeError: Cannot read properties of null"
  nothing.toString();
}

/**
 * Cause a performance Violation warning by doing heavy work on scroll.
 * Just scrolling the page should make Chrome show a [Violation] log.
 */
window.addEventListener("scroll", function () {
  var sum = 0;
  for (var i = 0; i < 4000000; i++) {
    sum = sum + i;
  }
});