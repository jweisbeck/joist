#Joist

_Frontend support + structure for WGBH projects_

##Requirements
- Node (IMPORTANT: install Node first) - http://nodejs.org/download/
- Grunt - http://gruntjs.com/getting-started
- Bower - http://bower.io/
- Sass and Compass - http://thesassway.com/beginner/getting-started-with-sass-and-compass
- breakpoint-sass - http://breakpoint-sass.com/ (basically the command is `$ gem install breakpoint`

##Included 
- Several Grunt tasks to handle common, routine front-end needs
- Bower to manage vendor libraries
- HTML template defaults
- Will assemble HTML pages from handlebars templates
- Sets sane defaults and provides a build process for SASS css authoring
- JavaScript development and build using RequireJS modules
- Uses the Pure CSS boilerplate as a minimal basis for styling projects. Read more about Pure here: http://purecss.io/.
- Includes jQuery and Modernizr (via bower package management). jQuery is mapped to the default requireJS module. Modernizr is included in the `<head>` automatically 
 

##About Joist
Joist is a tool to help build front-ends that meet the needs of today's web. It consists of many patterns and tools to add Progressive Enhancement and ease Responsive Design in your project. Additionally, it performs many useful tasks (using Grunt) to make your front-end workflow faster and more enjoyable by automating gruntwork and letting you focus more on the project at hand. 

##Quickstart
_**Before following these instructions, please check to make sure you have installed all the requirements listed above. This won't work otherwise**_

To use Joist, clone this git repository and open a terminal window to the project directory. You'll want to delete the .git directory and initialize your own git repo.  Follow the steps below to get going [see requirements above if any of the steps fails].

- Run `$ npm install`. That will install all the libraries Joist requires. 
- Run `$ bower install`. That will install all the javascript vendor dependencies Joist uses.
- From there, run any of the *tasks* listed in the tasks section below. The most common task you'll run is simply `grunt`, which starts a local server and watchs for changes to files. This is the command you'll want to use during local development. When a file change is detected, Grunt actions are triggered, such as compiling templates and reloading the browser. 
- When you want to test your project in it's production-ready state, you'll run the `grunt test` task. _Test_ compiles the project for production and then starts the local server so you can navigate around the project to see how things are working in a production state. This is an important step to take before committing code for production because Grunt compiles and minifies project assets for production. It's critical to examine the HTTP requests and console to profile the performance and debug the project at this time. 
- When you're ready to distribute code, run `$ grunt release`. 
	- the release command does three main things:
		- Copies all the production-ready files to the `dist/` folder.
		- Optionally bumps the version number of your project (see *tasks* below). For example, if your project was 0.1.0, running `grunt release:bump-minor` will change it to 0.2.0
		- Creates a .zip archive of your entire project in it's production-ready state, and places it in the `archives/` folder. This can be handy if the project is being delivered to another party to be hosted or further worked on
		- 

[More instructions TK]

##Tasks
- `$ grunt` - starts server (127.0.0.1:5000) and watches js, css and handlebars templates for changes and live-reloads
- `$ grunt test` - compiles your project for production and starts a server so you can test all the production assets work as expected with a server running. NB: Live-reload doesn't work here because this task is only for debugging. 
- `$ grunt release` - compiles the project files in `dist/`. Also makes a zipball of the entire project in the `archive/` folder, which is handy if you want to pass the project on to other parties
- `$ grunt release:bump-[major|minor|patch]` - Bumps the project version in package.json and runs `release` as specified above. The built css and js files will use the bumped version in the filenames. This is an extremely useful way to ID builds and break server caches 

###Individual tasks 
_NB: You won't likely run these often. Just here for reference._

- `$ npm install` # install all the required packages to run Joist
- `$ grunt clean` # deletes all contents in the `dist/` folder and the `archive/` folder
- `$ grunt assemble` # assembles handlebars templates and copies them to the `dist/` folder
- `$ grunt requirejs` # concatenates and minifies all the requirejs modules in the `modules/` folder, and copies them to `dist/`. Also bumps the minor version number of the project
- `$ grunt bumpup:[major|minor|patch]` # Bumps the project version in package.json. Some of the files in `dist/` use the version number to rev files names - this is a useful way to id builds and break caches


##Mini grid
The project includes a minimal CSS structure to help write styles for responsive web sites. It includes a mixin to make columns: `@include setCol([float], [width])`, one to set breakpoints for media queries `@include breakpoint([width px], [fallback])`, and one to adjust padding around modules `@include flexPad([breakpoint])`. Joist also provides an array of variables of column widths defined as percentages. I.e., `$u-1-4` is 25% and `$u-2-3` is 66.6667%. These width variables are meant to match layout elements widths up against a designer's grid. Look in `scss/_utils.scss` for a list of all the possible widths.


##RequireJS
The project has a strong opinion about using RequireJS to manage all javascripts. The framework for using RequireJS is in place by default. Using it is simple, but may feel a big foreign to folks used to putting scripts in the document `<head>`. This system asks developers to organize javascript code into modules and then use RequireJS to load them. There's anexample FPO app in the `static/js` folder showing how to to employ modules in RequireJS. The entry point for the script is `static/js/main.js`. The modules are in `static/js/modules`. 
