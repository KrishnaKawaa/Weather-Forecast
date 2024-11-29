const apiKey = `efb3ce4708fc7524b90ade945d19313f`;
const displayBox = document.getElementById("displayBox");

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const city = document.getElementById("location").value.trim(); // Correct property to get input value

    if (!city) {
        displayBox.textContent = "Please enter a city name!";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            // Extract weather details
            const { main, weather, name } = data;
            const temperature = main.temp; // Fixed typo
            const description = weather[0].description;

            // Display weather details
            displayBox.innerHTML = `
                <p><strong>City:</strong> ${name}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Description:</strong> ${description}</p>`;
        })
        .catch((error) => {
            // Handle errors (e.g., invalid city)
            displayBox.textContent = error.message;
        });
});
