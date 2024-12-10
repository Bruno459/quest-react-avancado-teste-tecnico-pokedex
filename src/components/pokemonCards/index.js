import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../../images/Fundo-pokedex.jpeg';

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
`;


const Titles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.background};
    margin-left: 20px;
    
`;

const PokemonLink = styled(Link)`
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.background};
    text-decoration: none;
`;

const PokemonList = styled.ul`
    display: flex;
    flex-wrap: wrap;
`

const PokemonItem = styled.li`
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.background};
    list-style-type: none;
    margin: 0 10px;
    width: 10vw;
`;

const LoadMoreButton = styled.button`
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.background};
    margin-left: 20px;
`;

export function PokemonCards() {
    const [pokemons, setPokemons] = useState([]);
    const [displayedPokemons, setDisplayedPokemons] = useState([]);
    const [pokemonsToShow, setPokemonsToShow] = useState(10);
    const [error, setError] = useState(null);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        async function fetchStarterPokemons() {
            const starterPokemonIds = [
                1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393,
                495, 498, 501, 650, 653, 656, 722, 725, 728, 810, 813, 816,
                906, 909, 912
            ];

            try {
                const starters = starterPokemonIds.map(id =>
                    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                );

                const responses = await Promise.all(starters);
                const data = await Promise.all(responses.map(response => response.json()));

                const starterPokemons = data.map(pokemon => ({
                    id: pokemon.id,
                    name: pokemon.name,
                    imageUrl: pokemon.sprites.front_default,
                    isStarter: true
                }));

                setPokemons(starterPokemons);
                setDisplayedPokemons(starterPokemons.slice(0, pokemonsToShow));
            } catch (error) {
                console.error("Erro ao buscar dados de Pokémon:", error);
                setError("Falha ao buscar dados de Pokémon. Por favor, tente novamente mais tarde.");
            }
        }

        fetchStarterPokemons();
    }, []);

    useEffect(() => {
        setDisplayedPokemons(pokemons.slice(0, pokemonsToShow));
    }, [pokemonsToShow, pokemons]);

    const loadMore = () => {
        setPokemonsToShow(prevValue => prevValue + 10);
    };

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <>
            <Background />
            <div>
                <Titles>
                    <Title theme={theme}>Pokedex</Title>
                    <Title theme={theme}>Initial Pokemons</Title>
                    <Title theme={theme}>Click to go to a dedicated Pokémon page</Title>
                </Titles>
                <PokemonList>
                    {displayedPokemons.map(pokemon => (
                        <PokemonLink key={pokemon.id} to={`/pokemon/${pokemon.id}`} theme={theme}>
                            <PokemonItem theme={theme}>
                                <img src={pokemon.imageUrl} alt={pokemon.name} />
                                <h2>{pokemon.name}</h2>
                            </PokemonItem>
                        </PokemonLink>
                    ))}
                </PokemonList>
                {pokemonsToShow < pokemons.length && (
                    <LoadMoreButton onClick={loadMore} theme={theme}>
                        Show more
                    </LoadMoreButton>
                )}
            </div>
        </>
    );
}