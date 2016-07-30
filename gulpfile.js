/**
 * Created by kattamum on 11/2/2015.
 */

var gulp=require('gulp'),nodemon=require('gulp-nodemon'),gulpMocha=require('gulp-mocha');

gulp.task('default', function () {
    nodemon({
        scripts:'app.js',
        ext:'js',
        env:{
            PORT:8011
        },
        ignore:['./node_modules/**']

    })
        .on('restart', function () {
           console.log('restarting!!!!!!!');
        });


});


gulp.task('test', function () {

    gulp.src('tests/*.js',{read:false}).pipe(gulpMocha({reporter:'nyan'}));

});