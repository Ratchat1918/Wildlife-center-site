import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { getResarvations } from '../utils';
import '../style.css'
const Calendar =()=>{
    const weekDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    const monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthDaysList=[];
    const currentMonth =new Date().getMonth(); 
    const currentYear =new Date().getFullYear();
    const currentDay =new Date().getDate();
    let lenOfMonth = new Date(currentYear, currentMonth+1,0).getDate();
    const [selectedDay, setSelecteDay] = useState(currentDay);
    const [selectedMonth, setSelecteMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    console.log(selectedMonth, selectedDay, selectedYear)
    let datesArray: string[] = [];
    for(let x=0; x<lenOfMonth;x++){
        monthDaysList.push(String(x+1))
    };
    console.log(monthDaysList)
    const fillResarvationArray = async ()=>{
        let resravationsArray = await getResarvations();
        if(resravationsArray){
            resravationsArray.forEach((resarvation)=>{
                datesArray.push(resarvation.date)
            })
            console.log(datesArray)
        }
    }
    useEffect(()=>{
        fillResarvationArray();
    },[]);
    function monthBackwards(selectedMonth: number){
        if(selectedMonth==0){
            setSelecteMonth(11);
            setSelectedYear(selectedYear-1)
        }else{
            setSelecteMonth(selectedMonth-1)
        }
    };
    function monthForward(selectedMonth: number){
        if(selectedMonth==11){
            setSelecteMonth(0);
            setSelectedYear(selectedYear+1)
        }else{
            setSelecteMonth(selectedMonth+1)
        }
    };
    function chooseDay(day:any, month:number, year:number){
        let newSelectedDay = Number(day)
        setSelecteDay(newSelectedDay);
        setSelecteMonth(month);
        setSelectedYear(year);
    }
    return(
    <>
    <Navbar/>
    <div className="tickets-container">
        <div className="calendar-container">
            <header className="calendar-header" >
                <button className='calendar-button' onClick={()=>monthBackwards(selectedMonth)}><img className='arrows' src='/src/assets/arrowLeft.svg'></img></button>
                <h1>{monthList[selectedMonth]} {selectedYear}</h1>
                <button className='calendar-button' onClick={()=>monthForward(selectedMonth)}><img className='arrows' src='/src/assets/arrowRight.svg'></img></button>
            </header>
            <ul className="calendar-week">
                {weekDay.map((day)=><li key={day}>{day}</li>)}
            </ul>
            <ul className="month-dates">
                {monthDaysList.map((day)=>{
                    if(Number(day)==selectedDay && currentMonth===selectedMonth && currentYear===selectedYear){
                        return<li className='calendar-date-chosen' key={`${monthList[currentMonth]}_${day}`} onClick={()=>chooseDay(day,currentMonth,currentYear)}>{day}</li>
                    }else if(selectedYear<currentYear || selectedMonth<currentMonth || Number(day)<currentDay && selectedYear<currentYear && selectedMonth<currentMonth){
                        return<li className='calendar-date-past' key={`${monthList[currentMonth]}_${day}`}>{day}</li>
                    }else{
                        return<li className='calendar-date' key={`${monthList[currentMonth]}_${day}`} onClick={()=>chooseDay(day,currentMonth,currentYear)}>{day}</li>
                    }
                })}
            </ul>
        </div>
        <div className="purchase-container">
            
        </div>
    </div>
    <Footer />
    </>
)
}
export default Calendar;