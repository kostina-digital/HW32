const characterContainer = document.getElementById("charactersContainer");
const loadCharactersBtn = document.getElementById("loadCharactersBtn");
const searchInput = document.getElementById("searchInput");
const onlyStudentsBtn = document.getElementById("onlyStudentsBtn");
const onlyStaffBtn = document.getElementById("onlyStaffBtn");
const hogwartsStudents = document.getElementById("hogwartsStudents");
const hogwartsStaff = document.getElementById("hogwartsStaff");

let allCharacters = [];
let onlySudents = [];
let onlyStaff = [];
let currentIndex = 0;
const batchSize = 18;

let currentUrl = "https://hp-api.onrender.com/api/characters";
const studentsUrl = "https://hp-api.onrender.com/api/characters/students";
const staffUrl = "https://hp-api.onrender.com/api/characters/staff";

// Initial load of characters
loadAllCharacters();

// Function to load all characters from the API
function loadAllCharacters() {
  fetchData(currentUrl);
}

// Fetch data from the API
function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allCharacters = data;
      currentIndex = 0;
      characterContainer.innerHTML = "";
      loadCharactersInBatches();
    })
    .catch((error) => console.error("Error loading characters:", error));
}

// Function to load characters in batches (batchSize at a time)
function loadCharactersInBatches() {
  const nextBatch = allCharacters.slice(currentIndex, currentIndex + batchSize);
  showCharacters(nextBatch);
  currentIndex += batchSize;
  showCharacterBtn();
}

function showCharacterBtn() {
  if (currentIndex >= allCharacters.length) {
    loadCharactersBtn.style.display = "none";
  } else {
    loadCharactersBtn.style.display = "block";
    loadCharactersBtn.disabled = false;
    loadCharactersBtn.textContent = "Load More Characters";
  }
}
loadCharactersBtn.addEventListener("click", () => {
  loadCharactersBtn.textContent = "Loading...";
  loadCharactersBtn.disabled = true;
  loadCharactersInBatches();
});

// Function to display characters
function showCharacters(characters) {
  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.className = "character-card";

    const characterImage = document.createElement("img");
    characterImage.src = character.image || "images/placeholder.webp";
    characterImage.alt = character.name;
    characterImage.className = "character-image";
    characterCard.appendChild(characterImage);

    const characterName = document.createElement("h3");
    characterName.textContent = character.name;
    characterName.className = "character-name";
    characterCard.appendChild(characterName);

    const characterActor = document.createElement("p");
    characterActor.textContent = "Actor: " + (character.actor || "Unknown");
    characterActor.className = "character-actor";
    characterCard.appendChild(characterActor);

    const characterHouse = document.createElement("p");
    characterHouse.textContent =
      "House: " + (character.house || "No House Info");
    characterHouse.className = "character-house";
    characterCard.appendChild(characterHouse);

    const characterAge = document.createElement("p");
    characterAge.textContent =
      "Date of Birth: " + (character.dateOfBirth || "Unknown");
    characterAge.className = "character-age";
    characterCard.appendChild(characterAge);

    const characterWand = document.createElement("p");
    characterWand.textContent =
      "Wand: " +
      (character.wand.wood || "Unknown") +
      " wood, " +
      (character.wand.core || "Unknown") +
      " core, " +
      (character.wand.length
        ? character.wand.length + " inches"
        : "Unknown Length");
    characterWand.className = "character-wand";
    characterCard.appendChild(characterWand);

    const characterPatronus = document.createElement("p");
    characterPatronus.textContent =
      "Patronus: " + (character.patronus || "Unknown");
    characterPatronus.className = "character-patronus";
    characterCard.appendChild(characterPatronus);

    characterContainer.appendChild(characterCard);
  });
}

// Event listener for search input
searchInput.addEventListener("input", () => {
  characterContainer.innerHTML = "";
  loadCharactersBtn.style.display = "none";

  if (searchInput.value.length < 3) {
    loadAllCharacters();
    return;
  }
  fetch(currentUrl)
    .then((response) => response.json())
    .then((data) => {
      const search = searchInput.value.toLowerCase().trim();
      const filteredCharacters = data.filter((character) =>
        character.name.toLowerCase().includes(search)
      );

      if (filteredCharacters.length === 0) {
        characterContainer.innerHTML = "<p>Sorry... No characters found.</p>";
      } else {
        allCharacters = filteredCharacters;
        currentIndex = 0;
        characterContainer.innerHTML = "";
        loadCharactersInBatches();
      }
    })
    .catch((error) => console.error("Error searching characters:", error));
});

// Event listener for only students button
onlyStudentsBtn.addEventListener("click", () => {
  searchInput.value = "";
  characterContainer.innerHTML = "";
  loadCharactersBtn.style.display = "none";
  currentUrl = studentsUrl;

  fetch(currentUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        characterContainer.innerHTML =
          "<p>Sorry... No student characters found.</p>";
      } else {
      }
      allCharacters = data;
      currentIndex = 0;
      characterContainer.innerHTML = "";
      loadCharactersInBatches();
    })
    .catch((error) =>
      console.error("Error loading student characters:", error)
    );
});

// Event listener for only staff button
onlyStaffBtn.addEventListener("click", () => {
  searchInput.value = "";
  characterContainer.innerHTML = "";
  loadCharactersBtn.style.display = "none";
  currentUrl = staffUrl;

  fetch(currentUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        characterContainer.innerHTML =
          "<p>Sorry... No staff characters found.</p>";
      } else {
      }
      allCharacters = data;
      currentIndex = 0;
      characterContainer.innerHTML = "";
      loadCharactersInBatches();
    })
    .catch((error) => console.error("Error loading staff characters:", error));
});

// Dropdown menu functionality
document.querySelectorAll(".has-dropdown").forEach((item) => {
  item.addEventListener("click", (event) => {
    const dropdown = item.querySelector(".dropdown");
    if (dropdown.style.display === "flex") {
      dropdown.style.display = "none";
    } else {
      document
        .querySelectorAll(".dropdown")
        .forEach((dd) => (dd.style.display = "none"));
      dropdown.style.display = "flex";
    }
    event.stopPropagation();
  });
});

// Close dropdowns when clicking outside
// document.addEventListener('click', () => {
//     document.querySelectorAll('.dropdown').forEach(dd => dd.style.display = 'none');
// });

// document.querySelectorAll('.has-dropdown').forEach(item => {
//     item.addEventListener('click', event => {
//         event.stopPropagation();
//         const dropdown = item.querySelector('.dropdown');
//         if (dropdown.style.display === 'flex') {
//             dropdown.style.display = 'none';
//         } else {
//             document.querySelectorAll('.dropdown').forEach(dd => dd.style.display = 'none');
//             dropdown.style.display = 'flex';
//         }
//     });
// });
hogwartsStudents.addEventListener("click", () => {
  onlyStudentsBtn.click();
});

hogwartsStaff.addEventListener("click", () => {
  onlyStaffBtn.click();
});

// const slides = document.querySelector('.slides');
// const images = document.querySelectorAll('.slides img');
// const prev = document.querySelector('.prev');
// const next = document.querySelector('.next');

// let index = 0;
// let interval;

// showSlide(index);

// function showSlide(i) {
//     index = (i + images.length) % images.length;
//     slides.style.transform = `translateX(${-index * 900}px)`;
// }

// function startAuto() {
//     stopAuto();
//     interval = setInterval(() => showSlide(index + 1), 3000);
// }
// function stopAuto() {
//     clearInterval(interval);
// }
// startAuto();

// slides.addEventListener('mouseenter', stopAuto);
// slides.addEventListener('mouseleave', startAuto);

// prev.addEventListener('click', () => showSlide(index - 1));
// next.addEventListener('click', () => showSlide(index + 1));

// ========================================
// HAMBURGER MENU FUNCTIONALITY
// ========================================

// Get DOM elements
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const navbarList = document.querySelector('.navbar-list');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'navbar-overlay';
document.body.appendChild(overlay);

// Toggle menu function
function toggleMenu() {
    const isOpen = navbar.classList.contains('open');
    
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Open menu function
function openMenu() {
    navbar.classList.add('open');
    hamburger.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close menu function
function closeMenu() {
    navbar.classList.remove('open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Close all dropdowns
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
    });
}

// Toggle dropdown function
function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.currentTarget;
    const isOpen = dropdown.classList.contains('open');
    
    // Close all other dropdowns
    const allDropdowns = document.querySelectorAll('.has-dropdown');
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('open');
        }
    });
    
    // Toggle current dropdown
    if (isOpen) {
        dropdown.classList.remove('open');
    } else {
        dropdown.classList.add('open');
    }
}

// Event listeners
hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// Handle dropdown clicks
const dropdownItems = document.querySelectorAll('.has-dropdown > a');
dropdownItems.forEach(item => {
    item.addEventListener('click', toggleDropdown);
});

// Close menu when clicking on regular links
const regularLinks = document.querySelectorAll('.navbar-list > li:not(.has-dropdown) a');
regularLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking on dropdown links
const dropdownLinks = document.querySelectorAll('.dropdown a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbar.classList.contains('open')) {
        closeMenu();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (navbar.classList.contains('open') && 
        !navbar.contains(event.target) && 
        !hamburger.contains(event.target)) {
        closeMenu();
    }
});
