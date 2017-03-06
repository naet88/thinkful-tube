var APIkey = 'AIzaSyDsnurZrsJ6dGkUmbgkq5-Ob6E5MjuLNGw';
// var yturl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=selena+gomez&key=AIzaSyDsnurZrsJ6dGkUmbgkq5-Ob6E5MjuLNGw';
var YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm,
    type: 'video',
    part: 'snippet',
    key: APIkey,
    maxResults: 5,
  }
  
  $.getJSON(YT_BASE_URL, query, callback);
}

//build URLs

//NOTES TO ERIC: 
//Originally, I wasn't 100% sure how to access the API call results from a user's query in 
//a function OUTSIDE the "traverseJSON" function. I guess this is how you'd do it? 
//But, this doesn't actually work at all. 

//this function is specialized to manipulate item by item (building blocks)
function buildWatchVideoURL(item) {

  // With regards to the q= part, it is much better practice to use a function to construct 
  // URL queries. Why? Because encoding of certain characters must be taken care of. Turns out, 
  // jQuery provides a great way to build them, namely the jQuery.param function.
  //^^^^^Unsure what the above means; there's no hardcoded q here. All Video URLs on Youtube will 
  //look like this: https://www.youtube.com/watch?v=[id here], so it doesn't need a function to 
  //construt a URL query, does it? 


  var YT_watch_vid_URL = 'https://www.youtube.com/watch?v=';
  var resultsVideoURL = '';
  
  resultsVideoURL = YT_watch_vid_URL + item.id.videoId;
  
  //need this. because if you don't return this variable, the variable dies b/c this variable lives in the scope of this function only. 
  return resultsVideoURL;
}

function buildChannelURL(item) {
  var YT_channel_URL = 'https://www.youtube.com/channel/'
  var channelURL = '';
  
  channelURL= YT_channel_URL + item.snippet.channelId;
  
  return channelURL;
}

//why cant I do this:  traverseJSON(results, element)
//this function's responsibility is to solely manipualate the results as a whole. 

function traverseJSON(results) {
  
  var imgThumbnailURL = '';
  var videoId = '';
  var channelUser = '';
  var htmlObject = ''; 
  var nextPage = results.nextPageToken;

  results.items.forEach(function(item) {

    var watchVideoURL = buildWatchVideoURL(item);
    var channelURL = buildChannelURL(item);
    imgThumbnailURL = item.snippet.thumbnails.medium.url;

    htmlObject += '<li class="results-list"><a href="' + watchVideoURL + '" target="_blank"><img src="' + imgThumbnailURL + '"></a></li>' + '<div class="more-channels"><a href="'+ channelURL + '" target="_blank">Find more videos from this channel </a></div>' ; 
  });

  $('.js-search-results').html(htmlObject);

}

//event listener

$('form').on('submit', function(event) {
  event.preventDefault();
  
  var userQuery = $(this).find('.js-query').val();

  //why cant I do this:  traverseJSON(searchTerm, '.js-search-results')
  getDataFromApi(userQuery, traverseJSON);


});






