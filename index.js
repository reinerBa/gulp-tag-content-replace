var through = require("through2");
// through2 docs: https://github.com/rvagg/through2

module.exports = function (search, tokenEndOrReplace, oReplace) {
	var replace, regexString, token = '';
	for(let c of search)
		token += !c.match(/[a-zA-Z0-9]/) ? '\\' + c : c;
	
	if(typeof oReplace !== 'undefined'){
		replace = oReplace;
		var endToken = '';
		for(let c of tokenEndOrReplace)
			endToken += !c.match(/[a-zA-Z0-9]/) ? '\\' + c : c;
	
		regexString = token + "(?:(?!" + endToken + ").)*(.|\\n|\\r)*?" + endToken;
	}else{
		replace = tokenEndOrReplace;
		regexString = token + "(?:(?!" + token + ").)*(.|\\n|\\r)*?" + token;
	}
	regexString = eval('/' + regexString + '/gm');
  
  // through2.obj(fn) is a convenience wrapper around through2({ objectMode: true }, fn)
  return through.obj(function (file, enc, cb) {
    
    // Always error if file is a stream since gulp doesn't support a stream of streams
    if (file.isStream()) {
      this.emit('error', new Error('Streaming not supported in gulp-php lib'));
      return cb();
    }

	try{
		var content = file.contents.toString().replace(regexString, replace) ;
	}catch(error){
		this.emit('gulp-tag-content-replace: Error at replacing tags', error);
        return cb(error);
    }
	file.contents = new Buffer(content);
	// Push the file back onto the stream queue (this was this.queue in through lib)
	this.push(file);

	// Call the passed cb so the stream continues on
	cb();
  });

};