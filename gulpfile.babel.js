import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import sass from 'gulp-sass';

const $ = gulpLoadPlugins();

export const clean = () => del([ paths.bases.dest ]);

export const scripts = () => {
  return gulp.src('./app/scripts/index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./public/scripts/'))
    .pipe(browserSync.stream());;
}

export const html = () => {
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
}

export const styles = () => {
  return gulp.src('./app/styles/main.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(browserSync.stream());
}

export const watch = () => {
  gulp.watch('./app/*.html', html);
  gulp.watch('./app/styles/*.scss', styles);
  gulp.watch('./app/scripts/*.js', scripts);
}

const serve = () => browserSync.init({
  server: {
    baseDir: 'public',
    serveStaticOptions: {
      extensions: ['html', 'js']
    }
  },
  notify: false
});

const dev = gulp.series(scripts, styles, html, gulp.parallel(serve, watch));
const build   = gulp.series(clean, scripts, styles, html);
gulp.task('build', build);
gulp.task('dev', dev);

export default dev ;
