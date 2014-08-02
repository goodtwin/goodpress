/*global module */
/*jshint camelcase:false */
module.exports = function( grunt ) {
	'use strict';

	// global config are the environments options we find
	// needing to set for every site. These are only often changed values.
	// We suggest you consult the entire configuration and ensure
	// it fits your site.
  var globalConfig = {
		name: 'goodpress',
    themeDir: 'app/wp-content/themes/goodpress',
		distThemeUrl: 'dist/wp-content/themes/goodpress'
  };

	grunt.initConfig({

		watch: {
			reload: {
				files: ['<%= globalConfig.themeDir  %>/assets/stylesheets/**/*.scss'],
				tasks: 'compile'
			}
		},

		sass: {
			dev: {
				files: [{
					expand: true,
					cwd: '<%= globalConfig.themeDir  %>/assets/stylesheets/scss',
					src: ['*.scss', '!_*.scss'],
					dest: '<%= globalConfig.themeDir  %>/assets/stylesheets/css',
					ext: '.css'
				}]
			}
		},

		myth: {
			dev: {
				files: [{
					expand: true,
					cwd: '<%= globalConfig.themeDir  %>/assets/stylesheets/css',
					src: ['*.css'],
					dest: '<%= globalConfig.themeDir  %>/assets/stylesheets/css',
					ext: '.css'
				}]
			}
		},

		cssmin: {
			dist: {
				expand: true,
				cwd: '<%= globalConfig.distThemeDir  %>/assets/stylesheets/css',
				src: ['*.css', '!*.min.css'],
				dest: '<%= globalConfig.distThemeDir  %>/assets/stylesheets/css',
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
					'<%= globalConfig.themeDir  %>/assets/javascripts/*.js',
					'!<%= globalConfig.themeDir  %>/assets/javascripts/modernizr-custom.js',
					'<%= globalConfig.themeDir  %>/assets/javascripts/src/*.js'
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
			outputFile : '<%= globalConfig.themeDir  %>/assets/javascripts/modernizr-custom.js',
			files : ['<%= globalConfig.themeDir  %>/assets/javascripts/src/**/*.js', '<%= globalConfig.themeDir  %>/assets/stylesheets/scss/**/*.scss']
		},

		requirejs: {
			compile: {
				options: {
					name: 'main',
					insertRequire: ['main'],
					baseUrl: '<%= globalConfig.distThemeDir  %>/assets/javascripts/',
					mainConfigFile: '<%= globalConfig.distThemeDir  %>/assets/javascripts/config.js',
					rawText: { // For our super clever use-preloaded-jquery thing; otherwise all the things break
						'jquery': 'define("jquery",function(){return window.jQuery;});'
					},
					out: '<%= globalConfig.distThemeDir  %>/assets/javascripts/scripts.js',
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
					'<%= globalConfig.distThemeDir  %>/assets/javascripts/lib/requirejs/require.min.js': ['<%= globalConfig.distThemeDir  %>/assets/javascripts/lib/requirejs/require.js']
				}
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= globalConfig.distThemeDir  %>/assets/javascripts/',
					src: ['*.js', 'src/*.js', 'lib/requirejs/require.js'],
					dest: '<%= globalConfig.distThemeDir  %>/assets/javascripts/'
				}]
			}
		},

		replace: {
			require: {
				src: ['<%= globalConfig.distThemeDir  %>/templates/base.twig'],
				overwrite: true,
				replacements: [
					{
						from: '<script data-main="{{theme.path}}/assets/javascripts/config" src="{{theme.path}}/assets/javascripts/lib/requirejs/require.js"></script>',
						to: '<script data-main="{{theme.path}}/assets/javascripts/scripts" src="{{theme.path}}/assets/javascripts/lib/requirejs/require.min.js"></script>'
					}
				]
			},
			modernizr: {
				src: ['<%= globalConfig.distThemeDir  %>/templates/partials/head.twig'],
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
				dest: '/var/www/<%= globalConfig.name  %>',
				host: '',
				recursive: true,
				syncDest: true
			},
			prod: {
				src: 'dist/',
				dest: '/var/www/<%= globalConfig.name  %>',
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
				database: '<%= globalConfig.name  %>_development',
				user: '<%= globalConfig.name  %>_dev',
				pass: '',
				host: 'localhost:/opt/boxen/data/mysql/socket',
				url: '<%= globalConfig.name  %>.dev'
			},
			staging: {
				title: 'Staging',
				database: '<%= globalConfig.name  %>_staging',
				user: '<%= globalConfig.name  %>_stg',
				pass: '',
				host: 'localhost',
				url: '<%= globalConfig.name  %>.cronut.goodtwin.co',
				ssh_host: ''
			},
			prod: {
				title: 'Production',
				database: '<%= globalConfig.name  %>_prod',
				user: '<%= globalConfig.name  %>_prod',
				pass: '',
				host: 'localhost',
				url: '<%= globalConfig.name  %>.goodtwin.co',
				ssh_host: ''
			}
		}

	});

	var target = grunt.option('target') || 'staging';

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['compile']);
	grunt.registerTask('compile', ['sass:dev', 'myth:dev']);
	grunt.registerTask('pr', ['compile', 'jshint']);
	grunt.registerTask('build', ['pr', 'clean:dist', 'copy:dist', 'cssmin:dist', 'imagemin:dist', 'modernizr', 'replace:modernizr', 'uglify:dist' ]);
	// DANGER ZONE: Will push the db also. If that's not what you want, just `rsync:*target*`
	// `deploy` requires a `--target=""` flag. (staging, prod). Defaults to staging.
	grunt.registerTask('deploy', ['rsync:'+target, 'db_push']);
	// for a simple local db dump:
  // ```db_pull --target="local"```
};
