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