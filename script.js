// Wait for the page HTML to be ready.
$(function () {
  // Show the starting stats when the page first loads.
  checkAndUpdatePetInfoInHtml();

  // Hook up each button to its function.
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".nap-button").click(clickedNapButton);
  // Hide the comment at first so the visual effect is easier to see.
  $(".pet-comment").hide();
  
  // 7 Review jQuery documentation. Sign up for two unique methods (not discussed in class and in starter code) and use it in your project. Provide comments fully explaining how themethods are used. 
  
  // The .dblclick() method is used to attach an action to the pet image
  $(".pet-image").dblclick(function() {
  pet_info.happiness = pet_info.happiness + 1; //increases the pet's happiness by 1
  showPetComment("*wags tail* Thanks for the pets!"); //shows a comment thanking for the pets
  checkAndUpdatePetInfoInHtml(); //updates the pet information in the HTML
  });

  //mouseenter and mouseleave are used to show and hide a comment when the mouse enters and leaves the pet image, respectively
  $(".pet-image").mouseenter(function() {
  showPetComment("Hint: Double-click me!"); //shows a comment when the mouse enters the pet image
  });

  $(".pet-image").mouseleave(function() {
  $(".pet-comment").hide(); //hides the comment when the mouse leaves the pet image
  });
});

// 1 Create a pet_info object with keys "name", "weight", "happiness" and set initial values.
//   Set this equal to variable "pet_info"
var pet_info = {
  name: "Mr Bean",
  weight: 10,
  happiness: 10,
  energy: 10
};

// 2 Add a behavior to button interaction. 
// When your pet receives a treat, add to its happiness and weight. 
function clickedTreatButton() {
  pet_info.happiness = pet_info.happiness + 2;
  pet_info.weight = pet_info.weight + 1;
  pet_info.energy = pet_info.energy + 1;
  //if i overfeed the pes, it gains too much weight and becomes less happy
  if (pet_info.weight > 15) 
    { pet_info.happiness = pet_info.happiness - 3; }  
  //if i overfeed the pes, it gains too much weight and has less energt
  if (pet_info.weight > 15) 
    { pet_info.energy = pet_info.energy - 2; }  
  showPetComment("Deliciosooo!");
  checkAndUpdatePetInfoInHtml();
}

// When your pet plays, add to its happiness and reduce its weight
function clickedPlayButton() {
  pet_info.happiness = pet_info.happiness + 2;
  pet_info.weight = pet_info.weight - 1;
  pet_info.energy = pet_info.energy - 1;
  showPetComment("I watch the news for fun!");
  checkAndUpdatePetInfoInHtml();
}

// When your pet exercises, reduce its happiness and weight. 
function clickedExerciseButton() {
  pet_info.happiness = pet_info.happiness - 1;
  pet_info.weight = pet_info.weight - 2;
  pet_info.energy = pet_info.energy - 2;

  showPetComment("I don't like exercising... but I hate guilt more :(");
  checkAndUpdatePetInfoInHtml();
}

// 5 Add a new behavior that correlates with the new button you added. 
function clickedNapButton() {
  // A nap gives the pet more energy and a little more happiness.
  pet_info.energy = pet_info.energy + 3;
  pet_info.happiness = pet_info.happiness + 1;

  showPetComment("Napping is my only hobby : |");
  checkAndUpdatePetInfoInHtml();
}

// 3 Fix key bugs to make sure certain key values can't go below zero. (can use conditional)
function checkAndUpdatePetInfoInHtml() {
  if (pet_info.weight < 3) {
    pet_info.weight = 3;
  }
  if (pet_info.happiness < 5) {
    pet_info.happiness = 5;
  }
  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }

  updatePetInfoInHtml();
}

// Updates the HTML with the current values in the pet_info object.
function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
  $(".energy").text(pet_info.energy);

  // Complex happy / normal / tired image swap based on happiness.
  if (pet_info.happiness < 5 || pet_info.energy <= 0 || pet_info.weight <= 3) {
    animatePet();
    $(".pet-image").attr("src", "images/dog-dead.png");
  } else if (pet_info.happiness <= 9) {
    $(".pet-image").attr("src", "images/dog-sad.png");
  } else if (pet_info.happiness >= 15) {
    $(".pet-image").attr("src", "images/dog-very-happy.png");
  } else {
    $(".pet-image").attr("src", "images/dog-happy.png");
  }

}

// 6 Add a visual notification after each button press with a comment from your pet. For this requirement you can not use console.log() or alert().
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