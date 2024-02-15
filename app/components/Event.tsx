'use client'

import { useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'; 
import { EventType } from "@/app/utils/types"

interface EventProps {
  event: EventType;
  setEvents: Function;
}

export default function Event(props: EventProps) {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rect = divRef.current?.getBoundingClientRect();
    console.log(rect?.top, rect?.left);

    if(props.event.initialsSet == false) {
      props.setEvents((prev: EventType[]) => {
        const newEvents = [...prev];
        const index = newEvents.findIndex((event) => event.id === props.event.id);
        newEvents[index].initialX = rect?.left.toString() || "";
        newEvents[index].initialY = rect?.top.toString() || "";
        newEvents[index].initialsSet = true;
  
        return newEvents
      })
    }
  }, [])

  const handleStop = (e: any) => {
    console.log(e)

    const rect = divRef.current?.getBoundingClientRect();
    console.log(rect?.top, rect?.left);

    props.setEvents((prev: EventType[]) => {
      const newEvents = [...prev];
      const index = newEvents.findIndex((event) => event.id === props.event.id);
      newEvents[index].x = rect?.left.toString() || "";
      newEvents[index].y = rect?.top.toString() || "";

      return newEvents
    })
  }

  const defaultX = parseInt(props.event.x) - parseInt(props.event.initialX);
  const defaultY = parseInt(props.event.y) - parseInt(props.event.initialY);
  console.log(props.event)
  console.log('defaultX', defaultX, 'defaultY', defaultY)

  return (
    <Draggable
      onStop={(e) => handleStop(e)}
      defaultPosition={{ x: defaultX, y: defaultY}}
    >
      <div ref={divRef} className="w-[10vw] h-32 bg-blue-300">
        {parseInt(props.event.x)} <br/>
        {parseInt(props.event.y)}
      </div>
    </Draggable>
  )
}

//defaultPosition={{ x: parseInt(props.event.x), y: parseInt(props.event.y) }}
//defaultPosition={{ x: parseInt(props.event.x) - parseInt(props.event.initialX), y: parseInt(props.event.y) - parseInt(props.event.initialY) }}