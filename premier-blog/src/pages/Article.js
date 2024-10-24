import { useParams  } from "react-router-dom";
import articles from './articleContent'
import NotFoundPage from "./NotFoundPage";
function Article () {
    
    const {articleId} = useParams();
    const article = articles.find(article => article.name === articleId);
    
    if(!article){
        return <NotFoundPage/>
    }

    
    return (
        <>

        <h1> {article.title} </h1>
        {article.content.map((contenu,i) => (
            <p key={i}>{contenu}</p>
            
            ))}

        </>
     
    );
  }
  
  export default Article;
  