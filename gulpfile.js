// Import necessary packages

const gulp =  require("gulp");

const browserSync =  require("browser-sync");

const sass =  require("gulp-sass")(require("sass"));

const cleanCSS =  require("gulp-clean-css");

const autoprefixer =  require("gulp-autoprefixer");

const rename =  require("gulp-rename");

  

// Task to set up a server with BrowserSync

gulp.task("server", function  () {

browserSync({

server: {

baseDir:  "src", // Serve files from the "src" directory

},

});

  

// Watch HTML files in the "src" directory for changes and reload the browser

gulp.watch("src/*.html").on("change", browserSync.reload);

});

  

// Task to compile Sass files, add prefixes, minify CSS, and stream changes to BrowserSync

gulp.task("styles", function  () {

return gulp

.src("src/sass/**/*.+(scss|sass)")

.pipe(sass({ outputStyle:  "compressed" }).on("error", sass.logError))

.pipe(rename({ suffix:  ".min", prefix:  "" }))

.pipe(autoprefixer())

.pipe(cleanCSS({ compatibility:  "ie8" }))

.pipe(gulp.dest("src/css"))

.pipe(browserSync.stream());

});

  

// Task to watch Sass files for changes and re-run the 'styles' task

gulp.task("watch", function  () {

gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));

});

  

// Default task that runs when you type "gulp" in the command line

gulp.task("default", gulp.parallel("watch", "server", "styles"));
