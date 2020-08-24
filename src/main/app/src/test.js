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
  {"id": "5712818124881920",	"creator": "Cherlynn Low", "type": "tech", "description":	"Samsung has made many, many smartwatches. And through all that experience the company has refined its Tizen software so much that it has completely ditched Google’s Wear OS. The Galaxy Watch 3 is the latest effort to keep up with reigning smartwatch",	"publishedAt": "2020-08-14T14:00:51Z", "publisher":	"Engadget", 
  "length": "1232", "title":	"Galaxy Watch 3 review: The best non-Apple smartwatch", "url": "https://www.engadget.com/samsung-galaxy-watch-3-review-specs-bezel-ecg-trip-detection-140051465.html"},
  {"id": "5725698161377280",	"creator": "Nicole Gallucci", "type": "social", "description": "August 8 is International Female Orgasm Day, and we're celebrating with an entire week dedicated to exploring the business and pleasure of porn. Most people understandably associate the word 'porn' with sexually explicit, super NSFW material. But no",	"publishedAt": "2020-08-14T22:00:00Z", "publisher":	"Mashable", 
  "length": "4023", "title":	"The best porn alternatives that are entirely SFW", "url":	"https://mashable.com/article/best-safe-for-work-porn/"},
  {"id": "5749929888710656",	"creator": "Beth Skwarecki", "type": "meditation", "description": "on Vitals, shared by Beth Skwarecki to Lifehacker	Meditation has known benefits, both research-backed and anecdotal. But few things in this life work for everybody, and there’s reason to believe that meditation may make some people’s mental health worse. If that’s you, I hereby give you permission t",	"publishedAt": "2020-08-17T18:00:00Z", 
  "length": "7332", "publisher":	"Lifehacker.com", "title":	"Mindfulness Meditation Isn't For Everyone", "url": "https://vitals.lifehacker.com/mindfulness-medita"}
];

export {gameTempData, videoTempData, articleTempData}
