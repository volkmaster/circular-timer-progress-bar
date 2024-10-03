import { useEffect, useRef } from "react"
import styled from "styled-components"
import CircularTimerProgressBar from "circular-timer-progress-bar"

const App = () => {
  const progress1 = useRef(null)
  const progress2 = useRef(null)
  const progress3 = useRef(null)
  const progress4 = useRef(null)
  const progress5 = useRef(null)

  useEffect(() => {
    if (progress1.current) {
      new CircularTimerProgressBar({ container: progress1.current }).run("inf")
    }

    if (progress2.current) {
      new CircularTimerProgressBar(
        {
          container: progress2.current,
          widthContainer: 200,
          heightContainer: 200,
          fontFamily: "GothamRounded-Bold",
        },
        1,
      ).run(5000, 2000)
    }

    if (progress3.current) {
      new CircularTimerProgressBar(
        {
          container: progress3.current,
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

    if (progress4.current) {
      new CircularTimerProgressBar(
        {
          container: progress4.current,
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

    if (progress5.current) {
      new CircularTimerProgressBar(
        {
          container: progress5.current,
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
      <ProgressBar ref={progress1} />
      <ProgressBar ref={progress2} />
      <ProgressBar ref={progress3} />
      <ProgressBar ref={progress4} />
      <ProgressBar ref={progress5} />
    </>
  )
}

const ProgressBar = styled.svg`
  margin: 0 30px;
`

export default App
