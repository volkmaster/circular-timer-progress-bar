/**
 * @file SVG-based native JS circular timer progress bar.
 * @author Ziga Vucko 2017-2024
 */

/**
 * @typedef {Object} CircularTimerProgressBarOptions
 * @property {SVGElement} container - The SVG element container (required)
 * @property {number} [widthContainer=300] - Width of the SVG container in pixels (optional, default 300)
 * @property {number} [heightContainer=300] - Height of the SVG container in pixels (optional, default 300)
 * @property {number} [strokeWidth] - Width of the timer progress bar in pixels (optional)
 * @property {string} [colorContainer] - Background color of the SVG container (optional)
 * @property {string} [colorCircle] - Stroke color of the circle (optional)
 * @property {string} [colorPath] - Stroke color of the progress path (optional)
 * @property {string} [colorText] - Fill color of the text (optional)
 * @property {string} [colorAlert] - Color of the text when under alert time (optional)
 * @property {number} [fontSize] - Font size of the text (optional)
 * @property {string} [fontFamily='sans-serif'] - Font family of the text (optional)
 */

/**
 * Creates an SVG-based circular timer progress bar, which functions like an actual timer.
 * @param {CircularTimerProgressBarOptions} options - Configuration options for the timer progress bar
 * @param {number} [nDecimals=0] - Number of decimal places for time left (optional, default 0)
 * @param {boolean} [displayText=true] - Whether to display the text inside the circle (optional, default true)
 * @param {boolean} [displayCircle=true] - Whether to display the circle progress (optional, default true)
 * @constructor
 */
function CircularTimerProgressBar(
  options,
  nDecimals = 0,
  displayText = true,
  displayCircle = true,
) {
  const width = options.widthContainer || 300
  const height = options.heightContainer || 300

  /**
   * @type {CustomSVGElement}
   */
  this.container = new CustomSVGElement(options.container, {
    width: width + "px",
    height: height + "px",
    style: "background-color: " + (options.colorContainer || "inherit"),
  })

  this.strokeWidth = options.strokeWidth

  /**
   * @type {CustomSVGElement}
   */
  this.circle = new CustomSVGElement("circle", {
    fill: "none",
    stroke: options.colorCircle || "lightgray",
  })
  this.container.appendChild(this.circle)

  /**
   * @type {CustomSVGElement}
   */
  this.path = new CustomSVGElement("path", {
    fill: "none",
    stroke: options.colorPath || "black",
    d: "",
  })
  this.container.appendChild(this.path)

  var isIE = false || !!document.documentMode
  var isEdge = !isIE && !!window.StyleMedia

  this.fontSize = options.fontSize || 0
  this.colorText = options.colorText || "black"

  /**
   * @type {CustomSVGElement}
   */
  this.text = new CustomSVGElement("text", {
    "fill": this.colorText,
    "text-anchor": "middle",
    "alignment-baseline": "middle",
    "dominant-baseline": "middle",
    "dy": (isEdge ? 0.6 : 0) + "ex",
    "font-family": options.fontFamily || "sans-serif",
  })
  this.container.appendChild(this.text)
  this.colorAlert = options.colorAlert || "red"

  this.nDecimals = nDecimals

  const shorter = width > height ? height : width

  this.cx = width / 2
  this.cy = height / 2
  this.r = (shorter / 2) * 0.85

  this.circle.set("cx", this.cx)
  this.circle.set("cy", this.cy)
  this.circle.set("r", this.r)
  this.circle.set("stroke-width", this.strokeWidth || shorter / 10)

  this.path.set("stroke-width", (this.strokeWidth || shorter / 10) + 1)

  this.text.set("font-size", (this.fontSize > 0 ? this.fontSize : shorter / 6) + "px")
  this.text.set("x", width / 2)
  this.text.set("y", height / 2)

  if (!displayCircle) {
    this.circle.set("visibility", "hidden")
    this.path.set("visibility", "hidden")
  }

  if (!displayText) {
    this.text.set("visibility", "hidden")
  } else {
    this.text.element().textContent = 100
  }

  this.running = false
}

/**
 * Converts polar coordinates to Cartesian coordinates.
 * @param {number} cx - X-coordinate of the center.
 * @param {number} cy - Y-coordinate of the center.
 * @param {number} r - Radius of the circle.
 * @param {number} degrees - Angle in degrees.
 * @returns {{x: number, y: number}} Cartesian coordinates.
 */
CircularTimerProgressBar.prototype.polarToCartesian = function (cx, cy, r, degrees) {
  const radians = ((degrees - 90) * Math.PI) / 180.0
  return {
    x: cx + r * Math.cos(radians),
    y: cy + r * Math.sin(radians),
  }
}

/**
 * Describes the arc path of the progress circle based on the angle.
 * @param {number} x - X-coordinate of the circle.
 * @param {number} y - Y-coordinate of the circle.
 * @param {number} r - Radius of the circle.
 * @param {number} startAngle - Start angle in degrees.
 * @param {number} endAngle - End angle in degrees.
 * @returns {string} A string describing the SVG arc path.
 */
CircularTimerProgressBar.prototype.describeArc = function (x, y, r, startAngle, endAngle) {
  const start = this.polarToCartesian(x, y, r, endAngle)
  const end = this.polarToCartesian(x, y, r, startAngle)
  const largeArcSweep = endAngle - startAngle <= 180 ? "0" : "1"

  return ["M", start.x, start.y, "A", r, r, 0, largeArcSweep, 0, end.x, end.y].join(" ")
}

/**
 * Calculates the time remaining based on the degrees of the arc.
 * @param {number} time - Total time in milliseconds.
 * @param {number} degrees - Current degrees of the arc.
 * @returns {number} The number of seconds left.
 */
CircularTimerProgressBar.prototype.secondsLeft = function (time, degrees) {
  return (time * (degrees / 360)) / 1000
}

/**
 * Formats the time left in seconds with the specified number of decimal places.
 * @param {number} seconds - Time left in seconds.
 * @param {number} nDecimals - Number of decimal places.
 * @returns {string} Formatted time string.
 */
CircularTimerProgressBar.prototype.formatTime = function (seconds, nDecimals) {
  return seconds.toFixed(nDecimals)
}

/**
 * Updates the timer frame by reducing the degrees of the arc and updating the displayed time.
 * @param {Object} context - The CircularTimerProgressBar instance context.
 */
CircularTimerProgressBar.prototype.frame = function (context) {
  if (context.degrees === 0) {
    if (context.infinite) {
      context.degrees = 360
    } else {
      clearInterval(context.id)
      context.running = false
    }
  } else {
    context.degrees--

    let d = 0
    if (context.infinite) {
      d = context.describeArc(
        context.cx,
        context.cy,
        context.r,
        context.degrees - 75,
        context.degrees,
      )
    } else {
      d = context.describeArc(context.cx, context.cy, context.r, context.degrees, 360)
    }
    context.path.set("d", d)
  }

  const seconds = context.secondsLeft(context.time, context.degrees)
  context.text.element().textContent = context.formatTime(seconds, context.nDecimals)

  if (context.alertTime > 0 && seconds < context.alertTime) {
    context.text.set("fill", context.colorAlert)
  }
}

/**
 * Runs the timer progress.
 * @param {number|string} time - Duration of the timer in milliseconds or "inf" for indefinite.
 * @param {number} [alertTime=0] - Alert time in milliseconds before the end (optional, default 0).
 */
CircularTimerProgressBar.prototype.run = function (time, alertTime = 0) {
  this.infinite = time === "inf"

  if (this.infinite) {
    this.text.set("visibility", "hidden")
  }
  this.text.set("fill", this.colorText)

  this.alertTime = alertTime / 1000

  this.time = this.infinite ? 3000 : time
  this.degrees = 360
  this.speed = this.time / this.degrees

  this.running = true
  this.id = setInterval(this.frame, this.speed, this)
}

/**
 * Tells whether the timer progress is currently running.
 * @returns {boolean} Whether the timer is running.
 */
CircularTimerProgressBar.prototype.isRunning = function () {
  return this.running
}

/**
 * Pauses the timer progress.
 */
CircularTimerProgressBar.prototype.pause = function () {
  this.running = false
  clearInterval(this.id)
}

/**
 * Tells whether the timer progress is paused.
 * @returns {boolean} Whether the timer is paused.
 */
CircularTimerProgressBar.prototype.isPaused = function () {
  return !this.running
}

/**
 * Resumes the timer progress after being paused.
 */
CircularTimerProgressBar.prototype.resume = function () {
  this.running = true
  this.id = setInterval(this.frame, this.speed, this)
}

/**
 * Helper class for creating and manipulating SVG elements.
 * @param {string|SVGElement} element - SVG element type (string) or an existing SVG element (object).
 * @param {!Object.<string, any>} options - An object containing attributes of the SVG element.
 * @constructor
 */
function CustomSVGElement(element, options) {
  if (typeof element === "string") {
    this.create(element)
  } else if (typeof element === "object") {
    this.wrap(element)
  }
  this.setBulk(options || null)
}

/**
 * Creates a new SVG element.
 * @param {string} element - The type of SVG element to create.
 */
CustomSVGElement.prototype.create = function (element) {
  this.elem = document.createElementNS("http://www.w3.org/2000/svg", element)
}

/**
 * Wraps an existing SVG element.
 * @param {Object} element - The existing SVG element.
 */
CustomSVGElement.prototype.wrap = function (element) {
  this.elem = element
}

/**
 * Retrieves an attribute from the SVG element.
 * @param {string} key - The attribute key.
 * @returns {string|null} The attribute value.
 */
CustomSVGElement.prototype.get = function (key) {
  return this.elem.getAttributeNS(null, key)
}

/**
 * Sets an attribute on the SVG element.
 * @param {string} key - The attribute key.
 * @param {string|number} val - The attribute value.
 */
CustomSVGElement.prototype.set = function (key, val) {
  this.elem.setAttributeNS(null, key, val)
}

/**
 * Sets multiple attributes on the SVG element.
 * @param {Object.<string, any>} options - An object containing attribute key-value pairs.
 */
CustomSVGElement.prototype.setBulk = function (options) {
  if (options !== null) {
    for (let key in options) {
      if (options.hasOwnProperty(key)) this.set(key, options[key])
    }
  }
}

/**
 * Adds a class to the SVG element.
 * @param {string} cls - The class name to add.
 */
CustomSVGElement.prototype.addClass = function (cls) {
  this.elem.classList.add(cls)
}

/**
 * Removes a class from the SVG element.
 * @param {string} cls - The class name to remove.
 */
CustomSVGElement.prototype.removeClass = function (cls) {
  this.elem.classList.remove(cls)
}

/**
 * Adds an event listener to the SVG element.
 * @param {string} type - The type of the event (e.g., 'click', 'mousemove').
 * @param {Function} func - The function to call when the event is triggered.
 */
CustomSVGElement.prototype.addEventListener = function (type, func) {
  this.elem.addEventListener(type, func)
}

/**
 * Removes an event listener from the SVG element.
 * @param {string} type - The type of the event to remove (e.g., 'click', 'mousemove').
 * @param {Function} func - The function to remove from the event listener.
 */
CustomSVGElement.prototype.removeEventListener = function (type, func) {
  this.elem.removeEventListener(type, func)
}

/**
 * Appends a child SVG element to this SVG element.
 * @param {CustomSVGElement} child - The child element to append.
 */
CustomSVGElement.prototype.appendChild = function (child) {
  this.elem.appendChild(child.element())
}

/**
 * Removes a child SVG element from this SVG element.
 * @param {CustomSVGElement} child - The child element to remove.
 */
CustomSVGElement.prototype.removeChild = function (child) {
  this.elem.removeChild(child.element())
}

/**
 * Returns the underlying SVG DOM element.
 * @returns {SVGElement} The DOM element wrapped by this CustomSVGElement instance.
 */
CustomSVGElement.prototype.element = function () {
  return this.elem
}

module.exports = CircularTimerProgressBar
