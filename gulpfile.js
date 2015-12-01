// ==========================================================================
// Gulp Tasks
// ==========================================================================

// Load plugins

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    gutil = require( 'gulp-util' ),
    ftp = require( 'vinyl-ftp' );
    

// Compile Our Sass

gulp.task('styles', function() {

    return gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('css')) // Dev normal CSS
    
    .pipe(minifycss())
    .pipe(gulp.dest('css/min')) // Live Minify CSS

    .pipe(notify({ message: 'Styles task complete' }));

});


// Modules Scripts concat and minyfy

gulp.task('modules-script', function(){
   gulp.src('js/modules/**/*.js')
   
   .pipe(concat('modules.js'))
   .pipe(uglify())
   .pipe(rename('modules.min.js'))
   .pipe(gulp.dest('js')) 
   
   .pipe(notify({ message: 'Modules Js task complete' }));
});


// Plugins Scripts concat and minyfy

gulp.task('plugins-script', function(){
   gulp.src('js/plugins/**/*.js')
   
   .pipe(concat('plugins.js'))
   .pipe(uglify())
   .pipe(rename('plugins.min.js'))
   .pipe(gulp.dest('js')) 
   
   .pipe(notify({ message: 'Plugins Js task complete' }));
});

gulp.task('deploy', function () {

    var conn = ftp.create( {
        host:     'ftp.luischiappe.com.ar',
        user:     'luisch',
        password: 'Lchiap28',
        parallel: 10,
        log:      gutil.log
    });

    var globs = [
        'backend/**',
        'css/**',
        'js/**',
        'img/**',
        'index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/public_html/nowplaying/' ) ) // only upload newer files
        .pipe( conn.dest( '/public_html/nowplaying/' ) );

});



// Watch Files For Changes

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('js/modules/**/*.js', ['modules-script']);
    gulp.watch('js/plugins/**/*.js', ['plugins-script']);
});

// Default Task

gulp.task('default', ['styles', 'modules-script', 'plugins-script', 'watch']);