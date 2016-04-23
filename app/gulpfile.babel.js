'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import webpack from  'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import gzip from 'gulp-gzip';
import runSequence from 'run-sequence';

var webpackConfig = {
    entry: {
        app: [path.resolve(__dirname, './src/app.js')],
        libs: ['react', 'classnames']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    devtool: '#eval-source-map',
    plugins: [],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve(__dirname, './src')]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?cacheDirectory']
            }
        ]
    },
};

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

gulp.task('product', (callback) => {
    runSequence('product:build', 'compress', callback);
});

gulp.task('product:build', ['clean'], function(done) {
    var buildWebpackConfig = Object.create(webpackConfig);
    buildWebpackConfig.plugins = [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'libs', /* filename= */'libs.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
    ]

    var webpackCompiler = webpack(buildWebpackConfig);
    webpackCompiler.run(onBuild(done));
});

gulp.task("watch2", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "0.0.0.0", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('watch', function() {
    var webpackCompiler = webpack(webpackConfig);
    webpackCompiler.watch(100, onBuild());
});

gulp.task('compress', () => {
    return gulp.src(['./build/*.js', './build/*.css'])
    .pipe(gzip())
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', (callback) => {
    return del(['build'], callback);
});

