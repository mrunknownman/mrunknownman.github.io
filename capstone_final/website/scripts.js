document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);
            const predictionsContainer = document.getElementById('predictions-container');
            let dzudCount = 0;
            data.forEach(item => {
                if (item.isDzud === 1) {
                    dzudCount++;
                    const card = document.createElement('div');
                    card.className = 'card mb-4';
                    card.innerHTML = `
                        <div class="card-body">
                            <h3 class="card-title">Date: ${item.date}</h3>
                            <p class="card-text">Forecasted Temperature: ${item.temp}°C</p>
                            <p class="card-text">Prediction: High risk of Dzud</p>
                        </div>
                    `;
                    predictionsContainer.appendChild(card);
                    console.log('Card added for date:', item.date);
                }
            });
            if (dzudCount === 0) {
                predictionsContainer.innerHTML = '<p>No high risk of Dzud predictions found.</p>';
            }
        })
        .catch(error => console.error('Error loading data:', error));
});
