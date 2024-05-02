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
      <div className={styles.ingredients}>
        <input
          className={`${styles.ingredientName} ${styles.input}`}
          type="text"
          name="ingredient"
          placeholder="Ingredient..."
          aria-label={`Ingredient name ${index + 1}`}
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
          name="quantity"
          placeholder="Quantity..."
          aria-label={`Ingredient quantity ${index + 1}`}
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
          name="unit"
          placeholder="Unit..."
          aria-label={`Ingredient unit ${index + 1}`}
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
