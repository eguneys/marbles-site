'use strict';

// npm install --save-dev gulp gulp-load-plugins gulp-util gulp-autoprefixer gulp-cache gulp-imagemin main-bower-files gulp-filter gulp-ignore gulp-flatten gulp-csso gulp-useref gulp-if gulp-uglify gulp-rimraf gulp-size gulp-jshint jshint-stylish gulp-livereload gulp-nodemon wiredep bower-requirejs requirejs gulp-debug gulp-changed gulp-concat gulp-ember-templates gulp-insert gulp-plumber merge-stream gulp-sass gulp-grep-stream gulp-rename rimraf mv

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: '{gulp-*,main-*}'
});
var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var mv = require('mv');

// npm install --save-dev testem
var testem = require('testem');

var paths = {
    src: {
        common: 'app/client'
    },
    dev_dist: 'public/assets'
};

/*** BUILD ***/

gulp.task('clean', function(cb) {
    rimraf(paths.dev_dist, cb);
});

gulp.task('build-dev-sass', function() {
    return gulp.src(paths.src.common + '/styles/style.scss')
        .pipe($.sass({
            errLogToConsole: true,
            includePaths: [paths.src.common + '/bower_components',
                           paths.src.common + '/vendor',
                           paths.src.common + '/styles']
        }))
        .pipe($.concat('main.css'))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(paths.dev_dist + '/styles'));
});

gulp.task('build-dev-images', function() {
    return gulp.src(paths.src.common + '/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.dev_dist + '/images'));
});

gulp.task('build-dev-fonts', function() {
    var streamqueue = require('streamqueue');
    return streamqueue({objectMode: true},
                       gulp.src($.mainBowerFiles())
                       .pipe($.flatten()),
                       gulp.src(paths.src.common + '/vendor/**/*'),
                       gulp.src(paths.src.common + '/fonts/**/*')
                      )
      //.pipe($.filter('**/*.{eot,svg,ttf,woff}')) // https://github.com/yeoman/generator-gulp-webapp/issues/159
        .pipe($.grepStream('**/*.{eot,svg,ttf,woff,css}'))
        //.pipe($.flatten())
        .pipe(gulp.dest(paths.dev_dist + '/fonts'));
});

gulp.task('build-dev-extras', function() {
    var mergeStream = require('merge-stream');
    
    var vendorStream = gulp.src(paths.src.common + '/vendor/marbles/data/**/*')
            .pipe($.rename(function(path) {
                path.dirname = 'marbles/data/' + path.dirname;
            }))
            .pipe(gulp.dest(paths.dev_dist + '/vendor'));
    
    var commonStream = gulp.src(paths.src.common + '/*.*')
            .pipe(gulp.dest(paths.dev_dist));

    return mergeStream([vendorStream, commonStream]);
});

gulp.task('build-dev-templates', function() {
    var mergeStream = require('merge-stream');
    var fs = require('fs');

    var amdModulePrefix = 'define(["ember"], function(Ember) {',
        amdModulePostfix = '});';


    var directoryFilter = $.filter(function (file) { return file.isDirectory(); });

    var dFilter2 = fs.readdirSync(paths.src.common + '/templates').filter(function(name) {
        return fs.statSync(paths.src.common + '/templates/' + name).isDirectory();
    });

    dFilter2.push('.');
    
    var streams = dFilter2.map(function(name) {

        var srcGlob = name==='.'?'*.hbs':(name + '/**/*.hbs');
        var dst = name==='.'?'common':name;
        var rightPath = name==='.'?'':dst + '/';
        
        var renameToRightPath = $.rename(function(path) { path.dirname = rightPath + path.dirname; });
        
        return gulp.src(paths.src.common + '/templates/' + srcGlob)
            .pipe($.plumber())
            .pipe(renameToRightPath)
             //.pipe($.filter(function(f) { console.log(f); }))
            .pipe($.emberTemplates({
                type: 'browser'
            }))
            .pipe($.concat(dst + '.js'))
            .pipe($.insert.wrap(amdModulePrefix, amdModulePostfix))
            .pipe(gulp.dest(paths.dev_dist + '/templates'));
    });
    
    return mergeStream(streams);
});

gulp.task('build-dev-commonjs', ['jshint'], function() {
    var mergeStream = require('merge-stream');
    
    var bowers = gulp.src([paths.src.common + '/bower_components/**/*.js'])
            .pipe($.changed(paths.dev_dist + '/scripts/lib'))
            .pipe(gulp.dest(paths.dev_dist + '/scripts/lib'));

    var vendors = gulp.src([paths.src.common + '/vendor/**/*.js'])
            .pipe($.changed(paths.dev_dist + '/scripts/vendor'))
            .pipe(gulp.dest(paths.dev_dist + '/scripts/vendor'));

    return mergeStream([bowers, vendors]);
});

gulp.task('build-dev-mainjs', ['jshint'], function() {
    return gulp.src([paths.src.common + '/scripts/**/*.js'])
        .pipe($.changed(paths.dev_dist + '/scripts/app'))
        .pipe(gulp.dest(paths.dev_dist + '/scripts/app'));
});

gulp.task('build-requirejs', ['build-scripts', 'build-styles'], function(cb) {
    var requirejs = require('requirejs');

    var config = {
        appDir: paths.dev_dist,
        baseUrl: 'scripts/lib',
        mainConfigFile: paths.src.common + '/scripts/common.js',
        dir: paths.dev_dist + '2',
        optimize: 'none',
        enforceDefine: true,
        skipDirOptimize: true,
        optimizeCss: 'standard',
        // currently inlining font css files fails
        // http://stackoverflow.com/questions/25467038/inlining-font-css-files-and-fonts-gone
        //cssImportIgnore: '../fonts/open-sans/open-sans.css,../fonts/font-awesome/font-awesome.css',
        preserveLicenseComments: false,
        modules: [
            {
                name: 'requirejs',
                include: ['requirejs']
            },
            {
                name: 'app/common',
                include: ['app/main']
            },
            {
                name: 'routes/index_deps',
                exclude: ['app/common']
            }
        ]
    };

    requirejs.optimize(config, function(response) {
        rimraf(paths.dev_dist, function() {
            mv(paths.dev_dist + '2', paths.dev_dist, function() {
                cb();
            });
            //cb();
        });
    });
});

//----
// Build Tasks
//----

gulp.task('build-styles', ['build-dev-sass', 'build-dev-fonts', 'build-dev-images', 'build-dev-extras']);

gulp.task('build-scripts', ['build-dev-commonjs', 'build-dev-mainjs', 'build-dev-templates']);

gulp.task('build-dev-styles', ['build-dev-sass', 'build-dev-fonts', 'build-dev-images', 'build-dev-extras']);

gulp.task('build-dev-scripts', ['build-dev-commonjs', 'build-dev-mainjs', 'build-dev-templates']);

gulp.task('build-dev', function(cb) {
    runSequence('clean',
                ['build-dev-scripts',
                 'build-dev-styles'],
                cb);
});

gulp.task('build-optimize', function (cb) {
    runSequence('clean',
                ['build-requirejs'],
                cb);
});

gulp.task('build', ['build-optimize'], function() {
    return gulp.src(paths.dev_dist + '/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['build']);

//---
// Dev Tasks
//---

// run clean manually
//gulp.task('server', ['build', 'watch']);

gulp.task('devserver', ['build-dev', 'watch-devserver']);

gulp.task('devtdd', ['build-dev', 'watch-devserver', 'tdd']);

/*** SERVE / WATCH / RELOAD ***/

gulp.task('jshint', function() {
    return gulp.src(['gulpfile.js',
                    'config/*.js',
                    'app/**/*.js',
                     '!app/client/vendor/**',
                    '!app/client/bower_components/**'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('jshint-fail', function() {
    return gulp.src(['gulpfile.js',
                    'config/*.js',
                    'app/**/*.js',
                    '!app/client/bower_components/**'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

// inject bower components into requirejs config
gulp.task('bower-rjs', function() {
    var bowerRjs = require('bower-requirejs');

    bowerRjs({
        config: paths.src.common + '/scripts/common.js',
        exclude: ['bootstrap-sass-official', 'ember-data', 'font-awesome', 'ember-qunit'],
        baseUrl: paths.src.common + '/bower_components'
    }, function() {
        //
        runSequence(['build-dev-commonjs']);
    });
});

// inject bower components into sass files
gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;

    gulp.src(paths.src.common + '/styles/*.scss')
        .pipe(wiredep({
            ignorePath: '../bower_components/'
        }))
        .pipe(gulp.dest(paths.src.common + '/styles'));
});

gulp.task('serve', ['build-dev'], function() {
    $.nodemon({ script: 'config/app.js',
                ignore: [
                    'node_modules/*'
                ],
                watch: [
                    'config/**/*.js',
                    'app/server/**/*.js',
                    'lib'
                ]})
        .on('restart', function() {
            setTimeout(function() {
                $.livereload.changed();
            }, 1000);
        });
});

gulp.task('watch-devserver', ['serve'], function() {
    $.livereload.listen();

    gulp.watch(paths.src.common + '/styles/**/*.scss', ['build-dev-sass']);

    gulp.watch([
        paths.src.common + '/templates/**/*.hbs'
    ], ['build-dev-templates']);

    gulp.watch(paths.src.common + '/scripts/**/*.js', ['build-dev-mainjs']);

    gulp.watch('app/views/**/*.hbs', function(files) {
        $.livereload.changed(files);
    });
    
    gulp.watch(paths.dev_dist + '/**/*',function(files) {
        $.livereload.changed(files);
    });
    
    gulp.watch('bower.json', ['bower-rjs', 'wiredep']);
    gulp.watch('gulpfile.js', function() {
        console.log($.util.colors.red('\n----------' +
                                    '\nRestart the Gulp process' +
                                    '\n----------'));
    });
});

/*** TEST ***/
gulp.task('test', function(cb) {
    var spawn = require('child_process').spawn;

    var proc = spawn('node', ['config/app']);

    proc.stdout.on('readable', function() {
        var output = proc.stdout.read();
        
        if (output && output.toString().match('express listening')) {
            
            var testemOptions = {
                file: 'testem.json'
            };

            var t = new testem();

            t.startCI(testemOptions, function(result) {
                proc.kill();
                cb();
                
                // TODO is this ok?
                // no because it doesnt throw error when tests fail
                // maybe passing result will fix it.
                process.exit(result);
            });
        }
        
    });
    
});


gulp.task('tdd', ['devserver'], function() {
    var testemOptions = {
        file: 'testem.json'
    };

    var t = new testem();

    return t.startDev(testemOptions);
});
