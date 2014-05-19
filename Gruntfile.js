// Generated on 2014-03-14 using generator-webapp 0.4.8
"use strict";

// # Globbing
// for performance reasons we"re only matching one level down:
// "test/spec/{,*/}*.js"
// use this if you want to recursively match all subfolders:
// "test/spec/**/*.js"

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require("load-grunt-tasks")(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require("time-grunt")(grunt);

    // Turn on the stack trace by default
    grunt.option("stack", true);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
          // Configurable paths
          app: "app",
          dist: "dist"
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
          jade: {
            files: ["<%= config.app %>/{,*/}*.jade"],
            tasks: ["jade"]
          },
          bower: {
            files: ["bower.json"],
            tasks: ["bowerInstall"]
          },
          coffee: {
            files: ["<%= config.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}"],
            tasks: ["coffee:dist"]
          },
          js: {
            files: ["<%= config.app %>/scripts/{,*/}*.js"],
            tasks: ["newer:copy:server"]
          },
          coffeeTest: {
            files: ["test/spec/{,*/}*.{coffee,litcoffee,coffee.md}"],
            tasks: ["coffee:test", "test:watch"]
          },
          gruntfile: {
            files: ["Gruntfile.js"]
          },
          compass: {
            files: ["<%= config.app %>/styles/{,*/}*.{scss,sass}"],
            tasks: ["compass:server", "autoprefixer"]
          },
          styles: {
            files: ["<%= config.app %>/styles/{,*/}*.css"],
            tasks: ["newer:copy:server", "autoprefixer"]
          },
          livereload: {
            options: {
              livereload: "<%= connect.options.livereload %>"
            },
            files: [
              ".tmp/{,*/}*.html",
              ".tmp/styles/{,*/}*.css",
              ".tmp/scripts/{,*/}*.js",
              "<%= config.app %>/images/{,*/}*"
            ]
          }
        },

        // The actual grunt server settings
        connect: {
          options: {
            port: 9000,
            livereload: 35729,
                // Change this to "0.0.0.0" to access the server from outside
                hostname: "0.0.0.0"
              },
              livereload: {
                options: {
                  open: true,
                  base: [
                  ".tmp",
                  "<%= config.app %>"
                  ]
                }
              },
              test: {
                options: {
                  port: 9001,
                  base: [
                  ".tmp",
                  "test",
                  "<%= config.app %>"
                  ]
                }
              },
              dist: {
                options: {
                  open: true,
                  base: "<%= config.dist %>",
                  livereload: false
                }
              }
            },

        // Empties folders to start fresh
        clean: {
          dist: {
            files: [{
              dot: true,
              src: [
              ".tmp",
              "<%= config.dist %>/*",
              "!<%= config.dist %>/.git*"
              ]
            }]
          },
          server: ".tmp"
        },

        // Compile Jade to HTML
        jade: {
          options: {
            pretty: true
          },
          dist: {
            files: [{
              expand: true,
              cwd: "<%= config.app %>",
              dest: "<%= config.dist %>",
              src: "*.jade",
              ext: ".html"
            }]
          },
          server: {
            files: [{
              expand: true,
              cwd: "<%= config.app %>",
              dest: ".tmp",
              src: "*.jade",
              ext: ".html"
            }]
          }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
          options: {
            jshintrc: ".jshintrc",
            reporter: require("jshint-stylish")
          },
          all: [
            "Gruntfile.js",
            "<%= config.app %>/scripts/{,*/}*.js",
            ".tmp/scripts/{,*/}*.js",
            "!<%= config.app %>/scripts/vendor/*",
            "test/spec/{,*/}*.js"
          ]
        },

        // Mocha testing framework configuration options
        mocha: {
          all: {
            options: {
              run: true,
              urls: ["http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html"]
            }
          }
        },

        // Compiles CoffeeScript to JavaScript
        coffee: {
          dist: {
            files: [{
              expand: true,
              cwd: "<%= config.app %>/scripts",
            src: "{,*/}*.{coffee,litcoffee,coffee.md}",
            dest: ".tmp/scripts",
            ext: ".js"
          }]
        },
        test: {
          files: [{
            expand: true,
            cwd: "test/spec",
          src: "{,*/}*.{coffee,litcoffee,coffee.md}",
          dest: ".tmp/spec",
          ext: ".js"
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        config: "config.rb"
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ["last 1 version"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: ".tmp/styles/",
        src: "{,*/}*.css",
        dest: ".tmp/styles/"
      }]
    }
  },

    // Automatically inject Bower components into the HTML file
    bowerInstall: {
      app: {
        src: ["<%= config.app %>/{,*/}*.jade"],
        ignorePath: "<%= config.app %>/",
        exclude: ["<%= config.app %>/bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js", ]
      },
      sass: {
        src: ["<%= config.app %>/styles/{,*/}*.{scss,sass}"],
        ignorePath: "<%= config.app %>/bower_components/"
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            "<%= config.dist %>/scripts/{,*/}*.js",
            "<%= config.dist %>/styles/{,*/}*.css",
            "<%= config.dist %>/images/{,*/}*.*",
            "<%= config.dist %>/fonts/{,*/}*.*",
            "<%= config.dist %>/*.{ico,png}"
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: "<%= config.dist %>"
      },
      html: ["<%= config.dist %>/{,*/}*.html"]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ["<%= config.dist %>", "<%= config.dist %>/images"]
      },
      html: ["<%= config.dist %>/{,*/}*.html"],
      css: [".tmp/styles/{,*/}*.css"]
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= config.app %>/images",
          src: "{,*/}*.{gif,jpeg,jpg,png}",
          dest: "<%= config.dist %>/images"
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: "<%= config.dist %>",
          src: "{,*/}*.html",
          dest: "<%= config.dist %>"
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "<%= config.app %>",
            dest: "<%= config.dist %>",
            src: [
              "*.{ico,png,txt,svg}",
              ".htaccess",
              "images/{,*/}*.{webp,svg}",
              "fonts/{,*/}*.*"
            ]
          }
        ]
      },
      server: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "<%= config.app %>/styles",
            dest: ".tmp/styles/",
            src: "{,*/}*.css"
          },{
            // Copy any javascript files to the temo directory
            expand: true,
            dot: true,
            cwd: "<%= config.app %>/scripts",
            dest: ".tmp/scripts/",
            src: "{,*/}*.js"
          }
        ]
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      devFile: "<%= config.app %>/bower_components/modernizr/modernizr.js",
      outputFile: "<%= config.dist %>/scripts/vendor/modernizr.js",
      files: [
        "<%= config.dist %>/scripts/{,*/}*.js",
        "<%= config.dist %>/styles/{,*/}*.css",
        "!<%= config.dist %>/scripts/vendor/*"
      ],
      uglify: true,
      extra: {
        shiv: false,
        load: false
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 5
      },
      server: [
        "compass:server",
        "newer:coffee:dist",
        "newer:copy:server",
      ],
      test: [
        "coffee",
        "copy:server"
      ],
      dist: [
        "coffee",
        "compass",
        "copy:server",
        "imagemin"
      ]
    }
  });


  grunt.registerTask("serve", function (target) {
    if (target === "dist") {
      return grunt.task.run(["build", "connect:dist:keepalive"]);
    }

    grunt.task.run([
      "clean:server",
      "jade:server",
      "concurrent:server",
      "autoprefixer",
      "connect:livereload",
      "watch"
    ]);
  });

  grunt.registerTask("server", function (target) {
    grunt.log.warn("The `server` task has been deprecated. Use `grunt serve` to start a server.");
    grunt.task.run([target ? ("serve:" + target) : "serve"]);
  });

  grunt.registerTask("test", function (target) {

    if (target !== "watch") {
      grunt.task.run([
        "clean:server",
        "concurrent:test",
        "autoprefixer"
      ]);
    }

    grunt.task.run([
      "connect:test",
      "mocha"
    ]);

  });

  grunt.registerTask("build", [
    "clean:dist",
    "jade:dist",
    "useminPrepare",
    "concurrent:dist",
    "autoprefixer",
    "concat",
    "cssmin",
    "uglify",
    "copy:dist",
    // "modernizr",
    // "rev",
    "usemin",
    "htmlmin"
  ]);

  grunt.registerTask("default", [
    "newer:jshint",
    "test",
    "build"
  ]);

};
