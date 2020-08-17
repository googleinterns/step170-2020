/* Fetches data from database through web servlets.
   UpdateLinks is a function used to update the data of that activity. And the data is retrieved using this servlet's fetch request to './servlet-url' (dataLink) */
import { tempData } from '../test.js';

const updateActivityLinks = (updateLinks, servlet) => {
  fetch(servlet)
  .then((resp) => resp.json())
  .then(data => { 
    // Modify the links that have the data according to the activity (the servlet that is called).
    updateLinks(data);
  }).catch(err => {
    if (err == "SyntaxError: Unexpected token < in JSON at position 0") updateLinks(tempData);
    console.log('err', err);
  });
}

export default updateActivityLinks;
