module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    watch:
      files: ["src/*.coffee"]
      tasks: ['coffee','uglify']
    coffee:
      compile:
        files:[
          expand: true
          cwd: 'src'
          src: ["qiita-widget.coffee"]
          dest: "dist/"
          ext: ".js"
          options:
            banner:'/*! <%= pkg.name %>d <%= grunt.template.today("yyyy-mm-dd") %>d */'
        ]
      compilejoin:
        options:
          sourceMap:true
        files:
          'dist/qiita-widget-simple.js':['src/qiita-widget.coffee','src/simple-doing.coffee']
      compilenowrap:
        options:
          sourceMap:true
          bare:true
        files:
          'dist/qiita-widget-simple-nowrap.js':['src/qiita-widget.coffee','src/simple-doing.coffee']
          'dist/qiita-widget-nowrap.js': ['src/qiita-widget.coffee']
    uglify:
      build:
        options:
          banner:'/*! <%= pkg.name %>  Version <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */'
          sourceMap: true
          sourceMapIncludeSources:true
        files:
          'dist/qiita-widget.min.js': 'dist/qiita-widget.js'
          'dist/qiita-widget-simple.min.js': 'dist/qiita-widget-simple.js'
          'dist/qiita-widget-simple.min-nowrap.min.js': 'dist/qiita-widget-simple-nowrap.js'
          'dist/qiita-widget-nowrap.min.js': 'dist/qiita-widget-nowrap.js'
    bump:
      options:
        files:["package.json","bower.json"]
        commit:true
        commitMessage: 'Release v%VERSION%'
        commitFiles: ["package.json","bower.json"]
        createTag:true
        tagName: 'v%VERSION%'
        tagMessage: 'Version %VERSION%'
        push: true
        pushTo: "origin"


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-bump'
  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'build',['coffee','uglify']
  return
