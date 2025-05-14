import { useParams } from 'react-router-dom';

const dummyRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: '/placeholder1.jpg',
    ingredients: ['Pasta', 'Eggs', 'Cheese', 'Bacon'],
    instructions: 'Boil pasta, mix eggs and cheese, combine with bacon.',
  },
  {
    id: 2,
    title: 'Chicken Stir Fry',
    image: '/placeholder2.jpg',
    ingredients: ['Chicken', 'Vegetables', 'Soy Sauce'],
    instructions: 'Cook chicken, stir in veggies, add sauce.',
  },
];

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = dummyRecipes.find((r) => r.id === parseInt(id));

  if (!recipe) return <p className="text-center mt-10">Recipe not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>

      <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
