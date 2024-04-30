import DetailRecipe from "@/components/detailRecipe/DetailRecipe";

export default function DetailRecipePage({ params }) {
  return (
    <>
      <h1>Recipe</h1>
      <DetailRecipe recipeData={params} />
    </>
  );
}
