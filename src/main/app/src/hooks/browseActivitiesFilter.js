/** This hook filters the activities displayed on the browse page. */
const filterActivities = (links, activityType, linkFilters, updateFilteredLinks) => {
  if (Object.keys(linkFilters).length === 0)
    updateFilteredLinks(links);
  else
    updateFilteredLinks(links.filter(link =>
      activityType === "games" ? filterGames(link, linkFilters) :
      activityType === "articles" ? filterArticles(link, linkFilters) :
      filterVideos(link, linkFilters)
    ));
}

/** Todo: filter list of games. */
const filterGames = (game, filters) => {
  
}

/** Todo: filter list of articles. */
const filterArticles = (article, filters) => {}

/** Todo: filter list of videos. */
const filterVideos = (video, filters) => {}
