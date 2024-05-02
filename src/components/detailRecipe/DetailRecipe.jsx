"use client";

import openDatabase from "@/data/db";
import { useEffect, useState } from "react";
import styles from "./DetailRecipe.module.css";
import { useRouter } from "next/navigation";

// DetailRecipe component
export default function DetailRecipe({ recipeData }) {
  const [displayedRecipe, setDisplayedRecipe] = useState({
    title: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    cookingInstructions: "",
  });

  const router = useRouter();

  // Get the recipe from the database
  useEffect(() => {
    async function doDBOperations() {
      const db = await openDatabase();
      const id = parseInt(recipeData.recipeId);
      const taskFromDb = await db.get("recipes", id);

      setDisplayedRecipe(taskFromDb);
    }

    doDBOperations();
  }, []);

  // Handle the remove button click
  const handleRemoveButtonClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to remove this item?');
    if (isConfirmed) {
      handleDeleteRecipe();
    }
  };
  
  // Delete the recipe from the database
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
          <h2 className={styles.h2}>{displayedRecipe.title}</h2>
          <h3 className={styles.h3}>Ingredients</h3>
          <ul className={styles.ul}>
            {displayedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`}</li>
            ))}
          </ul>
          <h3 className={styles.h3}>Cooking instructions</h3>
          <p>{displayedRecipe.cookingInstructions}</p>
          <div className={styles.buttonDiv}>
            <button className={`${styles.button} ${styles.removeButton}`} type="button" onClick={handleRemoveButtonClick}>
              Delete Recipe
            </button>
            <button className={`${styles.button} ${styles.updateButton}`} type="button" onClick={() => router.push(`/recipes/${recipeData.recipeId}/update`)}>
              Update Recipe
            </button>
          </div>
        </>
      )}
    </div>
  );
}
