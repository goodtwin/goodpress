/*global module */
/*jshint camelcase:false */
module.exports = function( grunt ) {
	'use strict';

	// global config are the environments options we find
	// needing to set for every site. These are only often changed values.
	// We suggest you consult the entire configuration and ensure
	// it fits your site.
	grunt.initConfig({
		config: require('./config.json'),
		// requries wp-cli (http://wp-cli.org/)
		exec: {
			initWordpress: {
				cwd: "app/",
				cmd: 'wp core download'
			},
			installWordpress: {
				cwd: "app/",
				cmd: function() {
					var config = grunt.config.get('config.wp');
					return 'wp core install' +
					' --url=' + config.url +
					' --title=' + config.title +
					' --admin_password=' + config.admin.password +
					' --admin_user=' + config.admin.user +
					' --admin_email=' + config.admin.email;
				}
			},
			initConfig: {
				cwd: "app/",
				cmd: function() {
					var config = grunt.config.get('config.wp.db');
					return 'wp core config' +
						' --dbname=' + config.name +
						' --dbuser=' + config.user +
						' --dbpass=' + config.pwd +
						' --dbhost=localhost:/opt/boxen/data/mysql/socket';
				}
			},
			initPlugins: {
				cwd: "app/",
				cmd: function() {
					var _ = require('lodash');
					return _(grunt.config.get('config.wp.plugins')).map(
						function(plugin){
							return 'wp plugin install ' + plugin + ' --activate';
						}).join(' && ');
				}
			}
		},

		watch: {
			reload: {
				files: ['<%= config.themeDir  %>/assets/stylesheets/**/*.scss'],
				tasks: 'compile'
			}
		},

		shared_config: {
      style: {
        options: {
          name: "defaultConfig",
          cssFormat: "dash",
          useSassMaps: true
        },
        src: ['node_modules/**/bagel-*/config.yml', 'node_modules/bagel-*/config.yml', '<%= config.themeDir  %>/assets/stylesheets/config.yml'], // order matters,
        dest: [
          "<%= config.themeDir  %>/assets/stylesheets/config.scss"
        ]
      }
    },

		sass: {
      options: {
        loadPath: ['./', 'app/wp-content/themes/fitfarm/assets/stylesheets/', 'node_modules/']
      },
      dist: {
        files : {
          '<%= config.themeDir  %>/assets/stylesheets/style.css': '<%= config.themeDir  %>/assets/stylesheets/init.scss'
        }
      }
    },

		myth: {
      options: {
        sourcemap: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.themeDir  %>/assets/stylesheets/',
            src: ['**/*.css'],
            dest: '<%= config.themeDir  %>/assets/stylesheets/'
          }
        ]
      },
		},


		cssmin: {
			dist: {
				expand: true,
				cwd: '<%= config.distThemeDir  %>/assets/stylesheets/css',
				src: ['*.css', '!*.min.css'],
				dest: '<%= config.distThemeDir  %>/assets/stylesheets/css',
				ext: '.css'
			}
		},

		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'dist/',
						src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'],
						dest: 'dist/'
					}
				]
			}
		},

		jshint: {
			options: {
				jshintrc: true
			},
			files: {
				src: [
					'<%= config.themeDir  %>/assets/javascripts/*.js',
					'!<%= config.themeDir  %>/assets/javascripts/modernizr-custom.js',
					'<%= config.themeDir  %>/assets/javascripts/src/*.js'
				]
			}
		},

		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: ['dist/*']
					}
				]
			}
		},

		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'app/',
						src: ['**/*', '!**/*.scss'],
						dest: 'dist/'
					}
				]
			}
		},

		modernizr: {
			devFile : 'remote',
			outputFile : '<%= config.themeDir  %>/assets/javascripts/modernizr-custom.js',
			files : ['<%= config.themeDir  %>/assets/javascripts/src/**/*.js', '<%= config.themeDir  %>/assets/stylesheets/scss/**/*.scss']
		},

		requirejs: {
			compile: {
				options: {
					name: 'main',
					insertRequire: ['main'],
					baseUrl: '<%= config.distThemeDir  %>/assets/javascripts/',
					mainConfigFile: '<%= config.distThemeDir  %>/assets/javascripts/config.js',
					rawText: { // For our super clever use-preloaded-jquery thing; otherwise all the things break
						'jquery': 'define("jquery",function(){return window.jQuery;});'
					},
					out: '<%= config.distThemeDir  %>/assets/javascripts/scripts.js',
					optimize: 'uglify2',
					uglify2: {
						beautify: false,
						mangle: false,
						compress: {
							//conditionals: false //however it was compressing these broke window.resize behavior.
						}
					}
				}
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			require: {
				files: {
					'<%= config.distThemeDir  %>/assets/javascripts/lib/requirejs/require.min.js': ['<%= config.distThemeDir  %>/assets/javascripts/lib/requirejs/require.js']
				}
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.distThemeDir  %>/assets/javascripts/',
					src: ['*.js', 'src/*.js', 'lib/requirejs/require.js'],
					dest: '<%= config.distThemeDir  %>/assets/javascripts/'
				}]
			}
		},

		replace: {
			require: {
				src: ['<%= config.distThemeDir  %>/templates/base.twig'],
				overwrite: true,
				replacements: [
					{
						from: '<script data-main="{{theme.path}}/assets/javascripts/config" src="{{theme.path}}/assets/javascripts/lib/requirejs/require.js"></script>',
						to: '<script data-main="{{theme.path}}/assets/javascripts/scripts" src="{{theme.path}}/assets/javascripts/lib/requirejs/require.min.js"></script>'
					}
				]
			},
			modernizr: {
				src: ['<%= config.distThemeDir  %>/templates/partials/head.twig'],
				overwrite: true,
				replacements: [
					{
						from: 'src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min.js"',
						to: 'src="{{theme.path}}/assets/javascripts/modernizr-custom.js"'
					}
				]
			}
		},

		rsync: {
			staging: {
				src: 'dist/',
				dest: '/var/www/<%= config.name  %>',
				host: '',
				recursive: true,
				syncDest: true
			},
			prod: {
				src: 'dist/',
				dest: '/var/www/<%= config.name  %>',
				host: '',
				recursive: true,
				syncDest: true
			}
		},

		deployments: {
			options: {
				backup_dir: 'backups'
			},
			local: {
				title: 'Local',
				database: '<%= config.db.name  %>_development',
				user: '<%= config.db.user  %>_user',
				pass: '',
				host: 'localhost:/opt/boxen/data/mysql/socket',
				url: '<%= config.name  %>.<%= config.env.dev  %>'
			},
			staging: {
				title: 'Staging',
				database: '<%= config.name  %>_staging',
				user: '<%= config.name  %>_stg',
				pass: '',
				host: 'localhost',
				url: '<%= config.name  %>.<%= config.env.staging  %>.cronut.goodtwin.co',
				ssh_host: ''
			},
			prod: {
				title: 'Production',
				database: '<%= config.name  %>_prod',
				user: '<%= config.name  %>_prod',
				pass: '',
				host: 'localhost',
				url: '<%= config.name  %>.goodtwin.co',
				ssh_host: ''
			}
		}

	});

	var target = grunt.option('target') || 'staging';

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('bagel:dirs',
  'used to create an array of bagel paths for use in sass pathing',
  function(){
    var loadPaths = grunt.file.expand({}, [
      './',
      'app/wp-content/themes/fitfarm/assets/stylesheets/',
			'app/wp-content/themes/fitfarm/assets/stylesheets/chrome/',
      'node_modules/',
      'node_modules/bagel-*/node_modules/',
      'node_modules/**/node_modules/bagel-*/node_modules/'
    ]);
    grunt.log.write(loadPaths.join(", "));
    grunt.config.set('sass.options.loadPath', loadPaths);

  });

	grunt.registerTask('init', ['exec:initWordpress', 'exec:initConfig', 'exec:installWordpress', 'exec:initPlugins']);
	grunt.registerTask('default', ['compile']);
	grunt.registerTask('compile', ['bagel:dirs', 'shared_config', 'sass:dist', 'myth:dist']);
	grunt.registerTask('pr', ['compile', 'jshint']);
	grunt.registerTask('build', ['pr', 'clean:dist', 'copy:dist', 'cssmin:dist', 'imagemin:dist', 'modernizr', 'replace:modernizr', 'uglify:dist' ]);
	// DANGER ZONE: Will push the db also. If that's not what you want, just `rsync:*target*`
	// `deploy` requires a `--target=""` flag. (staging, prod). Defaults to staging.
	grunt.registerTask('deploy', ['rsync:'+target, 'db_push']);
	// for a simple local db dump:
  // ```db_pull --target="local"```
};
