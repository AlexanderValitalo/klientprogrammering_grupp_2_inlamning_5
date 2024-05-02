import UpdateRecipeForm from '@/components/updateRecipeForm/UpdateRecipeForm';

// UpdateRecipePage component
export default function UpdateRecipePage({params}) {
  return (
    <>
      <h1>Update Recipe</h1>
      <UpdateRecipeForm recipeId={params.recipeId} />
    </>
  );
}