var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync(__dirname + '/downloadConsent.html', 'utf8');
var options = {
    "format" : "Letter",
    "border" : "50px"
  };

pdf.create(html, options).toFile(__dirname + '../data/Consent.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res);
});
