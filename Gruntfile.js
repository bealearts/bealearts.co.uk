module.exports = function(grunt) {

  // Libs
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-gh-pages');


  // Temp dir
  var TempDir = require('temporary/lib/dir');
  var tempDir = new TempDir().path;


  // Project configuration.
  grunt.initConfig(
  {
    clean: {
      build: {
        src: ['build', 'dist']
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '*',
            dest: 'build/'
          }
        ]
      }
    },
    markdown: {
      build: {
        files: [
          {
            expand: true,
            src: '**/*.md',
            dest: 'build/',
            cwd: 'src/content/',
            ext: '.html'
          }
        ],
        options: {
          template: 'src/template/site.html',
          preCompile: function (src, context)
          {
            grunt.log.error(src);
          },
          markdownOptions: {
            gfm: true,
            highlight: 'manual'
          }
        }
      }
    },
    less: {
      build: {
        files: {
          'build/css/site.css' : 'src/template/css/site.less'
        }
      }
    },
    imagemin: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/template/',
            src: '**/*.{png,jpg,gif}',
            dest: 'build/'
          }
        ]
      }
    },
    watch: {
      main: {
          files: ['*.*', 'src/**/*.*'],
          tasks: 'build'
      }
    },
  'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }
  });



  // Tasks
  grunt.registerTask('build', [
        'clean',
        'copy',
        'markdown',
        'less',
        'imagemin'
  ]);

  grunt.registerTask('deploy', [
        'build',
        'gh-pages'
  ]);

  grunt.registerTask('default', [
        'build'
  ]);


};