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
                        src: ['ui-bootstrap.min.js'], dest: "public/javascripts/libs/plugins"
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
                    'public/images-build', 'public/stylesheets/**/*', "!public/stylesheets/*.min.css",
                    'public/javascripts/app','public/javascripts/*.js', 'public/javascripts/debug', 'public/javascripts/libs', "!public/javascripts/*.min.js"]
            },
            web: {
                src: ['app/controllers/management.java', 'app/controllers/report.java']
            },
            api: {
                src: ['app/controllers/Application.java', 'app/controllers/Secured.java']
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
                        'public/javascripts/**/*.min.js'
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
        cssmin: {
            build: {
                options: {
                },
                files: {
                    'public/stylesheets/libs.min.css':
                        [
                            "public/stylesheets/libs/bootstrap.min.css",
                            "public/stylesheets/libs/reset.css"
                        ]
                }
            }
        },
        less: {
            compile: {
                options: {
                    cleancss: true
                },
                files: {
                    'public/stylesheets/app.min.css': 'public/stylesheets/app.less'
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
            }
        },
        useminPrepare: {
            html: 'app/layouts/*.hbs',
            options: {
                root: 'public',
                dest: '<%= asset %>'
            }
        },
        usemin: {
            html: 'app/layouts/*.hbs',
            options: {
//                dirs: ['public/js', 'public/js/libs'],
                dest: '<%= asset %>'
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
                tasks: ['newer:jshint:client'],
                options: {
                    livereload: true
                }
            },
            clientLess: {
                files: ['public/stylesheets/**/*.less'],
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: ['app/**/*.js'],
                tasks: ['newer:jshint:server']
            },
            serverTemplates: {
                files: ['app/views/**/*.hbs'],
                options: {
                    livereload: true
                }
            },
            tests: {
                files: ['tests/**/*.js'],
                tasks: ['mochacov:test']
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: ['--debug'],
                    ext: 'js',
                    ignore: ['node_modules/**', '.git/**', '.idea/', '.cache/'],
                    watch: ['config', 'app/**', 'public/**'],
                    debug: true,
                    delayTime: 10,
                    env: {
                        PORT: 3000,
                        NODE_ENV: 'development'
                    }
                }
            }
        },
        open : {
            dev : {
                path: 'http://127.0.0.1:3000/',
                app: 'Google Chrome'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-open');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.registerTask('prepare', ['bower', 'copy:main', 'imagemin', 'copy:images', 'clean:images']);
    grunt.registerTask('default', ['lesslint', 'jshint','nodemon:dev','watch','open:dev']);
    grunt.registerTask('build', ['cssmin', 'less', 'uglify','usemin', 'copy:build', 'clean:build']);
};