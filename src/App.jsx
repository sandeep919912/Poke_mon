// import './App.css'
import { useEffect, useState } from "react";


function App() {

  const [pokemones , setAllPokemones]= useState([])
  const [search , setSearch] = useState("")
  const [dropdown , setDropdown] = useState("")
  const [loading , setLoading] = useState(false)
  console.log(dropdown)

 
  const fetchData = async ()=>{
    setLoading(true)
    let responce = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    let data = await responce.json()
    setLoading(false)
    // console.log(data)
    let pokemonUrls = data.results.map(object=> object.url)
    // console.log(pokemonUrls)
    let pokemonDetails = await Promise.all(pokemonUrls.map(async(url) => {
      let res = await fetch(url)
      return res.json()
    }))
    // console.log("pokemonDetails :", pokemonDetails)

    let allPokemones = pokemonDetails.map(obj => ({
      name : obj.name,
      id : obj.id,
      types : obj.types.map(obj => obj.type.name),
      sprites : obj.sprites.back_default
    }))

    setAllPokemones(allPokemones)
    
  }


  useEffect(() => {
    fetchData()
  }, []);

  const getPoke = ()=>{
    if(search){
      let filteredPokes = pokemones.filter(pokemon => pokemon.name == search)
      setAllPokemones(filteredPokes)
    }else if(search == ""){
      fetchData()
    }
    else{
      alert("not found")
    }
  }

  const getPokeBySelect = ()=>{
    let filteredPokes2 = pokemones.filter(pokemon => pokemon.types.map(type => type) == dropdown)
    console.log(filteredPokes2)
    setDropdown(filteredPokes2)
  }


  return (
    <div className="w-full min-h-screen bg-gray-50">
  {/* Navbar */}
  <nav className="flex flex-col md:flex-row justify-between items-center shadow-md px-6 py-4 bg-white sticky top-0 z-10">
    <h1 className="font-bold text-2xl text-orange-500 mb-2 md:mb-0">Pokémon</h1>

    <div className="flex flex-col md:flex-row gap-4">
      {/* Search Input */}
      <div className="flex items-center gap-2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="text"
          placeholder="Search Pokémon"
        />
        <button
          onClick={getPoke}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white rounded-md"
        >
          Get Poke
        </button>
      </div>

      {/* Dropdown Select */}
      <div className="flex items-center gap-2">
        <select
          onChange={(e) => setDropdown(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option>Select Type</option>
          <option value="Grass">Grass</option>
          <option value="Water">Water</option>
          <option value="Fire">Fire</option>
        </select>
        <button
          onClick={getPokeBySelect}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white rounded-md"
        >
          Get Poke
        </button>
      </div>
    </div>
  </nav>

  {/* Pokemon Grid */}
  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {pokemones.map((pokemon) => (
      <div
        key={pokemon.id}
        className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform duration-200"
      >
        {/* Name */}
        <h2 className="font-bold text-lg text-orange-500 capitalize mb-3">
          {pokemon.name}
        </h2>

        {/* Image */}
        <img
          src={pokemon.sprites}
          alt={pokemon.name}
          className="w-24 h-24 object-contain mb-4"
        />

        {/* Details */}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Types: {pokemon.types.join(', ')}
          </p>
          <p className="text-sm font-semibold text-gray-600">ID: {pokemon.id}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default App


