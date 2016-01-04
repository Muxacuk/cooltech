var gulp = require("gulp");
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var browserSync = require("browser-sync");
var spritesmith = require('gulp.spritesmith')
var args = require('yargs').argv;

gulp.task('jade',function () {
	gulp.src('app/_jade/*.jade')
	    .pipe(plumber())
	    .pipe(jade({
      				pretty: true
    	}))
	    .pipe(gulp.dest('app/'));
});


gulp.task('sass', function () {
  gulp.src('app/_sass/*.scss')
  	.pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/_css'));
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
	gulp.watch('app/_sass/**/*',['sass']);
	gulp.watch('app/_jade/**/*',['jade']);
});



gulp.task('sprite', function () {
  var dir= args.env||'**'
  var spriteData = gulp.src('app/pictures/'+dir+'/*.png').pipe(spritesmith({
    imgName: 'sprite'+dir+'.png',
    cssName: '_sprite_'+dir+'.scss',
    padding: 20
  }));
  return spriteData.pipe(gulp.dest('app/pictures/'));
});



gulp.task('default',['server','watch']);