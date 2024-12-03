const apiKey = `efb3ce4708fc7524b90ade945d19313f`;
const displayBox= document.getElementById("displayBox");
const coordinates=document.getElementById("coordinates");

// Adding Event lisitner on the form to capture Input 

const form = document.querySelector("form")
form.addEventListener("submit",()=>{
    event.preventDefault()//to prevent the page to reload after submit
    const city = document.getElementById("location").value.trim();//store the input value

    if(!city){
        displayBox.textContent= "Please enter a city name";
        console.log(city);
        displayBox.textContent= "";
        return ;
    }

    // Current Weather API 
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    // fetching data from url
    fetch(urlCurrent)
    .then((response)=>{//checking if the http status code indicates success
        if (!response.ok) throw new Error("City not found");
        return response.json();
    })
    .then((data)=>{//Data -> Json format -> Display data
        const { main, weather, name, coord, wind } = data;
        const temperature = main.temp;
        const humidity =main.humidity;
        const description = weather[0].description;
        const longitude = coord.lon;
        const latitude =coord.lat;
        const windSpeed =wind.speed;
        displayBox.innerHTML=`
            <p><strong>City:</strong> ${name}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Wind:</strong>${windSpeed}</p>
            `;
        coordinates.innerHTML=`
        <p><strong>Coordinates</strong></p>
        <p>Longitude:${coord.lon}</p>
        <p>Latitude:${coord.lat}</p>
        `;
        })
        .catch((error) => {
            displayBox.textContent = error.message;
            displayBox2.textContent = ""; // Clear forecast display
            coordinates.innerHTML="";
        });
})



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
            const urlTrack = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

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
                displayBox.innerHTML += `
                <p><strong>City:</strong> ${name}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                `;
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
