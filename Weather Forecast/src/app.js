    const apiKey = `efb3ce4708fc7524b90ade945d19313f`;
    const displayBox = document.getElementById("displayBox");
    const coordinates = document.getElementById("coordinates");
    const displayBox2 = document.getElementById("displayBox2"); // New section for 5 days
    const image=document.getElementById("image");

    // Adding Event listener on the form to capture Input
    const form = document.querySelector("form");
form.addEventListener("submit", () => {
    event.preventDefault(); // To prevent the page from reloading after submit
    const city = document.getElementById("location").value.trim(); // Store the input value

    if (!city) {
        displayBox.textContent = "Please enter a city name";
        return;
    }

    // Current Weather API URL
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetching current weather data
    fetch(urlCurrent)
        .then((response) => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then((data) => {
            const { main, weather, name, coord, wind } = data;
            const temperature = main.temp;
            const humidity = main.humidity;
            const description = weather[0].description;
            const longitude = coord.lon;
            const latitude = coord.lat;
            const windSpeed = wind.speed;
            const icon=weather[0].icon;//weather icon id
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`; // Construct the image URL

            displayBox.innerHTML = `
                <p><strong>City: ${name}</strong></p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Wind:</strong> ${windSpeed} m/s</p>
            `;
            coordinates.innerHTML = `
                <p><strong>Coordinates</strong></p>
                <p>Longitude: ${coord.lon}</p>
                <p>Latitude: ${coord.lat}</p>
            `;
            image.innerHTML=`<img class="h-40 w-40" src="${iconUrl}" alt="${description}" >
            <p><strong>Description:</strong> ${description}</p>`

            // Fetching 5-day forecast data
            const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
            fetch(urlForecast)
                .then((response) => {
                    if (!response.ok) throw new Error("Unable to fetch forecast data");
                    return response.json();
                })
                .then((forecastData) => {
                    const forecastDivs = displayBox2.querySelectorAll("div");
                    // Loop through 5 forecast intervals (3 hours apart)
                    for (let i = 0; i < 5; i++) {
                        const forecast = forecastData.list[i * 8]; // 8 data points per day (every 3 hours)
                        const { main, weather, wind, dt_txt } = forecast;
                        const date = new Date(dt_txt).toLocaleDateString();
                        const temp = main.temp;
                        const humidity = main.humidity;
                        const description = weather[0].description;
                        const windSpeed = wind.speed;
                        const icon=weather[0].icon;//weather icon id
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`; // Construct the image URL

                        // Display forecast in respective div
                        forecastDivs[i].innerHTML = `
                            <u><p><strong>${date}</strong></p></u>
                            <p><strong>Temp:</strong> ${temp}°C</p>
                            <p><strong>Humidity:</strong> ${humidity}%</p>
                            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                            <img  src="${iconUrl}" alt="${description}" class=" w-5 h-5 m-0 ">
                            <p><strong>Description:</strong> ${description}</p>

                        `;
                    }
                })
                .catch((error) => {
                    console.error(error);
                    displayBox2.innerHTML = "<p>Unable to fetch forecast data.</p>";
                });
        })
        .catch((error) => {
            displayBox.textContent = error.message;
            coordinates.innerHTML = "";
            displayBox2.innerHTML = ""; // Clear forecast display
        });
});


    //---------------------Tracking User location---------------------------------------------------------------------------
    // Select elements for tracking
    const trackButton = document.getElementById("trackLocation");
    const display = document.getElementById("display");

    // Function to get and display the location and weather data
    function getLocation() {
    displayBox.innerHTML = "";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Display the coordinates
            display.innerHTML = `
            <p><strong>Your Coordinates:</strong></p>
            <p>Latitude: ${lat}</p>
            <p>Longitude: ${lon}</p>
            `;

            // Fetch weather data based on coordinates 
            const urlTrack = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(urlTrack)
            .then((response) => {
                if (!response.ok) {
                throw new Error("Unable to fetch weather data");
                }
                return response.json();
            })
            .then((data) => {
                const { main, weather, name, wind } = data;
                const temperature = main.temp;
                const humidity = main.humidity;
                const description = weather[0].description;
                const windSpeed = wind.speed;

                // Display weather data
                displayBox.innerHTML = `
                <p><strong>City:</strong> ${name}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                `;


                // Fetching 5-day forecast data based on coordinates
                const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                fetch(urlForecast)
                .then((response) => {
                    if (!response.ok) throw new Error("Unable to fetch forecast data");
                    return response.json();
                })
                .then((forecastData) => {
                    const forecastDivs = displayBox2.querySelectorAll("div");
                    // Loop through 5 forecast intervals (3 hours apart)
                    for (let i = 0; i < 5; i++) {
                        const forecast = forecastData.list[i * 8]; // 8 data points per day (every 3 hours)
                        const { main, weather, wind, dt_txt } = forecast;
                        const date = new Date(dt_txt).toLocaleDateString();
                        const temp = main.temp;
                        const humidity = main.humidity;
                        const description = weather[0].description;
                        const windSpeed = wind.speed;

                        // Display forecast in respective div
                        forecastDivs[i].innerHTML = `
                            <p><strong>${date}</strong></p>
                            <p><strong>Temp:</strong> ${temp}°C</p>
                            <p><strong>Description:</strong> ${description}</p>
                            <p><strong>Humidity:</strong> ${humidity}%</p>
                            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                        `;
                    }
                })
                .catch((error) => {
                    console.error(error);
                    displayBox2.innerHTML = "<p>Unable to fetch forecast data.</p>";
                });
            })
            .catch((error) => {
                display.innerHTML += `<p>Error: ${error.message}</p>`;
            });
        },
        (error) => {
            switch (error.code) {
            case error.PERMISSION_DENIED:
                display.innerHTML = "Permission denied. Please allow location access.";
                break;
            case error.POSITION_UNAVAILABLE:
                display.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                display.innerHTML = "Request timed out. Please try again.";
                break;
            default:
                display.innerHTML = "An unknown error occurred.";
            }
        }
        );
    } else {
        display.innerHTML = "Geolocation is not supported by your browser.";
    }
    }

    // Attaching event listener to the button
    trackButton.addEventListener("click", getLocation);



