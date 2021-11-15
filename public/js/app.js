
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
  var icon = document.getElementById('icon');
  var a = fetch('/weather?location='+address).then( (response) => {
    response.json().then( (data) => {
      if (data.error) {
        responseParagraph.innerHTML = data.error;
        loadingParagraph.innerHTML = '';
      }
      else {
        icon.src = data.icon;
        responseParagraph.innerHTML = data.forecast;
        loadingParagraph.innerHTML = data.location;
        var iconTexts = document.getElementsByClassName('small-text');
        for (let i = 0; i < iconTexts.length; i++) {
          if (iconTexts[i].classList.contains('hidden')) {
            iconTexts[i].classList.remove('hidden');
          }
        }
      }
    })
  });
}