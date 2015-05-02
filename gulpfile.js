var gulp = require('gulp'),
	uglifyJs = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	minifyCss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	minifyHtml = require('gulp-minify-html'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('serve', function(){
	browserSync.init({
		//server: './dist'	
		proxy: 'localhost:8080/dist/'
	});
	
	gulp.watch('build/css/*.sass', ['sass']);
	gulp.watch('build/js/*.js', ['js']);
	gulp.watch('build/*.html', ['html']);
})

gulp.task('js', function(){
	return gulp.src('build/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(uglifyJs())
		.pipe(gulp.dest('dist/js'))
		.pipe(reload({stream: true}));
});

gulp.task('sass', function(){
	return gulp.src('build/css/*.sass')
		.pipe(sass({indentedSyntax: true}))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({stream: true}));
});

gulp.task('html', function(){
	return gulp.src('build/*.html')
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);