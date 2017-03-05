var APIkey = 'AIzaSyDsnurZrsJ6dGkUmbgkq5-Ob6E5MjuLNGw';
// var yturl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=selena+gomez&key=AIzaSyDsnurZrsJ6dGkUmbgkq5-Ob6E5MjuLNGw';
var YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm) {
  var query = {
    q: searchTerm,
    type: 'video',
    part: 'snippet',
    key: APIkey,
    maxResults: 5,
  }
  $.getJSON(YT_BASE_URL, query, traverseJSON);
}


function traverseJSON(results) {
  var YT_watch_vid_URL = 'https://www.youtube.com/watch?v=';
  var YT_channel_URL = 'https://www.youtube.com/channel/'
  var thumbnailObject = '';
  var videoId = '';
  var channelUser = '';
  var index = 0
  var htmlObject = ''; 
  var nextPage = results.nextPageToken;
  // console.log(nextPage);

    results.items.forEach(function(item) {

    
    resultsVideoURL = YT_watch_vid_URL + item.id.videoId;

    thumbnailObject = item.snippet.thumbnails.medium.url;

    channelURL= YT_channel_URL + item.snippet.channelId;
  
    htmlObject += '<li class="results-list"><a href="' + resultsVideoURL + '" target="_blank"><img src="' + thumbnailObject + '"></a></li>' + '<div class="more-channels"><a href="'+ channelURL + '" target="_blank">Find more videos from this channel </a></div>' ;

    // console.log(htmlObject);
    
  });

  $('.js-search-results').html(htmlObject);

}

//event listener

$('form').on('submit', function(event) {
  event.preventDefault();
  var userQuery = $(this).find('.js-query').val();

  getDataFromApi(userQuery);
});






