var gulp = require("gulp");
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var compass = require('gulp-compass');
var browserSync = require("browser-sync");
 
gulp.task('jade',function () {
	gulp.src('app/_jade/*.jade')
	    .pipe(plumber())
	    .pipe(jade({
      				pretty: true
    	}))
	    .pipe(gulp.dest('app/'));
});
 
gulp.task('compass', function () {
  gulp.src('app/sass/main.scss')
  	.pipe(plumber())
    .pipe(compass({
      config_file: 'config.rb',
      css: 'app/_css',
      sass: 'app/_sass'
    }))
});

gulp.task('server',function(){
		browserSync({
			port: 9000,
			server: {
				baseDir: 'app'
			}
		})
});
gulp.task('watch', function(){
	gulp.watch([
			'app/index.html',
			'app/js/**/*.js',
			'app/_css/*.css'
	]).on('change', browserSync.reload);
	gulp.watch('app/_sass/**/*',['compass']);
	gulp.watch('app/_jade/**/*',['jade']);
});
gulp.task('default',['server','watch']);