let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify');


gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError()))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
/*    'app/empty/empty.css',*/
/*    'node_modules/normalize.css/normalize.css',*/
    'node_modules/reset-css/reset.css',
/*    'node_modules/slick-carousel/slick/slick.css',*/
/*    'node_modules/animate.css/animate.css',*/
/*    'node_modules/magnific-popup/dist/magnific-popup.css',*/
/*    'node_modules/fancybox/dist/css/jquery.fancybox.css',*/
/*    'node_modules/fullpage.js/dist/fullpage.css',*/
/*    'node_modules/aos/dist/aos.css'*/
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    'app/empty/empty.js',
/*    'node_modules/slick-carousel/slick/slick.js',*/
/*    'node_modules/wow.js/dist/wow.js',*/
/*    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',*/
/*    'node_modules/fancybox/dist/js/jquery.fancybox.js',*/
/*    'node_modules/fullpage.js/dist/fullpage.js',*/
/*    'node_modules/aos/dist/aos.js',*/
/*    'node_modules/jquery.scroolly/dist/jquery.scroolly.min.js'*/
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

gulp.task('export', async function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let buildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let buildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let buildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let buildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));   
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css' ,'scss', 'js', 'browser-sync', 'watch'));