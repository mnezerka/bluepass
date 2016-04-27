'use strict';

import gulp from 'gulp';
import grename from 'gulp-rename';
import gutil from 'gulp-util';
import del from 'del';
import webpack from  'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import gzip from 'gulp-gzip';
import runSequence from 'run-sequence';
import webpackDevConfig from './config/webpack.dev.js';

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack:build-dev', err);
        }

        gutil.log('[webpack:build-dev]', stats.toString({
            colors: true
        }));

        if (done) {
            done();
        }
    }
}

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

