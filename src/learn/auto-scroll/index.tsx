import { Timeline } from "@xzdarcy/react-timeline-editor"
import { clone } from "ramda"
import React, { useState, useRef, useEffect } from "react"
import "./index.css"
import { mockData, mockEffect } from "./mock.js"

const defaultEditorData = clone(mockData)

export default function TimelineEditor() {
  const [data, setData] = useState(defaultEditorData)
  const [videoUrl, setVideoUrl] = useState("") // State to hold the video URL
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const videoRef = useRef(null)

  function CustomScale(props: { scale: number }) {
    const { scale } = props

    const minute = parseInt(scale / 60 + "")
    const second = ((scale % 60) + "").padStart(2, "0")

    return <>{`${minute}:${second}`}</>
  }

  const handleTrim = () => {
    alert(`Trimming video from ${startTime} to ${endTime?.toFixed(1)} seconds`)
  }

  const handleLoadedMetadata = () => {
    // @ts-ignore
    const duration = videoRef?.current?.duration
    setEndTime(duration) // Set the end time to video duration initially
  }

  useEffect(() => {
    const updatedData = clone(data)
    if (updatedData.length > 0 && updatedData[0].actions.length > 0) {
      updatedData[0].actions[0].start = startTime
      updatedData[0].actions[0].end = endTime || 5
    }
    setData(updatedData)
  }, [startTime, endTime])

  const handleTimelineChange = (newData: any) => {
    setData(newData)
    if (newData.length > 0 && newData[0].actions.length > 0) {
      const newStartTime = newData[0].actions[0].start
      const newEndTime = newData[0].actions[0].end
      setStartTime(newStartTime)
      setEndTime(newEndTime)
    }
  }

  return (
    <>
      <p className="text-7xl text-white font-medium m-auto text-center p-12">
        Video Timeline Editor
      </p>

      <div className="w-full m-auto text-center">
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mb-4 p-2 bg-slate-600 rounded w-full max-w-[300px]"
        />
      </div>
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          onLoadedMetadata={handleLoadedMetadata}
          className="mb-4 w-full max-w-[800px] m-auto text-center"
        />
      )}
      <div className="timeline-editor-container relative mt-14 ">
        <div className="flex text-white absolute -top-6 left-[210px] z-10">
          <p className="mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </p>
          <p>00:05 / 01:30</p>
        </div>
        <Timeline
          scale={1}
          scaleSplitCount={1}
          editorData={data}
          onChange={handleTimelineChange}
          effects={mockEffect}
          scaleWidth={40}
          minScaleCount={90}
          getScaleRender={(scale) => <CustomScale scale={scale} />}
          onActionMoveEnd={(data) => {
            console.log("Action move end", data)
          }}
          onActionResizeEnd={(data) => {
            console.log("Action resize end", data)
          }}
        />
      </div>
      <div className="trim-controls mt-4 text-center">
        <button
          onClick={handleTrim}
          className="ml-4 px-8 py-2 bg-blue-500 text-white rounded"
        >
          Trim Video
        </button>
      </div>
    </>
  )
}
