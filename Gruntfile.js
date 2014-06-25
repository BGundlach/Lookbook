module.exports = function(grunt) {

	grunt.initConfig({
		rsync: {
			options: {
				args: ["--verbose"],
				recursive: true
			},
			dev: {
				options: {
					src: "./packages/",
					dest: "/var/www/gm/mz/<%= rsync.dev.options.src %>",
				},
			},
		},
		autoprefixer: {
			css: {
				src: 'packages/lookbook/blocks/lookbook/css/*.css'
			},
		},
		watch: {
			upload: {
				// Dont spawn to retain the process context here
				options: {
					spawn: false
				},
				files: ['packages/**/*', 'packages/*', ],
				tasks: ['rsync:dev'],
			},
		},

	});
	grunt.event.on('watch', function(action, filepath, target) {
		grunt.config('rsync.dev.options.src', filepath);
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['autoprefixer:css', 'rsync:dev']);
};