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
var mSass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var cssSrc = './app/public/stylesheets/src/*.scss';
mGulp.task('sass', function(){
    var cssDst = './app/public/stylesheets';

    return mSass(cssSrc).on('error', function(err){
       console.error('Error!', err.message);
    })
        .pipe(mRename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(mGulp.dest(cssDst));
});

//监听任务, 运行语句, gulp watch
var mTinylr = require('tiny-lr');
var server = mTinylr();
var port = 35729;
mGulp.task('watch', function(){
    server.listen(port, function(err){
        if(err) return err;

        //监听css
        mGulp.watch(cssSrc, function(){
            mGulp.run('sass');
        })
    })
});

mGulp.task('default', function(){
    // 先执行一般所有任务,然后执行监听
    mGulp.run('sass', 'watch');
});
