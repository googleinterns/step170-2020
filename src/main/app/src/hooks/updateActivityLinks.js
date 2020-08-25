/* Fetches data from database through web servlets.
   UpdateLinks is a function used to update the data of that activity. And the data is retrieved using this servlet's fetch request to './servlet-url' (dataLink) */
import {gameTempData, articleTempData, videoTempData} from '../test.js';
const updateActivityLinks = (updateLinks, servlet) => {
  updateLinks(servlet === './gameData' ? gameTempData :
    servlet === './videoData' ? videoTempData : articleTempData);
  console.log(videoTempData);
  // fetch(servlet)
  // .then((resp) => resp.json())
  // .then(data => { 
  //   // Modify the links that have the data according to the activity (the servlet that is called).
  //   updateLinks(data);
  // }).catch(err => {
  //   console.log('err', err);
  // });
}

export default updateActivityLinks;
