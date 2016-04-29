'use strict';

import gulp from 'gulp';
import grename from 'gulp-rename';
import del from 'del';
import webpack from  'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackDevConfig from './config/webpack.dev.js';

// The development server (the recommended option for development)
gulp.task('default', ['watch']);

gulp.task('static', () => {         
    gulp.src('src/templates/template_dev.html')  
        .pipe(grename('index.html'))
        .pipe(gulp.dest('build/')); 
    gulp.src(['assets/**/*']).pipe(gulp.dest('build'));
    gulp.src('config/config.dev.js')  
        .pipe(grename('config.js'))
        .pipe(gulp.dest('build/')); 
});

gulp.task('watch', ['static'], function() {
    const compiler = webpack(webpackDevConfig);
    const server = new WebpackDevServer(compiler, {
        // webpack-dev-server options
        contentBase: './build',
        hot: true,

        // webpack-dev-middleware options
        quiet: false,
        noInfo: false,
        lazy: false,
        filename: 'app.js',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        publicPath: '/assets/',
        headers: {'X-Custom-Header': 'yes'},
        stats: {colors: true},
        historyApiFallback: true
    });
    server.listen(8081, '0.0.0.0');
});

gulp.task('clean', (callback) => {
    return del(['build'], callback);
});

