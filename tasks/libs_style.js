const plugins = [
    // 'node_modules/bootstrap/dist/css/bootstrap.css',
    // 'node_modules/swiper/swiper-bundle.css',
    // 'src/libs/css/fancybox.css',
    // 'src/libs/css/nice-select.css',
    // 'src/libs/css/file-upload.css',
    // 'node_modules/nouislider/dist/nouislider.css',
];

const {
    src,
    dest
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const chalk = require('chalk');

module.exports = function libs_style(done) {
    if (plugins.length > 0) {
        return src(plugins)
            .pipe(map.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(concat('libs.min.css'))
            .pipe(map.write('../sourcemaps/'))
            .pipe(dest('build/css/'))
    } else {
        return done(console.log(chalk.redBright('No added CSS/SCSS plugins')));
    }
}