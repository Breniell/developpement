
import './App.css';
const skills= [

  {
    skill: "HTML + CSS",
    level:"advanced",
    color: "#2662EA"
  },
  {
    skill: "HTML + CSS",
    level:"advanced",
    color: "#2662EA"
  },
  {
    skill: "HTML + CSS",
    level:"advanced",
    color: "#2662EA"
  },
  {
    skill: "JavaScript",
    level:"advanced",
    color: "#EFD81D"
  },
  {
    skill: "Web Design",
    level:"advanced",
    color: "#C3DCAF"
  },
  {
    skill: "Git And Github",
    level:"intermediate",
    color: "#E84F33"
  },
  {
    skill: "React",
    level:"advanced",
    color: "#60DAF8"
  },
  {
    skill: "Svelte",
    level:"beginner",
    color: "#FF3800"
  },
]



function App() {
  return (
    <div className="card">
      <Avatar />
      <div className='data'>

        <Intro nom='Kouda Breniell'
          introduction="je suis un etudiant en genie informatique" />


        <SkillList  />
      
      </div>
    </div>
  );
}

function Avatar(){
  return (
    <img className = 'avatar' src='images/manga.jpg'alt='manga' />
  );
}

function Intro(props){
  return (
    <div>
      <h1>{props.nom}</h1>
      <p>{props.introduction}</p>
    </div>
  );
}

function SkillList(){
  return (
    <div className='skill-list'>
      {
    skills.map((skill) => (
    <Skill skill = {skill.skill} color = {skill.color} level = {skill.level} />))
      }
    </div>
  );
}

function Skill(skill, color, level){
return (

  <div className='skill' style = {{backgroundColor: color }}>
    <span>{skill}</span>
    <span>
      { level === 'beginner' && '👶'}
      { level === 'intermediate' && '👍'}
      { level === 'advanced' && '💪'}
      
      </span>
  </div>

)
}

export default App;
