/** This hook filters the activities displayed on the browse page. */

// This calls the appropriate filter based on activityType, or does nothing if no filter is set. 
const filterActivities = (links, activityType, linkFilters, updateFilteredLinks) => {
  if (Object.keys(linkFilters).length === 0)
    updateFilteredLinks(links);
  else
    updateFilteredLinks(links.filter(link =>
      {
        switch (activityType) {
          case "games":
            filterGames(link, linkFilters);
            break;
          case "articles":
            filterArticles(link, linkFilters);
            break;
          case "videos":
            filterVideos(link, linkFilters);
            break; 
          default:
            console.log('err', "ERROR: INVALID ACTIVITY TYPE!");
        }
      }
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
    
    return (min === 0 && max === 0) ||                 // If there are no restrictions on the number of players
        (min === 0 && max >= input) ||              // If no restriciton on minPlayer, but there is a max limit satisfied
        (max === 0 && min <= input) ||              // If no restriction on maxPLayer, but minimum limit is satisfied
        (min <= input && max >= input);         // If both are non-zero, and the game players are within limit. 
    
    // Otherwise don't return. 
}

/** Todo: filter list of articles. */
const filterArticles = (article, filters) => {}

/** Todo: filter list of videos. */
const filterVideos = (video, filters) => {}

export default filterActivities;
