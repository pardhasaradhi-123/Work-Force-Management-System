import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const ShiftSchedule = () => {
  // Total timeline hours (24 hours, from 0:00 to 12:00 AM)
  const totalHours = 24;

  // Sample shift data with initial positions in percentage
  const initialShifts = [
    { name: "Kanishk", start: 0, width: 20 }, // width as percentage of time slot
    { name: "Ashik", start: 10, width: 20 },
    { name: "Lalith", start: 13, width: 20 },
    { name: "Pardhu", start: 15, width: 20 },
    { name: "Karthik", start: 20, width: 20 },
    { name: "ABC", start: 5, width: 20 },
    { name: "Srujan", start: 1, width: 20 },
  ];

  // Store the shifts' positions in state
  const [shifts, setShifts] = useState(initialShifts);

  // Create a ref for the container element to get its width
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update the container width once the component is mounted
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  // Convert position (percentage) to time (in hours)
  const convertToTime = (percentage) => {
    const hours = (percentage / 100) * totalHours;
    const hourPart = Math.floor(hours);
    const minutePart = Math.round((hours - hourPart) * 60);

    const formattedTime = `${hourPart % 12 || 12}:${minutePart
      .toString()
      .padStart(2, "0")} ${hourPart >= 12 ? "PM" : "AM"}`;

    return formattedTime;
  };

  // Handle drag events
  const handleDrag = (index, deltaX, shiftWidth) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift, i) =>
        i === index
          ? {
              ...shift,
              start: Math.max(
                0,
                Math.min(shift.start + deltaX, 100 - shiftWidth)
              ), // constrain dragging to container width
            }
          : shift
      )
    );
  };

  return (
    <>
      <div className="p-4 w-full bg-white rounded-lg">
        <h1 className="text-lg font-bold mb-4">Shift Schedule</h1>
        <div className="flex flex-col w-full">
          {/* Time Labels */}
          <div className="flex justify-between mb-2 text-xs text-gray-500 border-b-2 border-gray-500">
            <span className="capitalize text-black text-lg font-semibold">
              team
            </span>
            <span>0:00 AM</span>
            <span>3:00 AM</span>
            <span>6:00 AM</span>
            <span>9:00 AM</span>
            <span>12:00 PM</span>
            <span>3:00 PM</span>
            <span>6:00 PM</span>
            <span>9:00 PM</span>
            <span>12:00 AM</span>
          </div>

          {/* Shift Bars */}
          <div className="flex flex-col gap-2" ref={containerRef}>
            {shifts.map((shift, index) => {
              // Calculate start and end time
              const startTime = convertToTime(shift.start);
              const endTime = convertToTime(shift.start + shift.width);

              return (
                <div key={index} className="flex items-center">
                  {/* Name */}
                  <span className="w-24 font-medium">{shift.name}</span>

                  {/* Draggable Shift Bar */}
                  <div className="relative w-full h-8 rounded-md ml-4">
                    <Draggable
                      axis="x"
                      bounds="parent"
                      onDrag={(e, data) =>
                        handleDrag(
                          index,
                          (data.deltaX / containerWidth) * 100,
                          shift.width
                        )
                      }
                      position={{
                        x: (shift.start / 100) * containerWidth,
                        y: 0,
                      }} // x is adjusted by start percentage
                    >
                      <div
                        className="absolute h-8 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 cursor-move"
                        style={{
                          left: `${shift.start}%`,
                          width: `${shift.width}%`,
                        }}
                      >
                        {/* Display Start and End Time inside the shift container */}
                        <div className="text-white text-xs p-1">
                          {startTime} - {endTime}
                        </div>
                      </div>
                    </Draggable>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-indigo-500 p-2 px-4 m-2 rounded-md font-medium uppercase hover:bg-indigo-600 hover:text-white hover:rounded-full">
          save
        </button>
      </div>
    </>
  );
};

export default ShiftSchedule;
