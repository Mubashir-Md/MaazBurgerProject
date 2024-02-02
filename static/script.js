function predict() {
    // Get the input text from the form
    var text = document.getElementById('textInput').value;

    // Make an AJAX request to the server
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text),
    })
    .then(response => response.json())
    .then(data => {
        // Update the HTML with the prediction result and apply styles
        var predictionResult = document.getElementById('predictionResult');
        predictionResult.innerText = 'Prediction Result: ' + data.prediction;
        if (data.prediction === 'Positive') {
            predictionResult.style.color = 'green'; // Apply green color for positive result
        } else {
            predictionResult.style.color = 'red'; // Apply red color for negative result
        }
        // Create a new element for displaying the burger result
        var burgerResult = document.createElement('p');
        burgerResult.innerText = 'Burger Score: ' + data.burger_score;
        predictionResult.appendChild(burgerResult); // Append the burger result to the prediction result
    })
    .catch(error => {
        console.error('Error:', error);
    });
}