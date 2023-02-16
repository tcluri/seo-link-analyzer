# Seo Link analyzer
Using javascript to gather all the links of a website and printing it to console in descending order.
## Setup
* Install [nvm](https://github.com/nvm-sh/nvm "nvm source") on your machine.
* After installing NVM, add an .nvmrc file to the root of your project directory that contains a snippet of text ```18.7.0``` as the first line.
* Install the node version using ```nvm install``` and then ```nvm use``` to use the right version of node.
* Check the node version by ```node --version``` on your commandline to get ```v18.7.0```
## Running the crawler
* After setting up, to run the crawler on a particular site just enter the website url after ```npm start <website-url>``` and let the crawler loose.
* The crawler will print the report with frequency of each link and the link url in respective sentences.
