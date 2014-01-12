/*
.|'''''|                            ||    
|| .                                ||    
|| |''|| '||''| '||  ||` `||''|,  ''||''  
||    ||  ||     ||  ||   ||  ||    ||    
`|....|' .||.    `|..'|. .||  ||.   `|..' The JavaScript Task Runner || http://gruntjs.com
*/

module.exports = function(grunt) {

	// Grunt Loaded Tasks
	// npm install --save-dev matchdep
	// http://chrisawren.com/posts/Advanced-Grunt-tooling
	// ------------------------------------------------
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


	// Project Config
	grunt.initConfig({

		// == Grunt JSON Package
		pkg: grunt.file.readJSON('package.json'),

		// == Grunt Meta Banner
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
		},

		// == Grunt Dev Update
		// https://npmjs.org/package/grunt-dev-update
		// http://pgilad.github.io/grunt-dev-update
		devUpdate: {
			main: {
				options: {
					// report already updated dependencies?
					reportUpdated: false,
					// 'force'|'report'|'prompt'
					updateType   : "force"
				}
			}
		},

		// == Watch Tasks
		watch: {
			// HMTL
			html: {
				files: ['**/*.html']
			},
			// Sass
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['compass:dist']
			},
			// CSS
			css: {
				files: ['css/**/*.css']
			},
			// JavaScript
			js: {
				files: ['js/plugins.js','js/main.js']
			},
			// Live Reload
			livereload: {
				options: {
					livereload: true
				},
				files: ['**/*.html', 'css/**/*.css', 'js/**/*js', '**/img/**/*.{png,jpg,jpeg,gif,webp,svg}']
			}
		},

		// == Compass Config
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},

		// == Run A Persistant Static Web Server
		connect: {
			server: {
				options: {
					port: 9001,
					// '.' operates from the root of your Gruntfile.js.
					// Otherwise you gotta do something like this...
					// Users/user-name/www-directory/website-directory
					// For me it's this...
					// Users/grayghostvisuals/Sites/typeplate
					base: '.',
					keepalive: false, // needs to be tru to work with watch task
					livereload: true,
					open: true
				}
			}
		},

		// == Qunit Tests
		qunit: {
			// grunt qunit will test all .php file extensions
			all: ['*.html']
		},

		// == Concatenation
		concat: {
			options: {
				banner: '<%= meta.banner %>',
				separator: ';'
			},
			dist: {
				src: [ 'js/plugins.js', 'js/main.js'],
				dest: 'js/minified/main-min.js'
			}
		},

		// == JSHint
		jshint: {
			files: ['Gruntfile.js', 'js/main.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					require: true,
					define: true,
					requirejs: false,
					describe: true,
					expect: true,
					it: true
				}
			},
			uses_defaults: ['js/main.js']
		},

		// == Uglify/Minification
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: ['js/minified/main-min.js'],
				dest: 'js/minified/main-min.js'
			}
		}
	});

	// == Grunt Registered Tasks
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('update', ['devUpdate']);
	grunt.registerTask('test', ['qunit']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('glue', ['concat']);
	grunt.registerTask('squish', ['uglify']);
};