export function PokeballLoader() {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="animate-spin">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-gray-600" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  );
}