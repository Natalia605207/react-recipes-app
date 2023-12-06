import { useState, useEffect, useRef, useLayoutEffect } from "react";
import searchIcon from './assets/searchIcon.png';
import olivesIcon from './assets/OlivesIcon.png';
import './App.css';
import MyRecipesComponent from "./components/MyRecipesComponent";
import { gsap } from "gsap";

function App() {

  const MY_ID = "83e71f80";
  const MY_KEY = "c85b1371ccfbd5f6a352a53c96623cda";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("olives");

  const app = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline()
        .from(".size", {
          delay: 0.5, duration: 1, y: -50, opacity: 0, ease: "back.out"
        })
        .from("h1", {
          y: -70, duration: 1, opacity: 0, ease: "back.out"
        })
        .from("form", {
          y: 50, duration: 1, opacity: 0, ease: "back.out"
        });
    }, app);
    return () => ctx.revert();
  }, []);

  useEffect (() => {
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      setMyRecipes(data.hits);
    }
    getRecipe()
  }, [wordSubmitted])

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  return (
    <div className="App" ref={app}>
      <img className="size" src={olivesIcon} alt="olives" />
      <div className="container">
        <h1>Find a Recipe</h1>
      </div>
      <form onSubmit={finalSearch}>
        <input className="search" type="text" placeholder="Search..." onChange={myRecipeSearch} value={mySearch}/>
        <button onClick={finalSearch}>
          <img src={searchIcon} alt="search icon"/>
        </button>
      </form>
      <div className="recipes">
      {myRecipes.map((element, index) => (
        <MyRecipesComponent key={index}
        label={element.recipe.label}
        protein={element.recipe.totalNutrients.PROCNT.quantity}
        fat={element.recipe.totalNutrients.FAT.quantity}
        carbs={element.recipe.totalNutrients.CHOCDF.quantity}
        energy={element.recipe.totalNutrients.ENERC_KCAL.quantity}
        image={element.recipe.image}
        ingredients={element.recipe.ingredientLines}
        totalWeight={element.recipe.totalWeight}
        />
      ))}
      </div>
        <p className="bottomInfo">Developed by <a className="bottomInfo" href="https://natalia-musikhina-portfolio.glitch.me/" target="_blank" rel="noreferrer">Natalia Musikhina</a></p>
        <p className="bottomInfo top">Powered by <a className="bottomInfo top" href="https://www.edamam.com/" target="_blank" rel="noreferrer">www.edamam.com</a></p>
    </div>
  );
}

export default App;
