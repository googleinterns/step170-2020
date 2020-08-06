// This is a component used to fetch data from a servlet given the servlet link and the function that matches the activity to the servlet url.
// UpdateLinks is a function used to update the data of that activity. And the data is retrieved using this servlet's fetch request to './servlet-url' (dataLink)
const updateActivityLinks = (updateLinks, dataLink) => {
   fetch(dataLink)          // getch the dataservlet
    .then((resp) => resp.json())  
    .then(data => { 
      updateLinks(data);    // modify the links that have the data according to the activity (the servlet that is called).
    }).catch(err => {
      console.log('err', err);
    });
}

export default updateActivityLinks;
