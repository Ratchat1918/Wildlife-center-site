import { useState } from 'react';
import '/src/styles/Calendar.css';
const Calendar =()=>{
    const weekDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    const monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthDaysList=[];
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    const [currentMonth, setCurrentMonth] = useState(month); 
    const [currentYear, setCurrentYear] =useState(year);
    let lenOfMonth = new Date(currentYear, currentMonth+1,0).getDate();
    for(let x=0; x<lenOfMonth;x++){
        monthDaysList.push(String(x+1))
    };
    function monthBackwards(currentMonth: number){
        if(currentMonth==0){
            setCurrentMonth(11);
            setCurrentYear(currentYear-1)
        }else{
            setCurrentMonth(currentMonth-1)
        }
    };
    function monthForward(currentMonth: number){
        if(currentMonth==11){
            setCurrentMonth(0);
            setCurrentYear(currentYear+1)
        }else{
            setCurrentMonth(currentMonth+1)
        }
    };
    return(
    <>
    <div className="calendar-container">
        <header className="calendar-header" >
            <button onClick={()=>monthBackwards(currentMonth)}><img src='/src/assets/arrowLeft.svg'></img></button>
            <h1>{monthList[currentMonth]} {currentYear}</h1>
            <button onClick={()=>monthForward(currentMonth)}><img src='/src/assets/arrowRight.svg'></img></button>
        </header>
        <ul className="calendar-week">
            {weekDay.map((day)=><li key={day}>{day}</li>)}
        </ul>
        <ul className="month-dates">
            {monthDaysList.map((date)=><li key={`${monthList[currentMonth]}_${date}`} onClick={()=>console.log(date,currentMonth,currentYear)}>{date}</li>)}
        </ul>
    </div>
    </>
)
}
export default Calendar;