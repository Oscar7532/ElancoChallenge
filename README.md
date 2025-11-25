# Elanco Challenge

## Project outline
### Brief description
The application visualises reported tick sightings across the UK, enabling users to access detailed information for each report. It also offers guidance on tick identification and prevention for users to read.
This allows users to educate themselves about ticks and identify potential high-risk areas across the UK, helping them raise their awareness of the issue.
### Core Features
Core features of the application include
* An interactive map that dynamically displays colour-coded markers for reported sightings of ticks
* Detail Pop-ups when the user clicks on a report to display the detailed information regarding that report
* Quick action buttons, such as the Share and Directions buttons, could be used to access information quickly.
* The prominent Navigation bar is always displayed to allow for easy switching between all three pages.
  *Information page that contains not only prevention tips for ticks but also notes on identifying specific species.
### Technical choices
I used a combination of different tools to create the project for various reasons. Here are a few of them listed:
* React, I choose react mostly due to It’s modularity with reusable components, allowing me to reuse sections like the header and navigation panel instead of having to re-write these for each page, Additionally I chose React due to Its greater efficiency allowing me to run it on my laptop without struggling as much, but also It’s community built around it, as I knew I would be experimenting and learning on the fly. Hence, it was beneficial to have plenty of online resources to work with. Lastly, I chose React because I wanted to learn something new and had never used it before.
* React Leaflet, I decided for my map to use Leaflet due to its extremely user-friendly nature, but also due to its ability to be used for any region of the world and not be locked down to a specific area, and lastly, after installation, the process of adding points to the map was straightforward
* SWR, I use SWR firstly because it was integrated into React so that it could be utilised and imported easily, but secondly because it allowed me to handle loading better when waiting for data to be fetched, using the loading flag to signal to other parts of the application to stay instead of continuing to execute, which allowed me to simplify my code.
* Hardcoded locations, during the project, I decided to hardcode my town locations due to the minimum viable product approach for this application. I originally wanted to use an API to determine the locations' coordinates; however, there were limitations to how it could be run that would’ve made it much more challenging to implement and would've put it outside the scope of the minimum viable product approach.

### Key actions/choices made during the project
* When creating the conversions for the coordinates for the sighting locations, I noticed that if they were to be placed on the map, then all the markers would cover the others, so to prevent this, I added a random offset that would shift the markers around the location slightly to prevent them from covering the other markers
* When trying to access the location data of the tick reports, I found that if any of the location names were misspelt, even when I was using an API to convert them, the entire map would crash, preventing any of the results from being displayed. To remedy this, I decided to include a default value that would overwrite any missing coordinates with the centre of the UK, so that the reports are still preserved, and the majority of the data is still presented correctly.

### Limitations and Improvements
* One limitation of how the reports are currently shown is that there is no way to easily compare the populations of different types of ticks against each other. An improvement I would have liked to have made would have been to cluster species at the exact location together and display a count for each of those species
* Another improvement I would like to have added would have been accessibility features built into the web application (i.e. a screen reader or contrast controls), as at the moment the interface is not designed to accommodate any disabilities and might cause some users to struggle to use the web application effectively.
* Unfortunately, due to unexpected issues, including my internet going down and an injury preventing me from finding another workspace, I was unable to finish all the core requirements, specifically the sighting reporting, so an improvement I would like to make if I had more time would be to implement these systems into the application to allow users to report their own sightings and have the sightings stored in a database after being fetched.

## Instructions
1. Install Node.js
    * Download Node.js from: https://nodejs.org/en/download
    * Run the installation program and follow the instructions
2. Start Vite App
    * open a new command line in the `ElancoTickTracker` directory
    * run: `npm install`
    * run: `npm run dev`
    * Either copy and paste the URL or click/ctrl+click the link