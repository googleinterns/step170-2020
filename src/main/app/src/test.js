const gameTempData = [
  {"description":"-","notes":"Advantage to have a mouse.","minPlayer":"0","maxPlayer":"12","key":"5173737586425856","title":"Pictionary","category":"GAMES","url":"https://skribbl.io/"},
  {"description":"-","notes":"-","minPlayer":"0","maxPlayer":"10","key":"5644784165191680","title":"Coup","category":"GAMES","url":"http://coup.thebrown.net/"},
  {"description":"-","notes":"Reconfirm means it\u0027s just waiting for all players to input their answer.","minPlayer":"5","maxPlayer":"0","key":"5673334758965248","title":"Pictionary Telephone","category":"GAMES","url":"http://chalkchain.appspot.com/"},
  {"description":"-","notes":"Score resets when page is reloaded, but puzzle will stay active for days.","minPlayer":"0","maxPlayer":"0","key":"5702744841125888","title":"Jigsaw Puzzle","category":"GAMES","url":"https://jigsawpuzzles.io/"},
  {"description":"-","notes":"No functionality to vote on a spy, all just verbal.","minPlayer":"0","maxPlayer":"10","key":"5710735065743360","title":"Spyfall","category":"GAMES","url":"https://www.spyfall.app/"},
  {"description":"-","notes":"Easy to accidenrally cheat. Make sure each player knows and selects their role before the game is started. Have each team designate a single clicker.","minPlayer":"4","maxPlayer":"0","key":"5742856555724800","title":"Code names","category":"GAMES","url":"https://www.horsepaste.com/"}
];

const videoTempData = [
  {"id": "5101015804149760", "creator": "Fit Tuber","duration":"1199",	"publishedAt": "2020-03-20T13:30:06Z", "title":	"15 Min Daily Yoga Routine for Beginners (Follow Along)","url":	"https://www.youtube.com/watch?v=s2NQhpFGIOg","videoCategory":"yoga"},	
  {"id": "5647930295844864", "creator": "645AR","duration":"1200","publishedAt": "2020-04-03T04:00:16Z", "title":	"645AR - Meditation (Official Audio)", "url":	"https://www.youtube.com/watch?v=uvSuYh1esmg","videoCategory":"meditation"},	
  {"id": "5116357293113344", "creator": "Taarak Mehta Ka Ooltah Chashmah","duration":"360",	"publishedAt": "2020-08-13T15:45:00Z", "title":	"NEW! Ep 2970 - Babita Teaches Jethalal Yoga! | Taarak Mehta Ka Ooltah Chashmah Comedy | तारक मेहता", "url":	"https://www.youtube.com/watch?v=g7BCb8vLA6c","videoCategory":"yoga"},
  {"id": "5688142262697984", "creator":	"yoga flocke - body art", "duration":"293", "publishedAt":	"2019-05-12T20:48:07Z", "title": 	"Ashtanga Workout - working the hip (leg behind the head)", "url":	"https://www.youtube.com/watch?v=wAfPba4NtzE","videoCategory":"workout"},	
  {"id": "5646113927331840", "creator":	"Xuan Lan Yoga","duration":"1462", "publishedAt":	"2019-06-20T18:00:05Z", "title": 	"Tu Primera Clase de Meditation (Nivel principiante)", "url":	"https://www.youtube.com/watch?v=WamU36hXiNw","videoCategory":"meditation"},	
  {"id": "5928667746140160", "creator":	"Yoga With Adriene","duration":"934", "publishedAt":	"2018-09-16T08:00:03Z", "title": 	"Sunrise Yoga - 15 Min Morning Yoga Practice - Yoga With Adriene", "url":	"https://www.youtube.com/watch?v=r7xsYgTeM2Q","videoCategory":"yoga"},	
  {"id": "5083571056279552", "creator":	"Yoga with Kassandra","duration":"1656", "publishedAt":	"2018-09-20T11:47:56Z", "title": 	"10 min Morning Workout Full Body Stretch", "url":	"https://www.youtube.com/watch?v=4pKly2JojMw","videoCategory":"workout"},
  {"id": "4908504900960256", "creator":	"Yoga With Adriene","duration":"2326", "publishedAt":	"2013-01-23T16:01:07Z", "title": 	"Yoga For Weight Loss  |  Fat Burning Workout  |  Yoga With Adriene", "url":	"https://www.youtube.com/watch?v=Ci3na6ThUJc","videoCategory":"yoga"}
];

const articleTempData = [
  {"publisher":"The Verge","author":"Casey Newton","description":"At Facebook’s scale, it’s not hard for a dangerous piece of misinformation to get 20 million views in a day. The company says the incident will be reviewed","publishedAt":"2020-07-29T10:00:00Z","articleCategory":"cooking","length":16427,
  "key":"ag5zfnN0ZXAxNzAtMjAyMHIUCxIHQXJ0aWNsZRiAgID4mPqjCAw","title":"How another video of COVID-19 misinformation went viral on Facebook","category":"ARTICLES","url":"https://www.theverge.com/interface/2020/7/29/21345138/facebook-viral-hydroxychloroquine-video-removal-trump-junior-stella-immanuel"},
  {"publisher":"Gizmodo.com","author":"George Dvorsky","description":"Elon Musk is set to make an announcement about Neuralink, a company designing brain-computer interface technology, on Friday, August 28. It sounds like science fiction, but research in this area has progressed rapidly in recent years, though we’re still far f…","publishedAt":"2020-08-24T19:32:00Z","articleCategory":"fiction","length":11536,
  "key":"ag5zfnN0ZXAxNzAtMjAyMHIUCxIHQXJ0aWNsZRiAgIDY7KfBCAw","title":"What to Know About Neuralink, Elon Musk’s Brain-Computer Interface Project","category":"ARTICLES","url":"https://gizmodo.com/what-to-know-about-neuralink-elon-musk-s-brain-compute-1844751895"},
  {"publisher":"Gizmodo.com","author":"Alyse Stanley","description":"Screw batteries and charging cables—2020 has been such a rough year that even the robots are turning to drink.Read more...","publishedAt":"2020-08-22T20:43:00Z","articleCategory":"meditation","length":1877,
  "key":"ag5zfnN0ZXAxNzAtMjAyMHIUCxIHQXJ0aWNsZRiAgICE6MrDCAw","title":"This Tiny Robo-Beetle Is Powered by Booze","category":"ARTICLES","url":"https://gizmodo.com/this-tiny-robo-beetle-is-powered-by-booze-1844814803"},
  {"publisher":"TechCrunch","author":"Connie Loizos","description":"Earlier today, Facebook said it has removed hundreds of QAnon groups from its site, and that it’s restricting many  more groups, along with hundreds of pages, and more than 10,000 Instagram accounts. As the New York Times observed in its report about the mane…","publishedAt":"2020-08-20T07:13:17Z","articleCategory":"fiction","length":3908,
  "key":"ag5zfnN0ZXAxNzAtMjAyMHIUCxIHQXJ0aWNsZRiAgIC45PreCAw","title":"Author and professional poker player Annie Duke on how conspiracy theories gain ground","category":"ARTICLES","url":"http://techcrunch.com/2020/08/20/author-and-professional-poker-player-annie-duke-on-how-conspiracy-theories-gain-ground/"}
];

export {gameTempData, videoTempData, articleTempData}
