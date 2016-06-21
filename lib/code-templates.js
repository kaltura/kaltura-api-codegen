module.exports = {};
var Templates = module.exports.templates = {};

var FS = require('fs');
var Path = require('path');

var TEMPLATE_DIR = __dirname + '/../code_templates';
var TYPES = ['actions', 'views', 'generic_actions', 'setups', 'static'];

module.exports.populateTemplates = function(type) {
  if (!type) return TYPES.forEach(module.exports.populateTemplates);
  Templates[type] = {};
  var tmpls = FS.readdirSync(Path.join(TEMPLATE_DIR, type));
  tmpls.forEach(function(tmpl) {
    var ext = Path.extname(tmpl);
    var name = Path.basename(tmpl, ext);
    var filename = Path.join(TEMPLATE_DIR, type, tmpl);
    if (type === 'views' || type === 'actions' || type === 'static') {
      var lang = name;
      var tmplsInner = FS.readdirSync(filename);
      tmplsInner.forEach(function(tmplInner) {
        ext = Path.extname(tmplInner);
        name = Path.basename(tmplInner, ext);
        var filenameInner = Path.join(TEMPLATE_DIR, type, lang, tmplInner);
        if (type === 'static') {
          Templates[type][lang] = Templates[type][lang] || {};
          Templates[type][lang][name] = FS.readFileSync(filenameInner, 'utf8');
        } else {
          Templates[type][name] = Templates[type][name] || {};
          Templates[type][name][lang] = FS.readFileSync(filenameInner, 'utf8');
        }
      })
    } else {
      Templates[type][name] = FS.readFileSync(filename, 'utf8');
    }
  });
}
module.exports.populateTemplates();
