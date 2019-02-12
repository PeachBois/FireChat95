[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![GitHub version](https://badge.fury.io/gh/boennemann%2Fbadges.svg)](https://github.com/PeachBois/ByTheWay)


## FireChat95

FireChat95 is a homage to AOL, MSN, and other chat clients of the late 90's and early 00's with a geospacial twist. Using navigator, a tool built in to all modern browsers, coordinates are grabbed client side and never transmitted, but instead used to generate geohash data with the bounds represented by the google maps api. This data is used to connect clients together, and by utiliing Firebase's real time database, chat at a near instantaneous rate, and without server-side interatction. 

As an added twist we've made modern intergrations to make the communication aspect a bit more fun. This is done with the Giphy api and with FirebaseUI, to integrate gif support and automatic profile photos, respectively. 

Our room creation alogorythm is built as to scale indefinitley and database cleanup to happen client side. Along with defined write rules for firebase, our data stays intensely light weight and the minimal user data is mopped up after just a few minutes.


[![Winnie](https://fir-exploration-deee2.firebaseapp.com/favicon.ico)](https://firechat95.com)
