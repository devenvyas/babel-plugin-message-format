var resolve = require('path').resolve;
var formatMessage = require('format-message');

var setupFormatter = (function() {
  var instance;

  return function(translations, locale) {
    if(!!instance)
      return;

    var messages = translations.messages;

    instance = formatMessage.setup({
      translations: { [locale]: messages },
      locale: locale,
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
        if (path.node.callee.name !== '__')
          return;

        var translation_target = path.node.arguments[0].value;
        var { translations, locale } = loadLocaleData(opts.localeLoader);
        var translation_value;

        setupFormatter(translations, locale);
        translation_value = formatMessage(translation_target);

        path.replaceWith(t.StringLiteral(translation_value));
      },
    },
  };
};

