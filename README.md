# Points in Polygons on a Map
A tool for clipping points on a map with polygons.
#### To Run
```
npm install
npm start
```
#### To Use
Navigate to http://localhost:3000 in a modern browser.

You will be prompted for a Google Maps Api Key.  If you do not have one you can learn more about
getting one here: https://developers.google.com/maps/documentation/javascript/get-api-key.
If you would like to change the key you entered later, click the "API Key" button in the controls at
the top of the page.

You can load points from either a json file or a pogom mysql, mariadb, or sqlite database.
To do so, click on the "Load Points" control.  This will bring up a menu.  Clicking the "Load from
File" button will let you select a json file to load.  Filling out the form and clicking the "Load
from DB" button will pull point information from the database specified.

You can draw polygons on the map with the very small and hard to see drawing controls located at the
top center of your map.  Click the polygon and then begin drawing on the map.  Sometimes the google
maps api makes it difficult to begin drawing a polygon.  I have found that double clicking helps.

Once you have a polygon, you can switch out of polygon mode by clicking on the hand tool next to the
polygon tool.  Now, if you click on the polygon your browser should download a json file containing
only the points that exist within that polygon.  If you have your browser set to automatically
download then you will find a clipped-points.json file in your default download path.

#### Configuration
Configuration is handled through npm.  From the command line set npm config with:
```
npm config set pipoam:<parameter> <value>
```
Available config parameters:
```
port - The port on which your local server will run.
```
#### To Develop
I have created an npm task to launch the server with html, css, and js watchers for easier
devloping.  Note, there is no hot loading so you will still have to refresh after a change.
```
npm install
npm run start-dev
```

#### To Do
Between work and family, I don't have as much time as I would like to improve and maintain this
project, but I would like to eventually get around to:
* Tests
* Style/Contributing guides
* Server-side DB Integrations
* Improved frontend styling
* Replace alert and prompt
* Save polygons
* Cleanup Code
* More documentation
* Lots more...
#### Contributing
I will gladly look into your pull requests.  While I would eventually like to impose style guidelines, there are none written in stone as of yet.  That being said, at minimum pull requests should include jsdoc style comments and frontend code performing asynchronous tasks should do so with es2015 style promises rather than callbacks.
