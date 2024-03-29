'use client'

import { useState, useEffect } from "react";
import Event from "./Event"
import { EventType } from "@/app/utils/types"
import Cookies from 'js-cookie'
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Week() {
  const [events, setEvents] = useState<EventType[]>([])
  const [fetchedCookies, setFetchedCookies] = useState(false)

  useEffect(() => {
    const cookieEvents = Cookies.get('week-1-events')
    if (cookieEvents) {
      setEvents(JSON.parse(cookieEvents))
    }
    setFetchedCookies(true)
  }, [])

  useEffect(() => {
    if (!fetchedCookies) return
    Cookies.set('week-1-events', JSON.stringify(events), { expires: 7 })
  }, [events])

  const addEvent = () => {
    const guid = crypto.randomUUID()
    const emptyEvent: EventType = {
      id: guid,
      title: "",
      description: "",
      x: "0",
      y: "0",
      initialX: "0",
      initialY: "0",
      initialsSet: false,
      colour: "#67e8f9"
    }

    setEvents(prev => [...prev, emptyEvent])
  }

  return (
    <div className="w-11/12">
      <div className="w-full h-36 flex items-center gap-6">
        <button onClick={() => addEvent()} className="bg-amber-400 p-2 rounded-lg text-lg font-bold flex items-center gap-1 hover:bg-amber-500">Add Event <IoIosAddCircleOutline className="inline h-8 w-8" /></button>
        {
          events.map((event, index) => (
            <Event key={index} setEvents={setEvents} event={event} />
          ))
        }
      </div>
      <img src="/week-view.png" alt="Week view" className="w-full" />
    </div>
  )
}