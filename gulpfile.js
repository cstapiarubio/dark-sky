var gulp=require ('gulp');
var concat = require ('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'js/*.js'])
	.pipe(concat('todo.js'))
	.pipe(gulp.dest('dest/js/'));
});

gulp.task('style', function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'sass/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(concat('todo.css'))
	.pipe(gulp.dest('dest/css/'));
});

gulp.task('webserver', function(){
	gulp.src('../dark-sky/')
	.pipe(webserver({
		fallback: 'index.html',
		livereload: true,
		directoryListing: false,
		open: true
	}));
});

gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['style']);
});

gulp.task('default', ['script', 'style', 'webserver', 'watch']);