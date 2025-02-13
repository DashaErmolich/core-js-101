/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  // throw new Error('Not implemented');
  this.width = width;
  this.height = height;
  this.getArea = function getArea() {
    return this.width * this.height;
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // throw new Error('Not implemented');
  const object = JSON.parse(json);
  const values = Object.values(object);
  return new proto.constructor(...values);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class MySuperBaseElementSelector {
  constructor() {
    this.selector = [];
    this.elements = [];
    this.ids = [];
    this.pseudoElements = [];
    this.arranging = [];
  }

  element(value) {
    if (!this.elements.length) {
      this.selector.push(`${value}`);
      this.elements.push(`${value}`);
      this.arranging.push('element');
    } else {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.arranging.length > 1 && this.arranging[this.arranging.length - 2] !== 'element') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    return this;
  }

  id(value) {
    if (!this.ids.length) {
      this.selector.push(`#${value}`);
      this.ids.push(`#${value}`);
      this.arranging.push('id');
    } else {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.arranging.length > 1 && this.arranging[this.arranging.length - 2] !== 'element') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    return this;
  }

  class(value) {
    this.selector.push(`.${value}`);
    this.arranging.push('class');
    if (this.arranging.length > 1
    && this.arranging[this.arranging.length - 2] !== 'element'
    && this.arranging[this.arranging.length - 2] !== 'id'
    && this.arranging[this.arranging.length - 2] !== 'class') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    return this;
  }

  attr(value) {
    this.selector.push(`[${value}]`);
    this.arranging.push('attr');
    if (this.arranging.length > 1
    && this.arranging[this.arranging.length - 2] !== 'element'
    && this.arranging[this.arranging.length - 2] !== 'id'
    && this.arranging[this.arranging.length - 2] !== 'class'
    && this.arranging[this.arranging.length - 2] !== 'attr') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    return this;
  }

  pseudoClass(value) {
    this.selector.push(`:${value}`);
    this.arranging.push('pseudoClass');
    if (this.arranging.length > 1
    && this.arranging[this.arranging.length - 2] !== 'element'
    && this.arranging[this.arranging.length - 2] !== 'id'
    && this.arranging[this.arranging.length - 2] !== 'class'
    && this.arranging[this.arranging.length - 2] !== 'attr'
    && this.arranging[this.arranging.length - 2] !== 'pseudoClass') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    return this;
  }

  pseudoElement(value) {
    if (!this.pseudoElements.length) {
      this.selector.push(`::${value}`);
      this.pseudoElements.push(`::${value}`);
      this.arranging.push('pseudoElement');
    } else {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.arranging.length > 1
    && this.arranging[this.arranging.length - 2] !== 'element'
    && this.arranging[this.arranging.length - 2] !== 'id'
    && this.arranging[this.arranging.length - 2] !== 'class'
    && this.arranging[this.arranging.length - 2] !== 'attr'
    && this.arranging[this.arranging.length - 2] !== 'pseudoClass') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.selector = [...selector1.selector, ' ', combinator, ' ', ...selector2.selector];
    return this;
  }

  stringify() {
    return this.selector.join('');
  }
}

const cssSelectorBuilder = {

  element(value) {
    // throw new Error('Not implemented');
    const newBuilder = new MySuperBaseElementSelector();
    newBuilder.element(value);
    return newBuilder;
  },

  id(value) {
    // throw new Error('Not implemented');
    const newBuilder = new MySuperBaseElementSelector();
    newBuilder.id(value);
    return newBuilder;
  },

  class(value) {
    // throw new Error('Not implemented');
    const newBuilder = new MySuperBaseElementSelector();
    newBuilder.class(value);
    return newBuilder;
  },

  attr(value) {
    // throw new Error('Not implemented');
    const newBuilder = new MySuperBaseElementSelector();
    newBuilder.attr(value);
    return newBuilder;
  },

  pseudoClass(value) {
    // throw new Error('Not implemented');
    const newBuilder = new MySuperBaseElementSelector();
    newBuilder.pseudoClass(value);
    return newBuilder;
  },

  pseudoElement(value) {
    // throw new Error('Not implemented');
    const newBuilder = new MySuperBaseElementSelector();
    newBuilder.pseudoElement(value);
    return newBuilder;
  },

  combine(selector1, combinator, selector2) {
    // throw new Error('Not implemented');
    const combineBuilder = new MySuperBaseElementSelector();
    combineBuilder.combine(selector1, combinator, selector2);
    return combineBuilder;
  },

  stringify() {
    this.stringify();
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
