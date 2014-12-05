
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

function cssPath (el) {
  var fullPath = 0, // Set to 1 to build ultra-specific full CSS-path, or 0 for optimised selector
  useNthChild = 0, // Set to 1 to use ":nth-child()" pseudo-selectors to match the given element
  cssPathStr = '',
  testPath = '',
  parents = [],
  parentSelectors = [],
  tagName,
  cssId,
  cssClass,
  tagSelector,
  vagueMatch,
  nth,
  i,
  c;

  // Go up the list of parent nodes and build unique identifier for each:
  while (el) {
    vagueMatch = 0;

    // Get the node's HTML tag name in lowercase:
    tagName = el.nodeName.toLowerCase();

    // Get node's ID attribute, adding a '#':
    cssId = (el.id) ? ('#' + el.id) : false;

    // Get node's CSS classes, replacing spaces with '.':
    cssClass = (el.className) ? ('.' + el.className.replace(/\s+/g, ".")) : '';

    // Build a unique identifier for this parent node:
    if (cssId) {
      // Matched by ID:
      tagSelector = tagName + cssId + cssClass;
    } else if (cssClass) {
      // Matched by class (will be checked for multiples afterwards):
      tagSelector = tagName + cssClass;
    } else {
      // Couldn't match by ID or class, so use ":nth-child()" instead:
      vagueMatch = 1;
      tagSelector = tagName;
    }

    // Add this full tag selector to the parentSelectors array:
    parentSelectors.unshift(tagSelector)

    // If doing short/optimised CSS paths and this element has an ID, stop here:
    if (cssId && !fullPath)
      break;

      // Go up to the next parent node:
      el = el.parentNode !== document ? el.parentNode : false;

    } // endwhile

    // Build the CSS path string from the parent tag selectors:
    for (i = 0; i < parentSelectors.length; i++) {
      cssPathStr += ' ' + parentSelectors[i]; // + ' ' + cssPathStr;

      // If using ":nth-child()" selectors and this selector has no ID / isn't the html or body tag:
      if (useNthChild && !parentSelectors[i].match(/#/) && !parentSelectors[i].match(/^(html|body)$/)) {

        // If there's no CSS class, or if the semi-complete CSS selector path matches multiple elements:
        if (!parentSelectors[i].match(/\./) || $(cssPathStr).length > 1) {

          // Count element's previous siblings for ":nth-child" pseudo-selector:
          for (nth = 1, c = el; c.previousElementSibling; c = c.previousElementSibling, nth++);

          // Append ":nth-child()" to CSS path:
          cssPathStr += ":nth-child(" + nth + ")";
        }
      }

    }

    // Return trimmed full CSS path:
    return cssPathStr.replace(/^[ \t]+|[ \t]+$/, '');
  }
