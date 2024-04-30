import styles from "./IngredientInput.module.css";

export default function IngredientInput({
  ingredient,
  index,
  formData,
  setFormData,
  removeIngredient,
}) {
  return (
    <>
      <div className={styles.ingredients} id="ingredient-div">
        <input
          className={`${styles.ingredientName} ${styles.input}`}
          type="text"
          id="ingredient"
          name="ingredient"
          placeholder="Ingredient..."
          required
          value={ingredient.name}
          onChange={(e) => {
            const newIngredients = [...formData.ingredients];
            newIngredients[index].name = e.target.value;
            setFormData(formData.title, newIngredients, formData.cookingInstructions);
          }}
        />

        <input
          className={`${styles.ingredientInput} ${styles.input}`}
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity..."
          required
          value={ingredient.quantity}
          onChange={(e) => {
            const newIngredients = [...formData.ingredients];
            newIngredients[index].quantity = e.target.value;
            setFormData(formData.title, newIngredients, formData.cookingInstructions);
          }}
        />

        <input
          className={`${styles.ingredientInput} ${styles.input}`}
          type="text"
          id="unit"
          name="unit"
          placeholder="Unit..."
          required
          value={ingredient.unit}
          onChange={(e) => {
            const newIngredients = [...formData.ingredients];
            newIngredients[index].unit = e.target.value;
            setFormData(formData.title, newIngredients, formData.cookingInstructions);
          }}
        />

        <button
          className={styles.removeButton}
          type="button"
          onClick={() => removeIngredient(index)}
        >
          Remove
        </button>
      </div>
    </>
  );
}
