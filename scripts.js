document.addEventListener('DOMContentLoaded', () => {
    let data = [];

    // Function to display predictions
    function displayPredictions(predictions) {
        const predictionsContainer = document.getElementById('predictions-container');
        predictionsContainer.innerHTML = '';

        if (predictions.length === 0) {
            predictionsContainer.innerHTML = '<p>No high risk of Dzud predictions found.</p>';
            return;
        }

        predictions.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card mb-4';
            card.innerHTML = `
                <div class="card-body">
                    <h3 class="card-title">Date: ${item.date}</h3>
                    <p class="card-text">City: ${item.name}</p>
                    <p class="card-text">Predicted Temperature: ${item.temp}°C</p>
                    <p class="card-text">Prediction: High risk of Dzud</p>
                </div>
            `;
            predictionsContainer.appendChild(card);
        });
    }

    // Fetch the data from the JSON file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(jsonData => {
            data = jsonData;
            console.log('Data fetched:', data); // Log the data fetched
            displayPredictions(data.filter(item => item.isDzud === 1)); // Initially display all predictions
        })
        .catch(error => console.error('Error loading data:', error));

    // Add event listener to the search button
    document.getElementById('search-button').addEventListener('click', () => {
        const cityInput = document.getElementById('city-input').value.trim().toLowerCase();
        console.log('City input:', cityInput); // Log the city input

        const filteredPredictions = data.filter(item => item.name && item.name.toLowerCase().startsWith(cityInput) && item.isDzud === 1);
        console.log('Filtered predictions:', filteredPredictions); // Log filtered predictions

        displayPredictions(filteredPredictions);
    });
});
