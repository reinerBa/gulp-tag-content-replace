var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var replacer = require('../');

describe('gulp-tag-content-replace', function() {
  describe('in buffer mode', function() {

    it('should replace equal token with text', function(done) {

      // create the fake file
      var fakeFile = new File({
        contents: new Buffer('var environment="/*t1*/Debugger/*t1*/";')
      });

      // Create a prefixer plugin stream
      var myReplacer = replacer("/*t1*/", "Production");

      // write the fake file to it
      myReplacer.write(fakeFile);

      // wait for the file to come back out
      myReplacer.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

		assert(file.contents.toString('utf8').indexOf("Debugger")===-1, "Tokencontent is not deleted");
		assert(file.contents.toString('utf8').indexOf("Production")!==-1,"Tokencontent is not replaced");
        // check the contents
        assert.equal(file.contents.toString('utf8'), 'var environment="Production";');
        done();
      });

    });

  });
});
