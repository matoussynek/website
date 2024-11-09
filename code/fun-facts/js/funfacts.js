const files = ["animal_kingdom", "cartoon", "customs", "earth", "expressions", "flags", "food", "grammar", "history", "human_anatomy", "inventions", "legal", "literature", "math", "monetary", "movies", "music", "plants", "records", "religion", "space", "sports", "statistics", "trivia", "tv"];
async function displayRandomFact() {
    try {
        // Select a random JSON file
        const randomFile = files[Math.floor(Math.random() * files.length)];
        // console.log('Selected file:', randomFile + '.json');

        // Fetch the content of the selected JSON file
        const fileResponse = await fetch(`./data/${randomFile}.json`);
        const data = await fileResponse.json();

        // Select a random element from the JSON data
        const randomFact = data[Math.floor(Math.random() * data.length)];

        // Display the random fact in the element with id 'constraint-text'
        document.getElementById('constraint-text').innerHTML = randomFact.fact;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}
document.querySelector('.constraint').addEventListener('click', displayRandomFact);