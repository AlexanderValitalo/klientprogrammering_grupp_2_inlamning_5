import DetailRecipe from "@/components/detailRecipe/DetailRecipe";

export default function DetailRecipePage({ params }) {
  return (
    <>
      <DetailRecipe recipeData={params} />
    </>
  );
}
