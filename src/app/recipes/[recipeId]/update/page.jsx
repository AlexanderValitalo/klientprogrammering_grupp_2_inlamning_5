import UpdateRecipeForm from '@/components/updateRecipeForm/UpdateRecipeForm';

export default function UpdateRecipePage({params}) {
  return (
    <>
      <h1>Update Recipe</h1>
      <UpdateRecipeForm recipeId={params.recipeId} />
    </>
  );
}