declare module "circular-timer-progress-bar" {
  interface CircularTimerProgressBarOptions {
    container: SVGElement
    widthContainer?: number
    heightContainer?: number
    strokeWidth?: number
    colorContainer?: string
    colorCircle?: string
    colorPath?: string
    colorText?: string
    colorAlert?: string
    fontSize?: number
    fontFamily?: string
  }

  class CircularTimerProgressBar {
    constructor(
      options: CircularTimerProgressBarOptions,
      nDecimals?: number,
      displayText?: boolean,
      displayCircle?: boolean,
    )
    run(time: number | string, alertTime?: number): void
    pause(): void
    resume(): void
    isRunning(): boolean
    isPaused(): boolean
  }

  export default CircularTimerProgressBar
}
