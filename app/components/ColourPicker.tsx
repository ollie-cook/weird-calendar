'use client'

import { useState } from "react";
import { CompactPicker } from 'react-color';
import { IoIosColorPalette } from "react-icons/io";
import { EventType } from "@/app/utils/types"

interface ColourPickerProps {
  event: EventType;
  setEvents: Function;
}

export default function ColourPicker(props: ColourPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateColour = (colour: any, event: any) => {
    props.setEvents((prev: EventType[]) => {
      const newEvents = [...prev];
      const index = newEvents.findIndex((event) => event.id === props.event.id);
      newEvents[index].colour = colour.hex;

      return newEvents
    })
  }

  return (
    <div className="relative h-full">
      <button onClick={() => setIsOpen(!isOpen)}><IoIosColorPalette className="h-6 w-6"/></button>
      {
        isOpen == true && 
        <CompactPicker 
          color={ props.event.colour }
          onChangeComplete={ updateColour }
          className="absolute top-2 right-1/2 translate-x-1/2 bg-white border border-gray-300 z-10" 
        />
      }

      </div>
    
  )
}

//