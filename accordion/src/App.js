
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
  const [curOpen , setcurOpen] = useState(null);

  return(
    <div className='accordion'>
      {data.map( (el,i) =>

      <AccordionItem title={el.title}
      curOpen = {curOpen} 
      onOpen = {setcurOpen}
      num = {i} 
      key={el.title}>
        {el.text}
      </AccordionItem>

      )}

<AccordionItem title='Test 1'
      curOpen = {curOpen} 
      onOpen = {setcurOpen}
      num = {23} 
      key='test 1'>
        <p>Allows react developpers to:</p>
       <ul>
          <li>Break up UI into components</li>
          <li>Make components reusuable</li>
          <li>Place state efficiently</li>
       </ul>
</AccordionItem>
    </div>
  )
}
function AccordionItem({num,title,text,curOpen,onOpen,children}){
  const isOpen = num === curOpen;

function handleToggle(){
onOpen(isOpen ? null : num);
}
  return(
    <div className= {`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className='number'>{num < 9 ? `0${num}` : num + 1}</p>
      <p className='title'>{title}</p>
      <p className='icon'>{isOpen ? "-": "+" }</p>
      {isOpen && <div className='content-box'>{children}</div>}
    </div>
  )
}


