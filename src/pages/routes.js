import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PokemonCards } from "../components/pokemonCards"
import { PokemonDetails } from "../components/pokemonCard"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PokemonCards />} />
                <Route exact path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }