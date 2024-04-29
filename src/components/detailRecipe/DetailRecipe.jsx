"use client";

import openDatabase from "@/data/db";
import { useEffect, useState } from "react";
import styles from "./DetailRecipe.module.css";

export default function DetailRecipe({ recipeData }) {
  const [displayedRecipe, setDisplayedRecipe] = useState({
    title: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    cookingInstructions: "",
  });

  useEffect(() => {
    async function doDBOperations() {
      const db = await openDatabase();
      const id = parseInt(recipeData.recipeId);
      const taskFromDb = await db.get("recipes", id);

      setDisplayedRecipe(taskFromDb);
    }

    doDBOperations();
  }, []);

  return (
    <div className={styles.recipeDiv}>
      {displayedRecipe && (
        <>
          <h1>{displayedRecipe.title}</h1>
          <h2 className={styles.h2}>Ingredients</h2>
          <ul className={styles.ul}>
            {displayedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`}</li>
            ))}
          </ul>
          <h2 className={styles.h2}>Cooking instructions</h2>
          <p>{displayedRecipe.cookingInstructions}</p>
        </>
      )}
    </div>
  );
}
