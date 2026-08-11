import React from 'react'

function SearchBar() {
    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Enter a city..."
                className="border border-gray-300 rounded-lg px-4 py-2"
            />

            <button
                type="button"
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar