const gulp=require('gulp');
//gulp-sass-> converts sass to css
const sass=require('gulp-sass')(require('sass'));
// cssnano-> converts css to one line
const cssnano=require('gulp-cssnano');
//gulp-rev-> rename the files with # along side
const rev=require('gulp-rev');
// // minifies js file
const uglify=require('gulp-uglify-es').default;
// //minifies images
const imagemin=require('gulp-imagemin');
const del=require('del');

//.pipe is a functino used to call all other middleware
gulp.task('css',function(done){
    console.log('Minifying css.....');
    // ** means anyfolder &eviery folder inside it 
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())// convert it from sass->css
    .pipe(cssnano())//convert css->cssnano
    .pipe(gulp.dest('./assets.css'))

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
});

gulp.task('js',function(done){
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
   .pipe(uglify())
   .pipe(rev())
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({
       cwd: 'public',
       merge: true
   }))
   .pipe(gulp.dest('./public/assets'));
   done()
});

gulp.task('images',function(done){
    console.log('Compressing images.....');
    gulp.src('./assets/**/*.+(png||jpg||gif||svg||jpeg')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// empty the public/assets directory before starting a new build
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build',gulp.series('clean:assets', 'css', 'js','images'),function(done){
    console.log('Building assets.....');
    done();
})