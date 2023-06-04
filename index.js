const apiKey=`sswjfxCuXCdpWCAKdzUx3UzDjNf5zchMBEPu0Kdz`;

document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
    
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      const selectedDate = searchInput.value;
      getImageOfTheDay(selectedDate);
      searchInput.value = '';
    });
  });
  
  function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    getImageOfTheDay(currentDate);
  }
  
  function getImageOfTheDay(date) {
    // const apiKey = 'YOUR_API_KEY'; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

         const today=new Date().toISOString().split('T')[0];
        const img_date=document.getElementById("nasa_date");
        if(date===today){
            img_date.innerText="NASA Picture of the Day";
        }
        else{
            img_date.innerText="Picture On  "+date;
        }
        
        // if(data.date===)
        if (data.hdurl) {
          displayImage(data.hdurl,data.explanation,data.title);
          saveSearch(data.date);
        } else {
          displayErrorMessage('No image found for the selected date.');
        }
      })
      .catch(error => {
        displayErrorMessage('An error occurred while fetching the image.');
      });
  }

  function getImageOfTheDay_eventlistener(date){
    // const apiKey = 'YOUR_API_KEY'; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

         const today=new Date().toISOString().split('T')[0];
        const img_date=document.getElementById("nasa_date");
        if(date===today){
            img_date.innerText="NASA Picture of the Day";
        }
        else{
            img_date.innerText="Picture On  "+date;
        }
        
        // if(data.date===)
        if (data.hdurl) {
          displayImage(data.hdurl,data.explanation,data.title);

        }
         else {
          displayErrorMessage('No image found for the selected date.');
        }
      })
      .catch(error => {
        displayErrorMessage('An error occurred while fetching the image.');
      });
  }



  function saveSearch(date) {
    let searches = localStorage.getItem('searches');
    if (searches) {
      searches = JSON.parse(searches);
    } else {
      searches = [];
    }
    

    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));

    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li')
    listItem.textContent = date;
    listItem.addEventListener('click', () =>getImageOfTheDay_eventlistener(date));
    searchHistory.appendChild(listItem);

  }
  
  function addSearchToHistory() {
    let searches = localStorage.getItem('searches');
    if (searches) {
      searches = JSON.parse(searches);
      const searchHistory = document.getElementById('search-history');
      searchHistory.innerHTML = '';
  
      searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => getImageOfTheDay_eventlistener(date));
        searchHistory.appendChild(listItem);
      });
    }
  }
  
  function displayImage(url,info,title) {
    const currentImageContainer = document.getElementById('current-image-container');
    currentImageContainer.innerHTML = 
    `<img src="${url}" alt="NASA Picture of the Day">
    <p class="title">${title}</p> 
    <p class="info">${info}</p>`;
  }
  
  function displayErrorMessage(message) {
    const currentImageContainer = document.getElementById('current-image-container');
    currentImageContainer.innerHTML = `<p class="error">${message}</p>`;
  }
  

