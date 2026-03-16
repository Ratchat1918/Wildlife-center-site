import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style.css'
//import resource1 from  '../assets/resource1.jpg'
//import resource2 from  '../assets/resource2.jpg'
//import resource3 from '../assets/resource3.jpg'

const About = () =>{
    const navigate = useNavigate();
    const [slides, setSlides] = useState([
        {"id":"slide1","h1":"Header 1", "p":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque inventore id nihil. Distinctio vero, eaque facilis adipisci sit, aliquam aspernatur quaerat eveniet dignissimos dolorum esse ipsa, placeat quos voluptate. Natus!"},
        {"id":"slide2","h1":"Header 2", "p":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque inventore id nihil. Distinctio vero, eaque facilis adipisci sit, aliquam aspernatur quaerat eveniet dignissimos dolorum esse ipsa, placeat quos voluptate. Natus!"},
        {"id":"slide3","h1":"Header 3", "p":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque inventore id nihil. Distinctio vero, eaque facilis adipisci sit, aliquam aspernatur quaerat eveniet dignissimos dolorum esse ipsa, placeat quos voluptate. Natus!"},
    ])
    return(
        <>
        <div className="about-container">
            <div className='slides-container'>
                <div className='slide-group'>
                    {slides.map((slide)=><div key={`key_${Math.random()}`} className='slide' id={slide.id}>
                        <h1>{slide.h1}</h1>
                        <p>{slide.p}</p>
                    </div>)}
                </div>
            </div>
            <button className='scroll-btn left' onClick={() => document.querySelectorAll('.slides-container')[0]?.scrollBy({ left: -1000, behavior: 'smooth' })}><img className='arrows' src='/src/assets/arrowLeft.svg' alt="Left arrow"/></button>
            <button className='scroll-btn right' onClick={() => document.querySelectorAll('.slides-container')[0]?.scrollBy({ left: 1000, behavior: 'smooth' })}><img className='arrows' src='/src/assets/arrowRight.svg' alt="Right arrow"/></button>
            <div className='about-info' >
                <h1>About us</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, officiis modi.
                    Temporibus labore quis eos nulla reprehenderit deserunt voluptatibus, veniam architecto dolorem,
                    maiores rerum assumenda, odio illo ratione? Necessitatibus, doloribus?</p>
            </div>
            <div className='ticket-container' >
                <h1>Tickets</h1>
                <button className='ticket-btn' onClick={() => navigate('/tickets')}>Buy tickets</button>
            </div>
        </div>
        </>
    )
}

export default About;