module.exports = function (grunt) {

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n * Organization: <%= pkg.organization %>\n * Theme: <%= pkg.theme %>\n * Version: <%= pkg.version %>\n * UI/UX Designer and Developer: <%= pkg.author %>\n * Last Updated: <%= grunt.template.today("dd-mm-yyyy")%>\n*/',

        uglify: {
            options: {
                //beutify: true,
                //mangle: false,
                banner: '<%= banner %>' + '\n'
            },
            build: {
                files: {
                    'site/js/iys.psc.live.scripts.min.js': ['src/js/iys.psc.common.js', 'src/js/iys.psc.donations.js', 'src/js/iys.psc.ads.js', 'src/js/iys.psc.player.js', 'src/js/iys.psc.social.js', 'src/js/iys.psc.subscriptions.js', 'src/js/iys.psc.main.js'],
                    'site/js/iys.psc.live.ads.definition.min.js': 'src/js/iys.psc.ads.definition.js'
                }
            }
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors: true,
                    consolidateMediaQueries: true
                },
                files: {
                    'site/css/iys.psc.live.styles.min.css': ['src/css/iys.psc.main.css', 'src/css/iys.psc.responsive.css']
                }
            }
        },

        watch: {
            js: {
                files: ['src/js/iys.psc.ads.js', 'src/js/iys.psc.ads.definition.js', 'src/js/iys.psc.common.js', 'src/js/iys.psc.donations.js', 'src/js/iys.psc.main.js', 'src/js/iys.psc.player.js', 'src/js/iys.psc.social.js', 'src/js/iys.psc.subscriptions.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['src/css/iys.psc.main.css', 'src/css/iys.psc.responsive.css'],
                tasks: ['cssc']
            }
        },

        'http-server': {
            'dev': {
                port: 7000,
                root: 'site'
            }
        }

    });

    grunt.registerTask('default', []);

};