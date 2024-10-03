import { useEffect, useRef } from "react"
import styled from "styled-components"
import CircularTimerProgressBar from "circular-timer-progress-bar"

const App = () => {
  const progressBarRef1 = useRef(null)
  const progressBarRef2 = useRef(null)
  const progressBarRef3 = useRef(null)
  const progressBarRef4 = useRef(null)
  const progressBarRef5 = useRef(null)

  useEffect(() => {
    if (progressBarRef1.current) {
      new CircularTimerProgressBar({ container: progressBarRef1.current }).run("inf")
    }

    if (progressBarRef2.current) {
      new CircularTimerProgressBar(
        {
          container: progressBarRef2.current,
          widthContainer: 200,
          heightContainer: 200,
          fontFamily: "GothamRounded-Bold",
        },
        1,
      ).run(5000, 2000)
    }

    if (progressBarRef3.current) {
      new CircularTimerProgressBar(
        {
          container: progressBarRef3.current,
          widthContainer: 250,
          heightContainer: 350,
          strokeWidth: 25,
          colorContainer: "#2c2c2c",
          colorCircle: "#c4c3c3",
          colorPath: "#5e5e5e",
        },
        0,
        false,
      ).run(8000)
    }

    if (progressBarRef4.current) {
      new CircularTimerProgressBar(
        {
          container: progressBarRef4.current,
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
      ).run(6000, 2500)
    }

    if (progressBarRef5.current) {
      new CircularTimerProgressBar(
        {
          container: progressBarRef5.current,
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
    <>
      <ProgressBar ref={progressBarRef1} />
      <ProgressBar ref={progressBarRef2} />
      <ProgressBar ref={progressBarRef3} />
      <ProgressBar ref={progressBarRef4} />
      <ProgressBar ref={progressBarRef5} />
    </>
  )
}

const ProgressBar = styled.svg`
  margin: 0 30px;
`

export default App
