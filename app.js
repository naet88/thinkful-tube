var APIkey = 'AIzaSyDsnurZrsJ6dGkUmbgkq5-Ob6E5MjuLNGw';
// var yturl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=selena+gomez&key=AIzaSyDsnurZrsJ6dGkUmbgkq5-Ob6E5MjuLNGw';
var YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, pageToken, callback) {
  var query = {
    q: searchTerm,
    type: 'video',
    part: 'snippet',
    key: APIkey,
    maxResults: 5,
    pageToken: pageToken,
  }
   
  $.getJSON(YT_BASE_URL, query, callback);
}

//the state before app launches. 

var state = {
  userQuery: '',
  page: 'search',
  nextPageToken: '',
}

//state modification functions 

function updatePage(state, pageName) {
  state.page = pageName;
}

function updateUserQuery(state, query) {
  state.userQuery = query;
}

//render functions

function renderSearchPage(state, element) {
  $(element).find('.js-results-page').hide();
  $(element).find('.js-search-page').show();
}

function renderResultsPage(state, element) {
  $(element).find('.js-results-page').show();
}

//Functions that modify the state
//build URLs

//this function is specialized to manipulate item by item (building blocks)
function buildWatchVideoURL(item) {

  //need this. because if you don't return this variable, the variable dies b/c this variable lives in the scope of this function only. 
  return 'https://www.youtube.com/watch?v=' + item.id.videoId;
}

function buildChannelURL(item) {  
  return 'https://www.youtube.com/channel/' + item.snippet.channelId;
}

function nextPage(token) {
  return state.nextPageToken = token;
}


//DOM Rendering 

//this function's responsibility is to solely manipualate the results as a whole. 

function traverseJSON(results) {
  
  var imgThumbnailURL = '';
  var videoId = '';
  var channelUser = '';
  var htmlObject = ''; 

  results.items.forEach(function(item) {

    var watchVideoURL = buildWatchVideoURL(item);
    var channelURL = buildChannelURL(item);

    imgThumbnailURL = item.snippet.thumbnails.medium.url;

    htmlObject += '<li class="results-list"><a href="' + watchVideoURL + '" target="_blank"><img src="' + imgThumbnailURL + '"></a></li>' + '<div class="more-channels"><a href="'+ channelURL + '" target="_blank">Find more videos from this channel </a></div>' ; 
  });

  //html() "clears" everything. 
  //append() works too. 

  $('.js-thumbnail-list').html(htmlObject);

}

//event listener

renderSearchPage(state, '.js-main');


$('form').on('submit', function(event) {
  event.preventDefault();

  //simply changes the state. 
  updatePage(state, 'results');

  var userQuery = $(this).find('.js-query').val();

  updateUserQuery(state, userQuery);
  
  renderResultsPage(state, '.js-main');  

  getDataFromApi(userQuery, '', traverseJSON);
});


$('button.js-next-page').on('click', function(event) {
  event.preventDefault();

  getDataFromApi(state.userQuery, state.nextPageToken, traverseJSON);
})






