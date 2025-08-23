import React from 'react'

const Feed = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-3">
        <div className="relative w-80 h-[28rem] rounded-2xl shadow-xl overflow-hidden ">
          {/* Image */}
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Card Content */}
          <div className="absolute bottom-0 w-full p-5 text-white">
            <h2 className="text-2xl font-bold">Card Title</h2>
            <p className="text-sm opacity-90">
              A card component styled like a Tinder swipe feed card with overlay text.
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-5 mt-4">
              {/* Dislike Button */}
              <button className="btn btn-circle bg-red-500 hover:bg-red-600 border-none text-white shadow-lg">
                ✕
              </button>

              {/* Like Button */}
              <button className="btn btn-circle bg-green-500 hover:bg-green-600 border-none text-white shadow-lg">
                ❤
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Feed