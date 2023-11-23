function MyRecipesComponent({label, protein, fat, carbs, energy, image, ingredients, totalWeight}) {
    return <div>
        <div className="container">
        <h2>{label}</h2>
        </div>
        <div className="line">
            <div className="column">
                <p className="bold">{energy.toFixed()} <span className="notBold">Kcal</span></p>
                <span className="otherColor">Calories</span>
            </div>
            <div className="column">
                <p className="bold">{protein.toFixed()} <span className="notBold">g</span></p>
                <span className="otherColor">Protein</span>
            </div>
            <div className="column">
                <p className="bold">{fat.toFixed()} <span className="notBold">g</span></p>
                <span className="otherColor">Fat</span>
            </div>
            <div className="column">
                <p className="bold">{carbs.toFixed()} <span className="notBold">g</span></p>
                <span className="otherColor">Carbs</span>
            </div>
        </div>
        <div className="container">
            <img className="roundImage" src={image} alt="dish" />
        </div>
        <ul className="column">
            {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
        </ul>
        <div className="container">
            <p className="bold">Total weight: {totalWeight.toFixed()} g</p>
        </div>
        <hr></hr>
    </div>
}

export default MyRecipesComponent;