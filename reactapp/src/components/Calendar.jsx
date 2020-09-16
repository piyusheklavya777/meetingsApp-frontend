import React, { useEffect, useState } from 'react';
import { calendarService } from '../services/services';
import DatePicker from 'react-date-picker';

import './Calendar.css'

function Calendar() {
    const [meetings, setMeetings] = useState(null);
    const[date, setDate] = useState((new Date()))

    

    useEffect(()=> {
      fetchData()
    },[date])

    const fetchData = async () => {
      console.log(date.toDateString())
        await calendarService(date.toDateString()).then(data=>{
            setMeetings(data);
        })
    }

    return (
        <div className="calendar-container">
          <p className="calendar-header-text">Calendar</p>
          <hr/>
    
      <div>
        <button className="calendar-selectdate-btn" onClick={fetchData}>
          Select Date
        </button>
      </div>
      <div>
          <DatePicker
            onChange={setDate}
            value={date}
            />
      </div>

      {/*_ Display data from API _*/}
     
      <div className="meets">
        {meetings &&
          meetings.map((meeting, index) => {

            return (
              <div className="book" key={index}>
                
                <h2>{meeting.title}</h2>

                <div className="details">
                  <p> {meeting.description}</p>
                  <p> {meeting.MeetingDate}</p>
                </div>
              </div>
            );
          })}
      </div>
     </div>


    )
}

export default Calendar;
   
    