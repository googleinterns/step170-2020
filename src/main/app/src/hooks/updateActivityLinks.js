const updateActivityLinks = (updateLinks, dataLink) => {
   fetch(dataLink)
    .then((resp) => resp.json())
    .then(data => { 
      updateLinks(data);
    }).catch(err => {
      console.log('err', err);
    });
}

export default updateActivityLinks;
