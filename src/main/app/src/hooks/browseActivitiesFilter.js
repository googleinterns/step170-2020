/** This hook filters the activities displayed on the browse page. */

// This calls the appropriate filter based on activityType, or does nothing if no filter is set. 
const filterActivities = (links, activityType, activityTypes, linkFilters, updateFilteredLinks) => {
  if (Object.keys(linkFilters).length === 0)
    updateFilteredLinks(links);
  else {
    switch(activityType) {
      case activityTypes.GAMES:
        updateFilteredLinks(links.filter(link => filterGames(link, linkFilters)));
        break;
      case activityTypes.VIDEOS:
        updateFilteredLinks(links.filter(link => filterVideos(link, linkFilters)));
        break;
      case activityTypes.ARTICLES:
        updateFilteredLinks(links.filter(link => filterArticles(link, linkFilters)));
        break;
      default:
        console.log("Error: Invalid activity type selection.");
    }
  }
}

/** 
  This function takes in the game and filters, and checks if it satisfies the user entered number. 
  This function is called using Javascript's filter function.
*/
const filterGames = (game, filters) => {
  var input = parseInt(filters.numOfPlayers,10);
  var min = parseInt(game.minPlayer,10);
  var max = parseInt(game.maxPlayer,10);
  
  return (min === 0 && max === 0) ||                  // If there are no restrictions on the number of players
    (min === 0 && max >= input) ||                    // If no restriciton on minPlayer, but there is a max limit satisfied
    (max === 0 && min <= input) ||                    // If no restriction on maxPLayer, but minimum limit is satisfied
    (min <= input && max >= input);                   // If both are non-zero, and the game players are within limit. 
  
  // Otherwise don't return. 
}

/** Filter list of articles. */
const filterArticles = (article, filters) => {
   let isWithArticleLength;
  // Get second equivilent of article lengths (short, medium, or long).
  switch(filters.articleLength) {
    case "*":
      isWithArticleLength = length => true;
      break;
    case "short":
      isWithArticleLength = length => length >= 0 && length <= 2000;
      break;
    case "medium":
      isWithArticleLength = length => length > 2000 && length <= 6000;
      break;
    case "long":
      isWithArticleLength = length => length > 6000;
      break;
    default:
      console.log("Article length not recognized.");
  }

  // Filter by article type and length
  return (filters.articleType === "*" || filters.articleType === article.type)
    && isWithArticleLength(Number(article.length));
}

/** 
  Filter list of videos.
  Short videos duration  -  [0,900]
  Medium length videos - [901,1800]
  Large length videos- (>=1801)
*/
const filterVideos = (video, filters) => {
  var input = filters.videoLength; 
  var duration = parseInt(video.duration);  
  
  if("short".localeCompare(input) === 0 ) {     
    return (duration >= 0 && duration <= 900);
  }
  else if("medium".localeCompare(input) === 0 ) {
    return (duration >= 901 && duration <= 1800);
  }
  else if("large".localeCompare(input) === 0) {
    return (duration>=1801);     
  }
}

export default filterActivities;
