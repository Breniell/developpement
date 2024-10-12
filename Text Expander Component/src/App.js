
import { useState } from 'react';
import './App.css';

// const faqs = [
//   {
//     title:"Where are these chairs assembled",
//     text: "Lorem ipsum dolor sit amet consectur"
//   },
//   {
//     title:"How long do i have to return my chair",
//     text:" Pariatur recusande dignissimos fuga voluptas unde optio"
//   },
//   {
//     title:"Do you ship to countries outside the EU ?",
//     text:" Excepturi velit laborum, perspiciatis nemo perferendis"
//   }
// ];

// export default function App() {
//   return (
//     <div>
//      <Accordion data={faqs}/>
//     </div>
//   );
// }

// function Accordion({data}) {
//   const [curOpen , setcurOpen] = useState(null);

//   return(
//     <div className='accordion'>
//       {data.map( (el,i) =>

//       <AccordionItem title={el.title}
//       curOpen = {curOpen} 
//       onOpen = {setcurOpen}
//       num = {i} 
//       key={el.title}>
//         {el.text}
//       </AccordionItem>

//       )}

// <AccordionItem title='Test 1'
//       curOpen = {curOpen} 
//       onOpen = {setcurOpen}
//       num = {23} 
//       key='test 1'>
//         <p>Allows react developpers to:</p>
//        <ul>
//           <li>Break up UI into components</li>
//           <li>Make components reusuable</li>
//           <li>Place state efficiently</li>
//        </ul>
// </AccordionItem>
//     </div>
//   )
// }
// function AccordionItem({num,title,text,curOpen,onOpen,children}){
//   const isOpen = num === curOpen;

// function handleToggle(){
// onOpen(isOpen ? null : num);
// }
//   return(
//     <div className= {`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
//       <p className='number'>{num < 9 ? `0${num}` : num + 1}</p>
//       <p className='title'>{title}</p>
//       <p className='icon'>{isOpen ? "-": "+" }</p>
//       {isOpen && <div className='content-box'>{children}</div>}
//     </div>
//   )
// }


import "./App.css";

export default function App() {

  const [curOpen , setcurOpen] = useState(false);

  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  children,
  collapseButtonText = "show less",
  collapsedNumWords = 10,
  expandButtonText= "show more", 
  buttonColor = "#1f09cd", 
  expanded= false, 
  className }) {
 
 const [isOpen, setIsOpen] = useState(expanded);

 const displaText = isOpen ? children : 
 children.split("").slice(0, collapsedNumWords).join("") + "...";

 const buttonStyle = {
  background: 'none',
  border: 'none',
  font:'inherit',
  cursor: 'pointer',
  marginLeft: '6px',
  color: buttonColor
 }
  function handleToggle(){
    setIsOpen(!isOpen)
}

  return <div className={className}><span>{displaText}</span> 
  <button onClick={handleToggle} style={buttonStyle}>
     {isOpen ? collapseButtonText : expandButtonText}
  </button> 
     </div>;
}
