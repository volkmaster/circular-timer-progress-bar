/**
 * Helper class for creating and manipulating SVG elements.
 * @param {string|Object} element           SVG element type (string) or an existing SVG element (object)
 * @param {!Object.<string, any>} options   an object containing attributes of the SVG element
 * @constructor
 */
function SVGElement(element, options) {
    if (typeof(element) === 'string')
        this.create(element);
    else if (typeof(element) === 'object')
        this.wrap(element);
    this.setBulk(options || null);
}

SVGElement.prototype.create = function (element) {
    this.elem = document.createElementNS("http://www.w3.org/2000/svg", element);
};

SVGElement.prototype.wrap = function (element) {
    this.elem = element;
};

SVGElement.prototype.get = function (key) {
    return this.elem.getAttributeNS(null, key);
};

SVGElement.prototype.set = function (key, val) {
    this.elem.setAttributeNS(null, key, val);
};

SVGElement.prototype.setBulk = function (options) {
    if (options !== null) {
        for (var key in options) {
            if (options.hasOwnProperty(key))
                this.set(key, options[key]);
        }
    }
};

SVGElement.prototype.addClass = function (cls) {
    this.elem.classList.add(cls);
};

SVGElement.prototype.removeClass = function (cls) {
    this.elem.classList.remove(cls);
};

SVGElement.prototype.addEventListener = function (type, func) {
    this.elem.addEventListener(type, func);
};

SVGElement.prototype.removeEventListener = function (type, func) {
    this.elem.removeEventListener(type, func);
};

SVGElement.prototype.appendChild = function (child) {
    this.elem.appendChild(child.element());
};

SVGElement.prototype.removeChild = function (child) {
    this.elem.removeChild(child.element());
};

SVGElement.prototype.element = function () {
    return this.elem;
};