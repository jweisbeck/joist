module.exports = function(grunt) {
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        timestamp: new Date().getTime(),

        clean: ["dist/", "archive/"],

        jshint: ["static/js/*.js", "static/js/modules/**/*.js"],

        connect: {
            server: {
                options: {
                    port: 5000,
                    base: "dist/"
                }
            }
        },

        copy: {
            jquery: {
                files: [
                    { src: ["static/js/vendor/jquery/jquery.js"], dest: "dist/" }
                ]
            },
            modernizr: {
                files: [
                    { src: ["static/js/vendor/modernizr/modernizr.js"], dest: "dist/" }
                ]
            },
            js: {
                files: [
                    { src: ["static/js/libs/**/*.js"], dest: "dist/" },
                    { src: ["static/js/*"], dest: "dist/" }
                ]
            },
            jsdev: {
                files: [
                    { src: ["static/js/modules/*.js"], dest: "dist/" },
                    { src: ["static/js/vendor/requirejs/require.js"], dest: "dist/" }
                ]
            },
            img: {
                files: [
                    {src: ["static/images/**"], dest: "dist/" }    
                ]
            },
            css: {
                files: [
                    { src: ['static/**/*.css'], dest: "dist/" },
                    { src: ["static/js/vendor/box-sizing-polyfill/boxsizing.htc"], dest: "dist/" },
                ]
            },
            htaccess: {
                files: [
                    { src: ['.htaccess'], dest: "dist/" }
                ]
            }
        },

        watch: {
            livereload: {
                files: ["dist/**/*"],
                //files: "dist/static/css/*.css",
                options: { livereload: 1337 }
            },
            stylesheets: {
                files: "scss/**/*",
                tasks: "compass:dev"
            },
            scripts: {
                files: ["static/js/**/*.js"],
                tasks: ["jshint", "copy:js", "copy:jsdev"]
            },
            dev: {
                files: ["templates/**/*", "data/*"],
                tasks: ["assemble"]
            }
        },

        compass: {
            dev: {
                options: { environment: "dev" }
            },
            dist: {
                options: { environment: "production" }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/static/css',
                    src: ['*.css'],
                    dest: 'dist/static/css/<%= pkg.version %>',
                    ext: '-build-<%= timestamp %>.css'
                }]
            } 
        },

        requirejs: {
            release: {
                options: {
                    baseUrl: "static/js",
                    mainConfigFile: "static/js/config.js",
                    // paths maps the require lib itself, and then we include it in the includes
                    // this allows require itself to be built into the final build file. 
                    // See this post: http://stackoverflow.com/questions/15262770/require-js-not-compiling-single-js-file-correctly
                    paths: {
                        requireLib: "vendor/requirejs/require"
                    },
                    include: ["requireLib", "main"],
                    insertRequire: ["main"],
                    out: "dist/static/js/<%= pkg.version %>/build-<%= timestamp %>.js",
                    optimize: "uglify2",
                    findNestedDependencies: true,
                    wrap: true,
                    preserveLicenseComments: false
                }
            }
        },

        assemble: {
            options: {
                pkg: '<%= pkg %>',
                flatten: true,
                layoutdir: "templates/layouts",
                //layout: "index.hbs",
                partials: "templates/partials/*.hbs",
                data: ['data/**/*.yml'] 
            },
            pages: {
                files: { 
                    "dist/": ["templates/pages/*.hbs"]
                }
            },
            dist: {
                options: {
                    production: true,
                    version: "<%= pkg.version %>",
                    timestamp: '<%= timestamp %>',
                    modernizr: function(){
                        if( grunt.file.exists('dist/static/js/vendor/modernizr/modernizr.js')){
                            return grunt.file.read('dist/static/js/vendor/modernizr/modernizr.js');
                        }
                    },
                    basicCSS: function(){
                        if( grunt.file.exists('dist/static/css/basic.css')){
                            return grunt.file.read('dist/static/css/basic.css');
                        }
                    }
                },
                files: { 
                    "dist/": ["templates/pages/*.hbs"]
                }
            },
            dev: {
                options: {
                    production: false
                },
                files: { 
                    "dist/": ["templates/pages/*.hbs"]
                }
            },
        },

        compress: {
            release: {
                options: {
                    archive: "archive/site-<%= pkg.version %>.min.zip"
                },
                files: [
                    { src: ['dist/**'], filter: 'isFile' }
                ]
            }
        },

        bumpup: {
            files: ["package.json", "bower.json"],
            options: {
                updateProps: {
                    pkg: "package.json"
                }
            },
            setters: {
                timestamp: function(old, releaseType, options){
                    return +new Date();
                }
            }
        },

        uglify: {
            files: {
                cwd: 'dist/static/js',
                expand: true,
                src: ['libs/*.js', 'vendor/**/*.js', '*.js'],
                dest: 'dist/static/js'
            }
        },

        imagemin: {
            crush: {
                files: [{
                    expand: true,
                    cwd: "static/images",
                    src: ['**/*.{png,jpg,gif}'],
                    dest: "dist/static/images"
                }]
            }
        }
                

  });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Release cleans out the dist folder and re-puts everything in there 
    grunt.registerTask( "dev", ["jshint", "clean", "copy", "compass:dev", "assemble:dev", "connect", "watch"] ); 
    grunt.registerTask( "test", ["jshint", "clean", "requirejs", "imagemin:crush", "copy", "compass:dist", "sass:dist", "uglify", "assemble:dist", "connect", "watch"] ); 
    grunt.registerTask( "release", [
            "jshint", 
            "clean", 
            "requirejs", 
            "imagemin:crush",
            "copy:jquery", // copied to dist for safe measure, but it should be part of the requirejs build file, so not strictly necessary 
            "copy:modernizr", 
            "copy:js", // copied to dist for safe measure, but it should be part of the requirejs build file, so not strictly necessary 
            "copy:img", 
            "compass:dist",
            "sass:dist",
            "uglify",
            "assemble:dist",
            "compress:release"
    ]);
    grunt.registerTask( "default", "dev");
    grunt.registerTask( "release:bump-patch", ["bumpup:patch", "release"]);
    grunt.registerTask( "release:bump-minor", ["bumpup:minor", "release"]);
    grunt.registerTask( "release:bump-major", ["bumpup:major", "release"]);
};
