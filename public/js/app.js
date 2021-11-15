
document.addEventListener('DOMContentLoaded', () => {
  var weatherForm = document.getElementById('weatherForm');
  var button = document.getElementById('searchButton');
  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var search = document.getElementById('searchInput').value;
    getData(search);
  });
});

var getData = (address = 'Karlskoga') => {
  var loadingParagraph = document.getElementById('loading');
  loadingParagraph.innerHTML = 'Loading...';
  var responseParagraph = document.getElementById('response');
  var a = fetch('http://localhost:3000/weather?location='+address).then( (response) => {
    response.json().then( (data) => {
      if (data.error) {
        responseParagraph.innerHTML = data.error;
        loadingParagraph.innerHTML = '';
      }
      else {
        responseParagraph.innerHTML = data.forecast;
        loadingParagraph.innerHTML = data.location;
      }
    })
  });
}