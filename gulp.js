const gulp=require('gulp');
//gulp-sass-> converts sass to css
const sass=require('gulp-sass');
// cssnano-> converts css to one line
const cssnano=require('gulp-cssnano');
//gulp-rev-> rename the files with # along side
const rev=require('gulp-rev');

//.pipe is a functino used to call all other middleware
gulp.task('css',function(){
    console.log('Minifying css.....');
    // ** means anyfolder &eviery folder inside it 
    gulp.src('./assets/sass/**.scc')
    .pipe(sass())// convert it from sass->css
    .pipe(cssnano())//convert css->cssnano
    .pipe(gulp.dest('./assests.css'))

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));

    
});