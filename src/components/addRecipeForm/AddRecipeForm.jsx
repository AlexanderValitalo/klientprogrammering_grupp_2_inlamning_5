"use client";

import React, { useState } from "react";
import openDatabase from "@/data/db";
import styles from "./AddRecipeForm.module.css";
import IngredientInput from "@/components/ingredientInput/IngredientInput.jsx";

const feedbackDuration = 3000;
let addedTitle = "";

export default function AddRecipeForm() {
  const [recipeExist, setRecipeExist] = useState(false);
  const [addRecipeFeedback, setAddRecipeFeedback] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    cookingInstructions: "",
  });

  //Handles form submission
  const handleCreateClick = async (event) => {
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
        await db.add("recipes", {
          title: formData.title,
          ingredients: formData.ingredients,
          cookingInstructions: formData.cookingInstructions,
        });
      }
      setAddRecipeFeedback(true); //set state to display feedback for added recipe
      addedTitle = formData.title; //store title of added recipe for feedback display

      setFormData({
        title: "",
        ingredients: [{ name: "", quantity: "", unit: "" }],
        cookingInstructions: "",
      });

      //Timer hides feedback message after the set feedbackDuration time
      setTimeout(() => {
        setAddRecipeFeedback(false);
      }, feedbackDuration);
    } catch (error) {
      console.error("Error adding recipe to the database", error);
    }
  };

  //Handles changes in the form fields
  function handleChangeForm(event) {
    const fieldName = event.target.name;
    const value = event.target.value;

    //Updates form data with the new value
    setFormData({ ...formData, [fieldName]: value });

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
      <form className={styles.form} onSubmit={handleCreateClick} onChange={handleChangeForm}>
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

        <p className={styles.label}>Ingredients</p>
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
          Create recipe
        </button>
      </form>

      <p className={styles.p}>
        {recipeExist &&
          formData.title + " already exists in the cookbook, please choose another title"}
      </p>
      <p className={styles.p}>
        {addRecipeFeedback && addedTitle + " has been added to the cookbook"}
      </p>
    </>
  );
}
