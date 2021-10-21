IDEAS:
- have all the images load on top of each other and fix their height and width at least for the container. give them a z-index when assigning them.
    - they should transition through layers

- We will need to write in some logic in the case that something does not have an image


# Requirements/User Experience

#### Page should load with

* Some sort of title
* A short description telling the user what to do
* A blank text field
* A Button ("start" or "go" or "search")

#### When the user enters a search term and presses enter

* The form / title / description should hide
* Show a loading message (optional)
* Fetch related posts from reddit (with `fetch`)
* Display animation / slideshow of images (with DOM manipulation)
* Show a button to stop / reset the animation
* Repeat animation until use clicks "stop"

#### When the user clicks the "stop" button

* Animation stops / images are removed
* Form / title / description are shown again
* User can enter a new search term


## Suggested proccess

It is important to break down any development project in to smaller pieces and tackle them one at a time. Here is a list of how you might want to attack this project.

* Create your form (HTML/CSS)
* Prevent default form submission and verify that you can type something into the form
* Use AJAX to make a request. Show data in console
* Create an array of image URLs (tip: use [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)).
* Make the form / title / description hide
* Cycle through images
    * tip: use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)
    * Either add images, or change the `src` of a single image tag
* Add some interesting style / animation
* Create button to stop animation (tip: use [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)).

## Example Deliverables