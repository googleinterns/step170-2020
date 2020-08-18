/* Fetches data from database through web servlets.
   UpdateLinks is a function used to update the data of that activity. And the data is retrieved using this servlet's fetch request to './servlet-url' (dataLink) */
import {testData} from '../test';

const updateActivityLinks = (updateLinks, servlet) => {
  fetch(servlet)
  .then((resp) => resp.json())
  .then(data => { 
    // Modify the links that have the data according to the activity (the servlet that is called).
    updateLinks(data);
  }).catch(err => {
    console.log('err', err);
  });
}

export default updateActivityLinks;
