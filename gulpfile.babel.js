import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import browserSync from 'browser-sync';

export const bundle = () => {
  return gulp.src('./app/scripts/index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./public/scripts/'));
}

export const html = () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('public'))
}

const open = () => browserSync.init({
  server: {
    baseDir: 'public',
    serveStaticOptions: {
      extensions: ['html', 'js']
    }
  },
  notify: false
});

const serve = gulp.series(bundle, html, open)

export default serve ;
