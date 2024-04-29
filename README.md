# TravelBuddy - A Social Media Site for Travelers!
### Deployed [here:](https://travel-haircut.surge.sh) 


### What can you do on this site?
This site is for travel enthusiasts who want to share their travel photos with the world. Just upload your photos from your computer, add a caption, and boom! you have a new post, called a "trip". When you submit your trip, tags are generated for your photos using Artificial Intelligence. If your photo happens to contain a notable landmark, it will pick this up as well. The site also has a handy "hotel finder" feature, where you can find hotels based on your destination. 

### Features
- User signup and login. 
- Post creation and deletion.
- A main "feed" page that displays all posts.
- A user profile page for each user.
- AI-generated tags for each photo in a post.
- A hotel finder feature that uses an API.

### Tests
- To run all tests, `npm test`
- To run a single test, `npm test -- TEST_NAME`

### User Flow 
- Signup/login to the website
- Browse the posts of other users on the main feed page.
- If one post looks particularly interesting, click on it to see the full post.
- Make your own post: Click on "New Trip" in the Navbar. 
- Give your trip a title, upload photos from your computer. 
- Upon submission, see the tags that AI generated for your images.
- Need to find a hotel? Go to "Hotel Finder" in the navbar. 
- Enter the city in which you'd like to stay, as well as your arrival and departure dates. 
- The app will return to you a list of twenty-something hotels that are available!

### API
- My site uses two APIs. The [Google Cloud Vision](https://cloud.google.com/vision/docs) API and the [Booking COM](https://rapidapi.com/DataCrawler/api/booking-com15/) API. 
- Google Cloud Vision is used to generate the tags for uploaded images. I chose this API because it's free and relatively easy to use.
- The Booking.com API is used to find hotels. It isn't free, but it is easy to use and provides accurate results. The API can also be used to find flights, taxis, attractions, etc. 

### Tech Stack
- React for frontend
- Express for backend
- PostgreSQL for database
- AWS S3 for image storage
- bCrypt and JSON Web Tokens for authentication
- JSONSchema for validation
- Bootstrap for styling 

### Deployment
- The frontend is deployed using Surge, and the backend is deployed on Render.com.
- The database is hosted on ElephantSQL.

### Future Goals
Some features I'd like to implement in the future include:
- Searching for trips by title or tag
- Commenting on trips
- Ability to "like" a trip
- Improving styling
- Add more tests