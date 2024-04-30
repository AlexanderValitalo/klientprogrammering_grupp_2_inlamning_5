"use client";

import React, { useState } from "react";
import openDatabase from "@/data/db";
import styles from "./UpdateRecipeForm.module.css";
import IngredientInput from "@/components/ingredientInput/IngredientInput.jsx";
import { useRouter } from "next/navigation";

const feedbackDuration = 3000;
let updatedTitle = "";

export default function UpdateRecipeForm ({recipeId}) {
  const [recipeExist, setRecipeExist] = useState(false);
  const [updateRecipeFeedback, setUpdateRecipeFeedback] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    cookingInstructions: "",
  });

  const router = useRouter();

  //Handles form submission
  const handleUpdateClick = async (event) => {
    event.preventDefault();

    try {
      const db = await openDatabase();

      const recipes = await db.getAll("recipes");

      let recipeFound = false;

      // Check if the recipe already exists in the database
      recipes.forEach((recipe) => {
        if (recipe.title == formData.title) {
          setRecipeExist(true);
          recipeFound = true;
        }
      });

      if (recipeFound) {
        return; //If a recipe with this title already exists, exit function
      }

      // Add the recipe to the database if it doesn't exist
      if (!recipeFound) {
        // Assuming db is your IndexedDB database***************************************************
        const transaction = db.transaction(['recipes'], 'readwrite');
        const store = transaction.objectStore('recipes');

        // Assuming you have a key associated with the record you want to update
        const recordKey = parseInt(recipeId); // You need to provide the key of the record you want to update

        // Retrieve the existing record using the key
        const request = await store.get(recordKey);

        if(request != undefined) {
          // Update the existing record with the new data
          request.title = formData.title;
          request.ingredients = formData.ingredients;
          request.cookingInstructions = formData.cookingInstructions;

          // Put the updated record back into the object store
          const updateRequest = store.put(request);
        } else {
          console.error('Error fetching record:', request.error);
        }; //*************************************************************************** */
      }
      setUpdateRecipeFeedback(true); //set state to display feedback for added recipe
      updatedTitle = formData.title; //store title of added recipe for feedback display

      // setFormData({
      //   title: "",
      //   ingredients: [{ name: "", quantity: "", unit: "" }],
      //   cookingInstructions: "",
      // });

      //Timer hides feedback message after the set feedbackDuration time
      setTimeout(() => {
        setUpdateRecipeFeedback(false);
        router.push(`/recipes/${recipeId}`);
      }, feedbackDuration);
    } catch (error) {
      console.error("Error updating recipe to the database", error);
    }
  };

  //Handles changes in the form fields
  function handleChangeForm(event) {
    const fieldName = event.target.name;
    const value = event.target.value;

    //Updates form data with the new value
    setFormData({ ...formData, [fieldName]: value });

    // For nested objects within arrays, create a new array with updated values
    if (fieldName === "ingredient" || fieldName === "quantity" || fieldName === "unit") {
      const newIngredients = formData.ingredients.map((ingredient, index) => {
        if (index.toString() === event.target.dataset.index) {
          return { ...ingredient, [fieldName]: value };
        }
        return ingredient;
      });
      setFormData({ ...formData, ingredients: newIngredients });
    }

    setRecipeExist(false);
  }

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "", unit: "" }],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  //JSX rendering of component
  return (
    <>
      <form className={styles.form} onSubmit={handleUpdateClick} onChange={handleChangeForm}>
        <label htmlFor="title">Title</label>
        <input
          className={styles.input}
          type="text"
          id="title"
          name="title"
          placeholder="Title..."
          required
          value={formData.title}
          onChange={handleChangeForm}
        />

        <label htmlFor="ingredient-div" className={styles.label}>
          Ingredients
        </label>
        {formData.ingredients.map((ingredient, index) => (
          <IngredientInput
            key={index}
            ingredient={ingredient}
            index={index}
            removeIngredient={removeIngredient}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
        <button className={styles.addButton} type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label className={styles.label} htmlFor="cookingInstructions">
          Cooking instructions
        </label>
        <textarea
          className={styles.textarea}
          id="cookingInstructions"
          name="cookingInstructions"
          placeholder="Cooking instructions..."
          required
          value={formData.cookingInstructions}
          onChange={handleChangeForm}
        />

        <button className={styles.button} type="submit">
          Update recipe
        </button>
      </form>

      <p className={styles.p}>
        {recipeExist &&
          formData.title + " already exists in the cookbook, please choose another title"}
      </p>
      <p className={styles.p}>{updateRecipeFeedback && updatedTitle + " has been updated"}</p>
    </>
  );
}
