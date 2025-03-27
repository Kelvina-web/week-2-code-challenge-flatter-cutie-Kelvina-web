document.addEventListener("DOMContentLoaded", () => {
    const detailedName = document.getElementById("name");
    const detailedImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const resetBtn = document.getElementById("reset-btn");
    const characterBar = document.getElementById("character-bar");

    // Load Characters from db.json
    function fetchCharacters() {
        fetch("http://localhost:3000/characters")
            .then(response => response.json())
            .then(characters => {
                characterBar.innerHTML = ""; // Clear existing characters
                characters.forEach(character => {
                    const span = document.createElement("span");
                    span.className = "character";
                    span.textContent = character.name;
                    span.setAttribute("data-id", character.id);
                    span.setAttribute("data-image", character.image);

                    span.addEventListener("click", () => displayCharacterDetails(character));

                    characterBar.appendChild(span);
                });
            })
            .catch(err => console.error("Error loading characters:", err));

        // Voting functionality
        votesForm.onsubmit = (e) => {
            e.preventDefault();
            const votesToAdd = parseInt(document.getElementById("votes").value) || 0;

            character.votes += votesToAdd;
            voteCount.textContent = character.votes;

            // Update votes in db.json
            fetch(`http://localhost:3000/characters/${character.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ votes: character.votes })
            });

            votesForm.reset();
        };

        // Reset votes
        resetBtn.onclick = () => {
            character.votes = 0;
            voteCount.textContent = character.votes;

            // Reset votes in db.json
            fetch(`http://localhost:3000/characters/${character.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ votes: 0 })
            });
        };
    }

    // Add New Character Functionality
   // Add New Character Functionality
const characterForm = document.getElementById("character-form");

characterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newName = document.getElementById("name").value.trim();  // Ensure the ID matches your form field
    const newImage = document.getElementById("image-url").value.trim();

    if (newName && newImage) {
        const newCharacter = {
            name: newName,
            image: newImage,
            votes: 0
        };

        // Add the new character to db.json
        fetch("http://localhost:3000/characters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCharacter)
        })
        .then(response => response.json())
        .then(character => {
            // Add the character directly to the character bar
            const span = document.createElement("span");
            span.className = "character";
            span.textContent = character.name;
            span.setAttribute("data-id", character.id);
            span.setAttribute("data-image", character.image);

            span.addEventListener("click", () => displayCharacterDetails(character));

            characterBar.appendChild(span); // Display in the bar immediately
        })
        .catch(err => console.error("Error adding character:", err));

        characterForm.reset();
    } else {
        alert("Please provide both a name and an image URL.");
    }
});


    // Initial Fetch
    fetchCharacters();
});