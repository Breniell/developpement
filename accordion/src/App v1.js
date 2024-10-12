
import { useState } from 'react';
import './App.css';

const faqs = [
  {
    title:"Where are these chairs assembled",
    text: "Lorem ipsum dolor sit amet consectur"
  },
  {
    title:"How long do i have to return my chair",
    text:" Pariatur recusande dignissimos fuga voluptas unde optio"
  },
  {
    title:"Do you ship to countries outside the EU ?",
    text:" Excepturi velit laborum, perspiciatis nemo perferendis"
  }
];

export default function App() {
  return (
    <div>
     <Accordion data={faqs}/>
    </div>
  );
}

function Accordion({data}) {
  return(
    <div className='accordion'>
      {data.map( (el,i) =>
      <AccordionItem title={el.title}
        text={el.text} num = {i} key={el.title}/>
      )}
    </div>
  )
}
function AccordionItem({num,title,text}){
  const [isOpen, setIsOpen] = useState(false);

function handleToggle(){
  setIsOpen( (isOpen)=> !isOpen)
}
  return(
    <div className= {`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className='number'>{num < 9 ? `0${num}` : num + 1}</p>
      <p className='title'>{title}</p>
      <p className='icon'>{isOpen ? "-": "+" }</p>
      {isOpen && <div className='content-box'>{text}</div>}
    </div>
  )
}


