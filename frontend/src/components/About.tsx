
import { useState } from 'react'
import '../style.css'
import resource1 from  '../assets/resource1.jpg'
import resource2 from  '../assets/resource2.jpg'
import resource3 from '../assets/resource3.jpg'

const About = () =>{
    const resources = [resource1, resource2, resource3];
    const aboutText =[
        'Lorem1 ipsum dolor sit amet consectetur adipisicing elit. Eveniet, officiis modi. Temporibus labore quis eos nulla reprehenderit deserunt voluptatibus, veniam architecto dolorem, maiores rerum assumenda, odio illo ratione? Necessitatibus, doloribus?',
        'Lorem2 ipsum dolor sit amet consectetur adipisicing elit. Eveniet, officiis modi. Temporibus labore quis eos nulla reprehenderit deserunt voluptatibus, veniam architecto dolorem, maiores rerum assumenda, odio illo ratione? Necessitatibus, doloribus?',
        'Lorem3 ipsum dolor sit amet consectetur adipisicing elit. Eveniet, officiis modi. Temporibus labore quis eos nulla reprehenderit deserunt voluptatibus, veniam architecto dolorem, maiores rerum assumenda, odio illo ratione? Necessitatibus, doloribus?'
    ]
    const [currentText, setCurrentText] = useState(0);
    const [currentResource, setCurrentResource] = useState(0);
    function arrowLeftClick(){
        if(currentResource > 0){
            setCurrentText(aboutText.length - 1);
            setCurrentResource(resources.length - 1);
        } else {
            setCurrentResource(2);
            setCurrentText(2)
        }
    }
    function arrowRightClick(){
        if(currentResource < 2){
            setCurrentResource(currentResource + 1);
            setCurrentText(currentText + 1);
        } else {
            setCurrentResource(0);
            setCurrentText(0);
        }
    }

    return(
        <>
        <div className="about-container">
            <div className='about-block' id='block1'>
                <div className='block-text'>
                    <h1>Block 1 header</h1>
                    <p>{aboutText[currentText]}</p>
                </div>
                <button className='carousel-arrow' id='carousel-arrow-left'><img src='/src/assets/arrowLeft.svg'></img></button>
                <button className='carousel-arrow' id='carousel-arrow-right'><img src='/src/assets/arrowRight.svg'></img></button>
                <img className='block-img' src={resources[currentResource]}></img>
            </div>
            <div className='about-info' >
                <h1>About us</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, officiis modi.
                    Temporibus labore quis eos nulla reprehenderit deserunt voluptatibus, veniam architecto dolorem,
                    maiores rerum assumenda, odio illo ratione? Necessitatibus, doloribus?</p>
            </div>
            <div className='ticket-container' >
                <h1>Tickets</h1>
                <button className='ticket-btn'>Buy tickets</button>
            </div>
        </div>
        </>
    )
}

export default About;