var mGulp = require('gulp');
var mUglify = require('gulp-uglify');
var mRename = require('gulp-rename');

// 定义gulp任务
//压缩js
mGulp.task('minjs', function(){
    // 源地址
    mGulp.src('./app/*.js')
        .pipe(mUglify({
            //保留部分注释
            preserveComments: 'some'
        }))
        .pipe(mRename({
            //文件后缀
            suffix: '.min'
        }))
        .pipe(mGulp.dest('./app/'))
});

// 压缩css
var minifycss = require('gulp-minify-css');
mGulp.task('mincss', function(){
    var cssSrc = './app/public/stylesheets/src/*.css',
        cssDst = './app/public/stylesheets';
    mGulp.src(cssSrc)
        .pipe(mRename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(mGulp.dest(cssDst));

})
