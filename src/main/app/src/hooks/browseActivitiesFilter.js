/** This hook filters the activities displayed on the browse page. */

// This calls the appropriate filter based on activityType, or does nothing if no filter is set. 
const filterActivities = (links, activityType, linkFilters, updateFilteredLinks) => {
  if (Object.keys(linkFilters).length === 0)
    updateFilteredLinks(links);
  else
    updateFilteredLinks(links.filter(link =>
      activityType === "games" ? filterGames(link, linkFilters) :
      activityType === "reading" ? filterArticles(link, linkFilters) :
      filterVideos(link, linkFilters)
    ));
}

/** 
  This function takes in the game and filters, and checks if it satisfies the user entered number. 
  This function is called using Javascript's filter function.
*/
const filterGames = (game, filters) => {
  var input = parseInt(filters.numOfPlayers,10);
    var min = parseInt(game.minPlayer,10);
    var max = parseInt(game.maxPlayer,10);
    
    if( (min === 0 && max === 0) ||                 // If there are no restrictions on the number of players
        (min === 0 && max >= input) ||              // If no restriciton on minPlayer, but there is a max limit satisfied
        (max === 0 && min <= input) ||              // If no restriction on maxPLayer, but minimum limit is satisfied
        (min <= input && max >= input)  ) {         // If both are non-zero, and the game players are within limit. 
      return true;
    } 
    else
      return false;
    // Otherwise don't return. 
}

/** Filter list of articles. */
const filterArticles = (article, filters) => {
  return filters.articleType === '*' || article.type === filters.articleType;
}

/** Filter list of videos. */
const filterVideos = (video, filters) => {
  return filters.videoType === '*' || video.type === filters.videoType;
}

export default filterActivities;
