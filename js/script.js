const searchForm = document.getElementById('searchForm');
const searchInput = document.querySelector('.searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const btn = document.getElementById('btn');

document.addEventListener('DOMContentLoaded', () => {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const search = searchInput.value;

    if (search == '') {
      // Show message
      message('Your search is invalid. Please try again 🥷', 'alert-danger text-center fs-5');
    }

    searchRed(searchInput.value).then((results) => {
      let output = '<div class="row g-5">';
      results.forEach((result) => {
        // Check for image
        let images = result.preview
          ? result.preview.images[0].source.url
          : 'https://memegenerator.net/img/images/15054321.jpg';
        output += `
          <div class="card me-5" style="width: 18rem;">
          <img class="card-img-top" src="${images}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
          </div>
        </div>
        
          `;
      });
      output += '</div>';
      searchResults.innerHTML = output;
    });
  });
});

// Message Function
function message(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('searchContainer');
  // Get form
  const searchForm = document.getElementById('searchForm');

  // Insert alert
  searchContainer.insertBefore(div, searchForm);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

const searchRed = async function (searchInput) {
  return fetch(`http://www.reddit.com/search.json?q=${searchInput}&limit=4`)
    .then((res) => res.json())
    .then((data) => {
      return data.data.children.map((data) => data.data);
    })
    .catch((err) => console.log(err));
};
function clearSearch() {
  document.querySelector('searchForm').value = '';
}
