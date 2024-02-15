'use client'

import { useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'; 
import { EventType } from "@/app/utils/types"

import { FaTrashCan } from "react-icons/fa6";
import ColourPicker from "./ColourPicker";

interface EventProps {
  event: EventType;
  setEvents: Function;
}

export default function Event(props: EventProps) {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rect = divRef.current?.getBoundingClientRect();

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

    const rect = divRef.current?.getBoundingClientRect();

    props.setEvents((prev: EventType[]) => {
      const newEvents = [...prev];
      const index = newEvents.findIndex((event) => event.id === props.event.id);
      newEvents[index].x = rect?.left.toString() || "";
      newEvents[index].y = rect?.top.toString() || "";

      return newEvents
    })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    props.setEvents((prev: EventType[]) => {
      const newEvents = [...prev];
      const index = newEvents.findIndex((event) => event.id === props.event.id);
      newEvents[index].title = e.target.value;

      return newEvents
    })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()

    props.setEvents((prev: EventType[]) => {
      const newEvents = [...prev];
      const index = newEvents.findIndex((event) => event.id === props.event.id);
      newEvents[index].description = e.target.value;

      return newEvents
    })
  }

  const handleDelete = () => {
    props.setEvents((prev: EventType[]) => {
      const newEvents = [...prev];
      console.log(newEvents)

      const index = newEvents.findIndex((event) => event.id === props.event.id);
      console.log(index)

      newEvents.splice(index, 1);
      console.log(newEvents)


      return newEvents
    })
  }

  const defaultX = parseInt(props.event.x) - parseInt(props.event.initialX);
  const defaultY = parseInt(props.event.y) - parseInt(props.event.initialY);
  console.log(props.event.x, props.event.y)
  console.log(defaultX, defaultY)

  return (
    <Draggable
      onStop={(e) => handleStop(e)}
      defaultPosition={{ x: defaultX, y: defaultY}}
    >
      <div ref={divRef} className="w-[10vw] aspect-[1.5] p-1" style={{backgroundColor: props.event.colour}}>
        <form className="flex flex-col justify-stretch h-full">
          <input 
            type="text" 
            value={props.event.title} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e)}
            className="bg-transparent text-black font-semibold"
          ></input>
          <textarea 
            value={props.event.description} 
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleDescriptionChange(e)}
            className="bg-transparent text-black text-sm w-full grow"
            style={{overflowWrap: "break-word", resize: "none"}}
          ></textarea>
        </form>
        <div className="w-full h-6 flex justify-end items-center">
          <ColourPicker setEvents={props.setEvents} event={props.event}/>
          <button onClick={handleDelete}>
            <FaTrashCan className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </Draggable>
  )
}

//defaultPosition={{ x: parseInt(props.event.x), y: parseInt(props.event.y) }}
//defaultPosition={{ x: parseInt(props.event.x) - parseInt(props.event.initialX), y: parseInt(props.event.y) - parseInt(props.event.initialY) }}