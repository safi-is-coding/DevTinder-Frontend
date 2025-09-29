function ConnectionShimmer() {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 animate-shimmer">
            <div className="w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default ConnectionShimmer