import React from 'react'
import { useState } from 'react'

function SearchBar({onSearch}) {

    const [city,setCity] = useState("");
    return (
      <form action="" onSubmit={(e)=>{e.preventDefault();
       onSearch(city);
       setCity("")}}> 
        <div className="flex gap-2">
            <input
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                type="text"
                placeholder="Enter a city..."
                className="border border-gray-300 rounded-lg px-4 py-2"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
                Search
            </button>
        </div>
        </form>
    )
}

export default SearchBar