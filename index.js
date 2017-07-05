var resolve = require('path').resolve;
var formatMessage = require('format-message');

var setupFormatter = (function() {
  var instance;

  return function(translations, locale) {
    if(!!instance)
      return;

    var messages = translations.messages;

    instance = formatMessage.setup({
      translations: { 'id-id': messages },
      locale: 'id-id',
      missingTranslation: 'ignore'
    });

    return;
  }
})();

var loadLocaleData = function(localeLoader) {
  localeLoader = require(resolve(process.cwd(), localeLoader));

  return localeLoader();
}

module.exports = function messageFormat({ types: t }) {
  return {
    visitor: {
      CallExpression(path, { opts }) {
        var callee = path.node.callee.name;
        var translation_target = path.node.arguments[0].value;
        var translation_value = formatMessage(translation_target);
        var { translations, locale } = loadLocaleData(opts.localeLoader);

        setupFormatter(translations, locale);

        if (callee === '__') {
          path.replaceWith(t.StringLiteral(translation_value));
        }
      },
    },
  };
};

