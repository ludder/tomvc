module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: '*',
                    open: true
                }
            }
        },
        watch: {
            js: {
                files: '*.js',
                options: {
                    livereload: true,
                },
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd HH:MM") %> - License: <%= pkg.license %> */\n;'
            },
            my_target: {
                files: {
                    'dest/tomvc.min.js': [ 'tomvc.js' ]
                }
            }
        }
    } );

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default task(s).
    grunt.registerTask( 'default', [ 'connect', 'watch' ] );
    grunt.registerTask( 'build', [ 'uglify' ] );

};
