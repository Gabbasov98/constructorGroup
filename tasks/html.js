const {
    src,
    dest
} = require('gulp');
const include = require('gulp-file-include');
const prettyHtml = require('gulp-pretty-html');
const bs = require('browser-sync');

module.exports = function html() {
    return src(['src/**/*.html', '!src/components/**/*.html'])
        .pipe(include())
        .pipe(prettyHtml())
        .pipe(dest('build'))
        .pipe(bs.stream())
}