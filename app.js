console.log('Loaded');

document.getElementById('photo-form').addEventListener('submit', function(e) {
	// Stop the default behavior of form submission/refresh
	e.preventDefault();

	// Grab values from the text boxes
	var searchQuery = document.getElementById('query').value;
	console.log('Clicked the form! Search for:', searchQuery);
});