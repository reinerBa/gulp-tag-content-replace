# gulp-tag-content-replace
> A string or tag based area-replace plugin for gulp

A gulp plugin to replace areas in text files, like comments and the code between them in js. If a tag is defined to be replaced, every PAIRED occurence of this tag and the content (even multiple lines) within will be replaced with a given string. To use a start and an end tag is even possible. In detail: The regex `/startTag(?:(?!endTag").)*(.|\\n|\\r)*?endTag/gm` is used to replace, given tags get escaped properly.

## Usage

First, install `gulp-tag-content-replace` as a development dependency:

```shell
npm install --save-dev gulp-tag-content-replace
```

Then, add it to your `gulpfile.js`:

### 1. Replace with equal tag
```javascript
var replace = require('gulp-replace');

gulp.task('templates', function(){
  gulp.src(['updates.txt'])
    .pipe(replace("/*today*/", '+' + new Date().toString())) //transforms every /*today*/ -> "day month Date year...."
    .pipe(gulp.dest('./build/'));
});
```
### 2. Define start and end tags
```javascript
var replace = require('gulp-tag-content-replace');

gulp.task('templates', function(){
  gulp.src(['Code.java'])
    .pipe(replace("//use", "//less", "System.gc();")) //transforms every "//use whateverXYZ //less" -> System.gc();
    .pipe(replace("//", "Author", "Linus McTux, Sr.")) //transforms every "//Author" -> "Linus McTux, Sr."
    .pipe(gulp.dest('./build/'));
});
```
### 3. Delete Content
```javascript
var replace = require('gulp-tag-content-replace');

gulp.task('templates', function(){
  gulp.src(['app.js'])
    .pipe(replace("/*dev*/", "")) // deletes occurence of "/*dev*/ whateverXYZ /*dev*/"
    .pipe(replace("//debug", "//debug_end", "")) // deletes occurence of "//debug whateverXYZ //debug_end"
    .pipe(replace("<!--", "-->", ""))
    .pipe(gulp.dest('./build/'));
});
```

## API

gulp-tag-content-replace can be called with two or three string arguments [replacements from file planned]

### replace(tag, replacement)

#### tag
Type: `String`

The tags to search for.

#### replacement
Type: `String`

The replacement string.

### replace(start-tag, end-tag, replacement)

#### start-tag
Type: `String`

The start tag to search for.

#### end-tag
Type: `String`

The end tag to search for.

#### replacement
Type: `String`

The replacement string.

## Test
Mocha gets used for test cases:
`npm test`

## License
MIT
