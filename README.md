## Tinderbox project
This repository contains a schoolproject made for Tinderbox 2016, as part of our semester project.
The final product is a mobilefirst webapp, that uses an API created with Codeigniter.

## Build With
- [Codeigniter](http://www.codeigniter.com/)

## Development Requirements
- [Node.js](https://nodejs.org/en/)
- [npm](https://nodejs.org/en/)

## Development
- Have [node.js](https://nodejs.org/en/) install on your local machine.
- Use Terminal for MacOSX or CommandPromt for Windows, and type the following (be sure to "cd" into the project directory first)
```
npm install
```
- Then you can start the SASS compiler in the background, and start editing the *.scss files
```
gulp watch
```
- To further develop on your local machine, you have to change the following files, to your local settings
```
public/js/main.js:10
application/config/database.php:78-81
application/config/config.php:26
```
## Deplaoouyayment
To deploy, minify css and js files
```
gulp build
```
Output files to /public/dist/
