import styles from "./IngredientInput.module.css";

export default function IngredientInput({
  ingredient,
  index,
  formData,
  setFormData,
  removeIngredient,
}) {

  function handleChangeIngredient(event) {
    const newIngredients = [...formData.ingredients];
    const fieldName = event.target.name;
    if(fieldName === 'ingredient') {
      newIngredients[index].name = event.target.value;
    } else if(fieldName === 'quantity') {
      newIngredients[index].quantity = event.target.value;
    } else if(fieldName === 'unit') {
      newIngredients[index].unit = event.target.value;
    }
    setFormData(formData.title, newIngredients, formData.cookingInstructions);
  } 

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
          onChange={handleChangeIngredient}
        />

        <input
          className={`${styles.ingredientInput} ${styles.input}`}
          type="number"
          name="quantity"
          placeholder="Quantity..."
          aria-label={`Ingredient quantity ${index + 1}`}
          required
          value={ingredient.quantity}
          onChange={handleChangeIngredient}
        />

        <input
          className={`${styles.ingredientInput} ${styles.input}`}
          type="text"
          name="unit"
          placeholder="Unit..."
          aria-label={`Ingredient unit ${index + 1}`}
          required
          value={ingredient.unit}
          onChange={handleChangeIngredient}
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
