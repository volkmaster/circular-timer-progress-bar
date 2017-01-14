/**
 * @file        SVG-based native JS circular timer progress bar.
 * @author      Ziga Vucko 2017
 */

/**
 * Creates an SVG-based circular timer progress bar, which functions like an actual timer.
 * @param {!Object.<string, any>} options   an object containing attributes of timer progress bar:
 *                                              'container': an SVG object, which functions as a placeholder for other SVG elements with dimensions already set (obligatory),
 *                                              'stroke-width': width of the timer progress bar in px (optional),
 *                                              'color-container': background color of the placeholder SVG element (optional; default: white),
 *                                              'color-circle': stroke color of the underlying circle SVG element (optional; default: lightgray),
 *                                              'color-path': stroke color of the path SVG element (optional; default: black),
 *                                              'color-text': fill color of the text SVG element (optional; default: black),
 *                                              'font-size': size of the text font in px (optional),
 *                                              'font-family': font familiy of the text font (optional; default: sans-serif)
 *                                  
 * @constructor
 */
function TimerProgress (options) {
    this.container = new SVGElement(options['container'], {
        'style': 'background-color: ' + options['color-container'] || 'white'
    });

    var width = this.container.element().clientWidth || this.container.element().parentNode.clientWidth;
    var height = this.container.element().clientHeight || this.container.element().parentNode.clientHeight;
    var shorter =  width > height ? height : width;
    this.cx = width / 2;
    this.cy = height / 2;
    this.r = (shorter / 2) * (2 / 3);

    this.circle = new SVGElement('circle', {
        'cx': this.cx,
        'cy': this.cy,
        'r': this.r,
        'fill': 'none',
        'stroke': options['color-circle'] || 'lightgray',
        'stroke-width': options['stroke-width'] || shorter / 10
    });
    this.container.appendChild(this.circle);

    this.path = new SVGElement('path', {
        'fill': 'none',
        'stroke': options['color-path'] || 'black',
        'stroke-width': (options['stroke-width'] || shorter / 10) + 1,
        'd': ''
    });
    this.container.appendChild(this.path);

    this.text = new SVGElement('text', {
        'x': width / 2,
        'y': (height / 2) * 1.08,
        'fill': options['color-text'] || 'black',
        'text-anchor': 'middle',
        'font-size': options['font-size'] || shorter / 6 + 'px',
        'font-family': options['font-family'] || 'sans-serif'
    });
    this.container.appendChild(this.text);
}

TimerProgress.prototype.polarToCartesian = function (cx, cy, r, deg) {
    var rad = (deg - 90) * Math.PI / 180.0;
    return {
        x: cx + (r * Math.cos(rad)),
        y: cy + (r * Math.sin(rad))
    };
};

TimerProgress.prototype.describeArc = function (x, y, r, startAngle, endAngle) {
    var start = this.polarToCartesian(x, y, r, endAngle);
    var end = this.polarToCartesian(x, y, r, startAngle);
    var largeArcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    return [
        'M', start.x, start.y,
        'A', r, r, 0, largeArcSweep, 0, end.x, end.y
    ].join(' ');
};

/**
 * Runs the timer progress.
 * @param {number|string} time      number of milliseconds defining the timer duration (if 'inf', then the timer will be executed for indefinite duration; compulsory)
 * @param {boolean} displayText     flag indicating whether the text in the middle of the circle representing the time left (in seconds) is displayed (optional; default: true)
 * @param {number} nDecimals        number of decimals of the text representing the time left (optional; default: 0)
 */
TimerProgress.prototype.run = function (time, displayText, nDecimals) {
    var inf = time === 'inf';

    displayText = inf ? false : displayText !== false;
    if (!displayText)
        this.text.set('visibility', 'hidden');

    nDecimals = nDecimals || 0;

    var time = inf ? 2000 : time;
    var deg = 360;
    var speed = time / deg;
    var id = setInterval(frame, speed, this);

    function frame(context) {
        if (deg == 0) {
            if (inf)
                deg = 360;
            else
                clearInterval(id);
        } else {
            deg--;
            context.path.set('d', context.describeArc(context.cx, context.cy, context.r, deg, 360));
        }
        context.text.element().textContent = (time * (deg / 360) / 1000).toFixed(nDecimals);
    }
};

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