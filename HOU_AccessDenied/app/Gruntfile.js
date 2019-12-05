module.exports = function (grunt) {

    var url = grunt.option('url') || 'http://localhost:3000';

    // Project configuration.
    grunt.initConfig({
        bowercopy: {
            options: {
                clean: true
            },
            js: {
                options: {
                    destPrefix: 'js/vendor'
                },
                files: {
                    'jquery.min.js': 'jquery/dist/jquery.min.js',
                    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
                    'easeljs.min.js': 'easeljs/lib/easeljs.min.js'
                }
            },
            css: {
                options: {
                    destPrefix: 'css/vendor'
                },
                files: {
                    'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css'
                }
            }
        },
        'string-replace': {
            dist: {
                files: {
                    './': ['index.html', 'js/ui.js']
                },
                options: {
                    replacements: [{
                        pattern: /http:\/\/\s*(.+?)\s*:3000/,
                        replacement: url
                    }]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('default', ['bowercopy', 'string-replace']);

};
