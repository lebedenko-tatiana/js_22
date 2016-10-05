module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); 

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/src/*.js'],
        dest: 'js/dist/script.main.js'
      }
    },
    uglify: {
      dist: {
        src: ['js/dist/script.main.js'],
        dest: 'js/script.main.min.js'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      dist: {
        src: ['css/src/*.css'],
        dest: 'css/style.main.min.css'
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'css/src',
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: ['scss/*.scss'],
        tasks: ['sass']
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd:'js/src',
          src: ['*.js'],
          dest: 'js/dist',
          ext: '.js',
          extDot: 'first'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('minjs', ['concat', 'uglify']);


};