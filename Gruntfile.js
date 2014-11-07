module.exports = function(grunt) {
    // Project configuration.  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {             
            dist: {            
                options: {     
                    outputStyle: 'expanded',        
                    require: ['susy', 'breakpoint'],
                    sassDir: 'sass',      
                    cssDir: '_site/css',     
                    watch: true
                }
            }
        }
    });
    // Load Compass plugin.    
    grunt.loadNpmTasks('grunt-contrib-compass'); 
};

/* vim: expandtab:tabstop=4:softtabstop=4:shiftwidth=4:set filetype=javascript: */
