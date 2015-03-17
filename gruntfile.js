/**
 * Copyright 2014 Bestinet Sdn.Bhd.
 *
 * Created by dang on 14/03/2014
 */

"use strict";

module.exports = function(grunt){
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,
        asset: 'public/asset-'+ pkg.version,
        bower: {
            install: {
                targetDir: "public/vendor",
                install: true,
                verbose: true,
                cleanTargetDir: true,
                cleanBowerDir: false,
                bowerOptions: {}
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true, cwd: 'public/vendor/jQuery/dist',
                        src: ['jquery.min.map','jquery.min.js'], dest: "public/javascripts/libs"
                    },
                    {
                        expand: true, cwd: 'public/vendor/angular',
                        src: ['angular.min.js.map','angular.min.js'], dest: "public/javascripts/libs"
                    },
                    {
                        expand: true, cwd: 'public/vendor/bootstrap/dist/css',
                        src: ['bootstrap.min.css'], dest: "public/stylesheets/libs"
                    },
                    {
                        expand: true, cwd: 'public/vendor/angular-bootstrap',
                        src: ['ui-bootstrap-tpls.min.js'], dest: "public/javascripts/libs/plugins"
                    },
                    {
                        expand: true, cwd: 'public/vendor/font-awesome/fonts',
                        src: ['**'], dest: "public/stylesheets/fonts"
                    },
                    {
                        expand: true, cwd: 'public/vendor/bootstrap/fonts',
                        src: ['**'], dest: "public/stylesheets/fonts"
                    }
                ]
            },
            images: {
                files: [
                    // copy minified images
                    {expand: true, cwd: 'public/images-build', src: ['**'], dest: 'public/images'}
                ]
            },
            build: {
                files: [
                    // copy minified images
                    {expand: true, cwd: 'public/stylesheets/fonts', src: ['**'], dest: 'public/fonts'}
                ]
            }
        },
        clean: {
            images: {
                src: ['public/images-build']
            },
            build: {
                src: [
                    'build',
                    'public/stylesheets/**/*', "!public/stylesheets/*.min.*.css",
                    'public/javascripts/app','public/javascripts/*.js', 'public/javascripts/debug', 'public/javascripts/libs', "!public/javascripts/*.min.*.js"]
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            client: {
                options: {
                    jshintrc: '.jshintrc-client',
                    ignores: [
                        'public/javascripts/**/*.min.js',
                        'public/javascripts/libs/**'
                    ]
                },
                src: [
                    'public/javascripts/**/*.js'
                ]
            },
            server: {
                options: {
                    jshintrc: '.jshintrc-server'
                },
                src: [
                    'config/**/*.js',
                    'app/**/*.js'
                ]
            }
        },
        lesslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['public/stylesheets/app/*.less']
            }
        },
        autoprefixer: {

            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            debug: {
                src: ['public/stylesheets/app.css','public/stylesheets/admin.css']
            },
            compile: {
                src: ['public/stylesheets/app.min.css','public/stylesheets/admin.min.css']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/images-build/'
                }]
            }
        },
        jsbeautifier: {
            files: ['app/**/*.js','public/javascript/*.js','public/javascript/app/*.js','app/templates/*.html'],
            options: {
                js: {
                    fileTypes: ['.js']
                },
                html: {
                    fileTypes: ['.html']
                }
            }
        },
        cssmin: {
            build: {
                options: {
                },
                files: {
                    'public/stylesheets/libs.min.css':
                        [
                            "public/stylesheets/libs/bootstrap.min.css",
                            "public/stylesheets/libs/material.min.css",
                            "public/stylesheets/libs/ripples.min.css",
                            "public/stylesheets/libs/font-awesome.min.css",
                            "public/stylesheets/libs/reset.css",
                            "public/stylesheets/libs/erealmFont.css"
                        ]
                }
            }
        },
        less: {
            debug: {
                options: {
                    cleancss: false
                },
                files: {
                    'public/stylesheets/app.css': 'public/stylesheets/app.less',
                    'public/stylesheets/admin.css': 'public/stylesheets/admin.less'
                }
            },
            compile: {
                options: {
                    cleancss: true
                },
                files: {
                    'public/stylesheets/app.min.css': 'public/stylesheets/app.less',
                    'public/stylesheets/admin.min.css': 'public/stylesheets/admin.less'
                }
            }
        },
        uglify: {
            options:{
                mangle: true,
                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version + "\\n" %>' +
                    '* <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") + "\\n" %>' +
                    '* <%= pkg.homepage + "\\n" %>' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> - <%= pkg.author %> */ <%= "\\n" %>'
            },
            build: {
                files: {
                    'public/javascripts/libs.min.js': [
                        'public/javascripts/libs/*.js',
                        'public/javascripts/libs/plugins/angular-cookies.min.js',
                        'public/javascripts/libs/plugins/angular-translate.min.js',
                        'public/javascripts/libs/plugins/angular-translate-loader-url.min.js',
                        'public/javascripts/libs/plugins/angular-translate-storage-cookie.min.js',
                        'public/javascripts/libs/plugins/ui-bootstrap-tpls.min.js',
                        'public/javascripts/libs/plugins/ng-mobile-menu.min.js',
                        'public/javascripts/libs/plugins/moment-with-locales.js',
                        'public/javascripts/libs/plugins/material.min.js',
                        'public/javascripts/libs/plugins/ripples.min.js'
                    ],
                    'public/javascripts/app.min.js': [
                        'public/javascripts/erealm.js',
                        'public/javascripts/language.js',
                        'public/javascripts/clients.js',
                        'public/javascripts/app/*.js'
                    ],
                    'public/javascripts/admin.min.js': [
                        'public/javascripts/erealm.js',
                        'public/javascripts/language.js',
                        'public/javascripts/clients.js',
                        'public/javascripts/admin/*.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: 'app/views/layouts/*.html',
            options: {
                dest: 'public'
            }
        },
        usemin: {
            html: 'app/views/layouts/*.html',
            options: {
                root: 'public',
                dest: 'public',
                assetsDirs: ['public']
            }
        },
        watch: {
            clientHtml: {
                files: ['public/templates/**/*.html'],
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: [
                    'public/**/*.js', '!client/app/**/*.min.js'
                ],
                tasks: ['jshint:client'],
                options: {
                    livereload: true
                }
            },
            clientLess: {
                files: ['public/stylesheets/**/*.less'],
                tasks:['less:debug','autoprefixer:debug'],
                options: {
                    livereload: true
                }
            },
            clientCss: {
                files: ['public/stylesheets/*.css'],
                options: {
                    livereload: true
                }
            },
            tests: {
                files: ['tests/**/*.js'],
                tasks: ['mochacov:test']
            },
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            build: {
                src: ['public/javascripts/*.min.js', 'public/stylesheets/*.min.css']
            }
        },
        replace: {
            build: {
                src: ['app/views/layouts/*.html'],             // source files array (supports minimatch)
                dest: 'app/views/layouts/',             // destination directory or file
                replacements: [{
                    from: '#version',
                    to: function () {   // callback replacement
                        return Math.floor(Date.now() / 1000);
                    }
                }]
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: ['--debug'],
                    ext: 'js,html',
                    ignore: ['node_modules/**', '.git/**', '.idea/', '.cache/'],
                    watch: ['config','lib', 'app'],
                    delay: 1000,
                    debug: true,
                    env: {
                        PORT: 3000,
                        NODE_ENV: 'development'
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                console.log('start browser');
                                require('open')('http://localhost:3000');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                console.log('restart browser');
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        concurrent: {
            tasks: ['nodemon:dev', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');


    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-useminPrepare');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-text-replace');



    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.registerTask('prepare', ['copy:main', 'copy:images', 'clean:images','jsbeautifier']);
    grunt.registerTask('default', ['lesslint', 'jshint','less:debug','autoprefixer:debug', "concurrent"]);
    grunt.registerTask('build', ['cssmin', 'less:compile','autoprefixer:compile', 'uglify','filerev', 'usemin', 'replace', 'copy:build', 'clean:build']);
};