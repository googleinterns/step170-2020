/* Fetches data from database through web servlets.*/
const updateActivityLinks = (updateLinks, servlet) => {
   fetch(servlet)
    .then((resp) => resp.json())
    .then(data => { 
      updateLinks(data);
    }).catch(err => {
      console.log('err', err);
    });
}

export default updateActivityLinks;
