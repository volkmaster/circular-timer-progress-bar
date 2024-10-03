# circular-timer-progress-bar

> SVG-based circular timer progress bar based. Implemented in native JavaScript. Tested in Google Chrome, Mozilla Firefox, Safari, Microsoft Edge and Opera.

[![NPM](https://img.shields.io/npm/v/circular-timer-progress-bar.svg)](https://www.npmjs.com/package/circular-timer-progress-bar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

### npm

```bash
npm install --save circular-timer-progress-bar
```

### yarn

```bash
yarn add circular-timer-progress-bar
```

## Examples

Check out a live demo here: https://volkmaster.github.io/circular-timer-progress-bar/

You can use the timer by creating a `CircularTimerProgressBar` object and calling `run` function to start the execution. See the [documentation](#documentation) for additional information.

### HTML & Native JS

Every `CircularTimerProgressBar` class instance needs to be provided with an SVG container object, which functions as a placeholder for other SVG elements:

```html
<svg id="container"></svg>
```

1. Timer that runs infinitely:

<img src="https://i.imgur.com/qs4ePQi.png" alt="Example 1" width="100px"/>

```javascript
const timer = new CircularTimerProgressBar({
  container: document.getElementById("container"),
})
timer.run("inf")
```

2. Timer that runs for 5 seconds and displays the number of seconds left (color of text changes to alert color with only 2 seconds left) in the middle of the circle with additional options specified ([more](#options)):

<img src="https://i.imgur.com/SEI2guL.png" alt="Example 2" width="100px"/>

```javascript
const timer = new CircularTimerProgressBar({
  container: document.getElementById("container"),
  widthContainer: 200,
  heightContainer: 200,
  fontFamily: "GothamRounded-Bold",
})
timer.run(5000, 2000)
```

3. Timer that runs for 8 seconds without any text in the middle of the circle with additional options specified ([more](#options)):

```javascript
const timer = new CircularTimerProgressBar(
  {
    container: document.getElementById("container"),
    widthContainer: 250,
    heightContainer: 350,
    strokeWidth: 25,
    colorContainer: "#2c2c2c",
    colorCircle: "#c4c3c3",
    colorPath: "#5e5e5e",
  },
  0,
  false,
)
timer.run(8000)
```

<img src="https://i.imgur.com/qHqPhnH.png" alt="Example 3" width="100px"/>

4. An example of a timer that runs for 6 seconds with a hidden circle and displaying the number of seconds left (with 1 decimal place; color of text changes to alert color with only 2.5 seconds left) in the middle of the circle with additional options specified ([more](#options)):

```javascript
const timer = new CircularTimerProgressBar(
  {
    container: document.getElementById("container"),
    widthContainer: 150,
    heightContainer: 150,
    colorContainer: "#c0c0c0",
    colorAlert: "#dc143c",
    fontSize: 50,
    fontFamily: "GothamRounded-Book",
  },
  1,
  true,
  false,
)
timer.run(6000, 2500)
```

<img src="https://i.imgur.com/sKLGbGm.png" alt="Example 4" width="100px"/>

5. An example of a timer that runs for 7 seconds and displays the number of seconds left (with 2 decimal places) in the middle of the circle with additional options specified ([more](#options)):

```javascript
const timer = new CircularTimerProgressBar(
  {
    container: document.getElementById("container"),
    widthContainer: 300,
    heightContainer: 200,
    strokeWidth: 20,
    colorContainer: "#5e5e5e",
    colorCircle: "#c4c3c3",
    colorPath: "#2c2c2c",
    colorText: "#2c2c2c",
    fontFamily: "GothamRounded-Light",
  },
  2,
)
timer.run(7000)
```

<img src="https://i.imgur.com/e4QZYe0.png" alt="Example 5" height="100px"/>

### React

For more information check out the code in the `example` folder.

```tsx
import { useEffect, useRef } from "react"
import CircularTimerProgressBar from "circular-timer-progress-bar"

const Example = () => {
  const progressBarRef = useRef(null)

  useEffect(() => {
    if (progress.current) {
      new CircularTimerProgressBar(
        {
          container: progressBarRef.current,
          widthContainer: 300,
          heightContainer: 200,
          strokeWidth: 20,
          colorContainer: "#5e5e5e",
          colorCircle: "#c4c3c3",
          colorPath: "#2c2c2c",
          colorText: "#2c2c2c",
          fontFamily: "GothamRounded-Light",
        },
        2,
      ).run(7000)
    }
  }, [])

  return (
    <ProgressBar ref={progressBarRef} />
  )
}

export default Example
```

### <a name="documentation">Documentation</a>

> The **constructor** of the `CircularTimerProgressBar` class initializes the timer.

```javascript
CircularTimerProgressBar(options, nDecimals = 0, displayText = true, displayCircle = true)
```

- <a name="options">`options: CircularTimerProgressBarOptions`</a> object may contain the following attributes:

  - `container: SVGElement`: an SVG object, which functions as a placeholder for other SVG elements (required),
  - `widthContainer?: number`: width of the SVG placeholder in px (optional; default: 300px),
  - `heightContainer?: number`: height of the SVG placeholder in px (optional; default: 300px),
  - `strokeWidth?: number`: width of the timer progress bar in px (optional; default: 1/10 of the shortest of the container's dimensions),
  - `colorContainer?: string`: background color of the placeholder SVG element (optional; default: color inherited from parent),
  - `colorCircle?: string`: stroke color of the underlying circle SVG element (optional; default: lightgray),
  - `colorPath?: string`: stroke color of the path SVG element (optional; default: black),
  - `colorText?: string`: fill color of the text SVG element (optional; default: black),
  - `colorAlert?: string`: fill color of the text SVG element when time is under 3 seconds (optional; default: red),
  - `fontSize?: number`: size of the text font in px (optional; default: 1/6 of the shortest of the container's dimensions),
  - `fontFamily?: string`: font family of the text font (optional; default: sans-serif)

- `nDecimals?: number`: number of decimals of the text representing the time left (optional; default: 0)
- `displayText?: boolean`: flag indicating whether the text in the middle of the circle representing the time left (in seconds) is displayed (optional; default: true)
- `displayCircle?: boolean`: flag indicating whether the circle indicating progress is displayed (optional; default: true)

> The **`run`** function of the `CircularTimerProgressBar` class start the execution of the timer.

```javascript
run(time, alertTime = 0)
```

- `time: number | string`: number of milliseconds defining the timer duration (if 'inf', then the timer will be executed for indefinite duration; required)
- `alertTime?: number`: number of milliseconds defining how much time before the end of the timer should the text in the middle of the circle change its color (optional; default: 0)

> The **`pause`** function of the `CircularTimerProgressBar` class pauses the execution of the timer.

```javascript
pause()
```

> The **`resume`** function of the `CircularTimerProgressBar` class resumes the execution of the timer.

```javascript
resume()
```

> The **`isRunning`** function of the `CircularTimerProgressBar` class tells whether the timer is already running.

```javascript
isRunning()
```

> The **`isPaused`** function of the `CircularTimerProgressBar` class tells whether the timer is already paused.

```javascript
isPaused()
```
