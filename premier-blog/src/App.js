import HomePage from './pages/HomePage'
import AboutPage from'./pages/AboutPage'
import ArticleListPage from './pages/ArticleListPage'
import Article from './pages/Article'
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import NavBar from './pages/NavBar';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
    <BrowserRouter>

    <div className="App">
   <NavBar/>
      <div id='page-body'> 
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/articles/:articleId' element={<ArticleListPage/>}/> 
      <Route path='/articles' element={<Article/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      </div>
    </div>

    </BrowserRouter>
  
  );
}

export default App;
