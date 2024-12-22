const MySavedDesigns = () => {
  const savedDesigns = [
    { id: 1, name: "Design 1", thumbnail: "https://via.placeholder.com/150" },
    { id: 2, name: "Design 2", thumbnail: "https://via.placeholder.com/150" },
    { id: 3, name: "Design 3", thumbnail: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="w-full p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">My Saved Designs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={design.thumbnail}
              alt={design.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {design.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySavedDesigns;
