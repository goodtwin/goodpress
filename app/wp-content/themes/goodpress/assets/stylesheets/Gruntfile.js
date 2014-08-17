/*global module, require*/
module.exports = function (grunt) {
  'use strict';

  var globalConfig = {
    src: 'src',
    style: 'style',
    styleguide: 'styleguide',
    docs: 'styleguide/docs',
    dist: {
      root: ' css',
      docs: 'css/docs',
      style: 'css'
    }
  };

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('./package.json'),
    assemble : {
      docs: {
        options: {
          assets: '<%= globalConfig.docs  %>/assets',
          flatten: false,
          partials: ['<%= globalConfig.docs  %>/partials/*.hbs'],
          layout: '<%= globalConfig.docs  %>/layouts/default.hbs',
          data: ['<%= globalConfig.docs  %>/data/*.{json,yml}','config.{json,yml}']
        },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.style  %>',
          src: ['**/*.hbs'],
          dest: '<%= globalConfig.dist.docs  %>'
        }]
      }
    },
    shared_config: {
      style: {
        options: {
          name: "globalConfig",
          cssFormat: "dash",
          useSassMaps: true
        },
        src: "<%= globalConfig.style  %>/config.yml",
        dest: [
          "<%= globalConfig.style  %>/config.scss"
        ]
      },
      styleguide: {
        options: {
          name: "styleguideConfig",
          cssFormat: "dash",
          useSassMaps: true
        },
        src: "styleguide/styleguide.yml",
        dest: [
          "styleguide/config.scss"
        ]
      }
    },
    sass: {
      dist: {
        files : {
          '<%= globalConfig.dist.style  %>/style.css': '<%= globalConfig.style  %>/style.scss'
        }
      },
      styleguide: {
        files : {
          '<%= globalConfig.dist.docs  %>/stylesheets/styleguide.css': '<%= globalConfig.styleguide  %>/styleguide.scss'
        }
      },
    },
    myth: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          '<%= globalConfig.dist.style  %>/style.css': '<%= globalConfig.dist.style  %>/style.css'
        }
      },
      styleguide: {
        files: {
          '<%= globalConfig.dist.docs  %>/stylesheets/styleguide.css': '<%= globalConfig.dist.docs  %>/stylesheets/styleguide.css'
        }
      },
      docs: {
        files: {
          '<%= globalConfig.dist.docs  %>/stylesheets/docs.css': '<%= globalConfig.dist.docs  %>/stylesheets/docs.css'
        }
      }
    },
    clean: {
      dist: {
        files: [
        {
          dot: true,
          src: ['<%= globalConfig.dist.root  %>/*']
        }
        ]
      },
      docs: {
        files : [
        {
          dot: true,
          src: ['<%= globalConfig.dist.docs  %>/*']
        }
        ]
      }
    },
    copy: {
      dist: {
        files: [
        {
          expand: true,
          flatten: true,
          cwd: '<%= globalConfig.src  %>/',
          src: ['**/*.js'],
          dest: '<%= globalConfig.dist.style  %>/javascripts/'
        },
        {
          expand: true,
          cwd: '<%= globalConfig.src  %>/assets',
          src: ['**/*'],
          dest: '<%= globalConfig.dist.style  %>/assets/'
        }]
      },
      docs: {
        files: [
        {
          expand: true,
          cwd: '<%= globalConfig.docs  %>/assets/',
          src: ['images/*', 'javascripts/**/*.js', 'stylesheets/*.css'],
          dest: '<%= globalConfig.dist.docs  %>/assets/'
        },
        {
          expand: true,
          cwd: '<%= globalConfig.docs  %>/assets/',
          src: ['stylesheets/*.css'],
          dest: '<%= globalConfig.dist.docs  %>/'
        },
        {
          expand: true,
          cwd: '<%= globalConfig.src  %>/assets/',
          src: ['images/*', 'icons/*'],
          dest: '<%= globalConfig.dist.docs  %>/assets/'
        }
        ]
      }
    },
    watch: {
      hbs: {
        files: ['**/*.hbs'],
        tasks: ['assemble:docs']
      },
      docs: {
        files: ['<%= globalConfig.docs  %>/src/assets/images/*', '<%= globalConfig.docs  %>/src/assets/javascripts/*'],
        tasks: ['copy:docs']
      },
      docsass: {
        files: ['<%= globalConfig.docs  %>/src/assets/stylesheets/*'],
        tasks: ['doccss']
      },
      sass: {
        files: ['<%= globalConfig.src  %>/**/*.scss', '<%= globalConfig.style  %>/**/*.scss'],
        tasks: ['distcss', 'copy:docs', 'doccss']
      },
      js: {
        files: ['<%= globalConfig.src  %>/**/*.js'],
        tasks: ['copy:dist', 'copy:docs']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= globalConfig.dist.style  %>/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= globalConfig.dist.style  %>/',
        ext: '.min.css'
      }
    }
  });

require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('assemble');

grunt.registerTask('default', ['build']);
grunt.registerTask('distcss', ['shared_config:style', 'sass:dist', 'myth:dist']);
grunt.registerTask('styleguidecss', ['shared_config:styleguide', 'sass:styleguide', 'myth:styleguide']);
grunt.registerTask('docs', ['copy:docs', 'styleguidecss', 'assemble']);
grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'distcss', 'cssmin']);
grunt.registerTask('build', ['clean', 'dist', 'docs']);

};
