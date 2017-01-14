# Timer Progress
Circular timer progress bar based on SVG. Implemented using native JavaScript. All web browsers are supported. A small demo of the functionality is included in the project (```demo.js``` and ```index.html``` files).

## Instructions
To use the functionality put ```<script src="timer-progress.js"></script>``` inside the ```<head>``` tag in your HTML file.

You can use the timer by creating a TimerProgress object (with [options](#options) parameter) and calling [run](#run) function. 

Every options object needs to contain a 'container' parameter representing an SVG object, which functions as a placeholder for other SVG elements (its width and height need to be set):

```
<svg id="container" width="500" height="500"></svg>
```

An example of a timer that runs infinitely ([more](#run)):
```
var timer = new TimerProgress({
    'container': document.getElementById('container')
});
timer.run('inf');
```
An example of a timer that runs for 5 seconds and displays the number of seconds left (with 1 decimal place) in the middle of the circle ([more](#run)):
```
var timer = new TimerProgress({
    'container': document.getElementById('container')
})
timer.run(5000, true, 1);
```
An example of a timer that runs for 10 seconds without any text in the middle of the circle ([more](#run)) with additional options specified ([more](#options)):
```
var timer = new TimerProgress({
    'container': document.getElementById('container'),
    'stroke-width': 35,
    'color-container': '#2c2c2c',
    'color-circle': '#c4c3c3',
    'color-path': '#5e5e5e',
    'color-text': '#c4c3c3'
})
timer.run(10000, false);
```
An example of a timer that runs for 6 seconds and displays the number of seconds left (with 2 decimal places) in the middle of the circle ([more](#run)) with additional options specified ([more](#options)):
```
var timer = new TimerProgress({
    'container': document.getElementById('container'),
    'stroke-width': 35,
    'color-container': '#5e5e5e',
    'color-circle': '#c4c3c3',
    'color-path': '#2c2c2c',
    'color-text': '#2c2c2c'
})
timer.run(7000, true, 2);
```

### <a name="options">Options</a>
The **options** object passed to the TimerProgress class constructor may containin the following attributes:
* _container_: an SVG object, which functions as a placeholder for other SVG elements with dimensions already set (obligatory)
* _stroke-width_: width of the timer progress bar in px (optional)
* _color-container_: background color of the placeholder SVG element (optional; default: white)
* _color-circle_: stroke color of the underlying circle SVG element (optional; default: lightgray)
* _color-path_: stroke color of the path SVG element (optional; default: black)
* _color-text_: fill color of the text SVG element (optional; default: black)
* _font-size_: size of the text font in px (optional)
* _font-family_: font familiy of the text font (optional; default: sans-serif)

### <a name="run">Run</a>
The **run** function of the TimerProgress class may containin the following attributes:
* _time_: number of milliseconds defining the timer duration (if 'inf', then the timer will be executed for indefinite duration; compulsory)
* _displayText_: flag indicating whether the text in the middle of the circle representing time left (in seconds) is displayed (optional; default: true)
* _nDecimals_: number of decimals of the text representing the time left (optional; default: 0)
