// 1. Initialize Firebase


  var config = {
    apiKey: "AIzaSyBB9CMtQaWkKJesUodOqmbY8gv86qA1EYs",
    authDomain: "js-class-3cb19.firebaseapp.com",
    databaseURL: "https://js-class-3cb19.firebaseio.com",
    projectId: "js-class-3cb19",
    storageBucket: "js-class-3cb19.appspot.com",
    messagingSenderId: "791686763958"
  };
  firebase.initializeApp(config);


// 2. connect to your Firebase application using your reference URL
var database = firebase.database();
  // by default a form submit reloads the DOM which will subsequently reload all our JS
  // to avoid this we preventDefault()

  // grab user's comment from input field

  // clear the user's comment from the input (for UX purposes)

  // create a section for comments data in your db

  // use the set method to save data to the comments

$('#comment-form').on('submit', function (e) {
  // prevent the page from reloading
  e.preventDefault();
  // grab user's comment from input field
  var userInput = $('#comment').val();
  // clear the user's comment from the input (for UX purposes)
  $('#comment').val('')
  // create a section for comments data in your db
  var commentsReference = database.ref('comments');
  // use the set method to save data to the comments
  commentsReference.push({
    comment: userInput,
    likes: 0
  });
});

// Step 1: Create a function that queries our database for comments
function getComments() {
  database.ref('comments').on('value', function (results) {
    var allComments = results.val();
    var comments = [];
    for (var item in allComments) {
      var context = {
        comment: allComments[item].comment,
        likes: allComments[item].likes,
        commentId: item
      };
      var source = $("#comment-template").html();
      var template = Handlebars.compile(source);
      var commentListElement = template(context);
      comments.push(commentListElement)
    }
    // remove all list items from DOM before appending list items
    $('.comments').empty()
    // append each comment to the list of comments in the DOM
    for (var i in comments) {
      $('.comments').append(comments[i])
    }
  });
}

// When page loads, call getComments function
getComments();

$('.comments').on('click', '.like', function (e) {

  // Get the ID from the parent of the like button we clicked on
  var id = $(e.target).parent().data('id');

  // find comment whose objectId is equal to the id we're searching with
  var commentReference = database.ref('comments/' + id);

  // Get number of likes from HTML
  var likes = $('#likes').html();

  // Convert likes to a number and add a like
  likes = parseInt(likes, 10) + 1;

  // Update likes property in database using Firebase's update() method.
  commentReference.update({
    likes: likes
  });

});

$('.comments').on('click', '.delete', function (e) {
  // Get the ID for the comment we want to update
  var id = $(e.target).parent().data('id')

  // find comment whose objectId is equal to the id we're searching with
  var commentReference = database.ref('comments/' + id)


  // Use remove method to remove the comment from the database
  commentReference.remove()
});



// 3. retrieve comments data when page loads nd when comments are added/updated

  // use reference to database to listen for changes in comments data

    // Get all comments stored in the results we received back from Firebase

    // Set an empty array where we can add new comment element

    // iterate (loop) through all comments coming from database call

      // Create an object literal with the data we'll pass to Handlebars

      // Get the HTML from our Handlebars comment template

      // Compile our Handlebars template

      // Pass the data for this comment (context) into the template

      // push newly created element to array of comments

    // remove all list items from DOM before appending list items

    // append each comment to the list of comments in the DOM



// 4). When page loads, get comments



// 5). Click event to delete comments

  // find comment whose objectId is equal to the id we're searching with



// 6). Click event to like comments

  // find comment whose objectId is equal to the id we're searching with

  // Get number of likes from HTML

  // Convert likes to a number and add a like

  // Update likes property in database


