
/**
 * Expose `cssPath`.
 */

module.exports = cssPath;

/**
 * Get full CSS path of any element.
 *
 * @param {Node} el
 * @return {String}
 */

function cssPath(el){
  var parentSelectors = [];
  var cssPathStr = '';
  var tagSelector;
  var cssClass;
  var tagName;
  var cssId;

  while (el) {
    tagName = el.tagName.toLowerCase();
    cssId = (el.id) ? ('#' + el.id) : false;
    cssClass = (el.className) ? ('.' + el.className.replace(/\s+/g, ".")) : '';

    if (cssId) {
      tagSelector = tagName + cssId + cssClass;
    } else if (cssClass) {
      tagSelector = tagName + cssClass;
    } else {
      tagSelector = tagName;
    }

    parentSelectors.unshift(tagSelector);
    el = el.parentNode !== document ? el.parentNode : false;
  }

  for (i = 0; i < parentSelectors.length; i++) {
    cssPathStr += ' ' + parentSelectors[i];
  }

  return cssPathStr.replace(/^[ \t]+|[ \t]+$/, '');
};
