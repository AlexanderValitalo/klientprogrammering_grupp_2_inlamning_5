"use client";

import openDatabase from "@/data/db";
import { useEffect, useState } from "react";
import styles from "./DetailRecipe.module.css";
import { useRouter } from "next/navigation";

export default function DetailRecipe({ recipeData }) {
  const [displayedRecipe, setDisplayedRecipe] = useState({
    title: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    cookingInstructions: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function doDBOperations() {
      const db = await openDatabase();
      const id = parseInt(recipeData.recipeId);
      const taskFromDb = await db.get("recipes", id);

      setDisplayedRecipe(taskFromDb);
    }

    doDBOperations();
  }, []);

  const handleRemoveButtonClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to remove this item?');
    if (isConfirmed) {
      handleDeleteRecipe();
    }
  };
  
  const handleDeleteRecipe = async () => {
    const db = await openDatabase();
    const id = parseInt(recipeData.recipeId);
    await db.delete("recipes", id);
    router.push("/recipes");
  };

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
          <button className={styles.removeButton} type="button" onClick={handleRemoveButtonClick}>
            Delete Recipe
          </button>
        </>
      )}
    </div>
  );
}
