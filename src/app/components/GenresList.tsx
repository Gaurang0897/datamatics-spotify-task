interface Category {
  id: string;
  name: string;
}

interface GenresListProps {
  categories: Category[] | null;
}

const GenresList = ({ categories }: GenresListProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Browse Genres</h2>
      {!categories ? (
        <p className="text-gray-500">
          Failed to load categories. Please try again later.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-green-500 text-gray-900 p-2 rounded-lg"
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GenresList;
