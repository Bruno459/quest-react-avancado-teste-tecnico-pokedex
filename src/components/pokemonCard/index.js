import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { Link, useParams } from 'react-router-dom';
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

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.background};
    max-width: 200px;
`

const PokemonLink = styled(Link)`
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.background};
    text-decoration: none;
    margin: 10px;
`;

const PokemonSpecifications = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

const DetailSection = styled.section`
    display: flex;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.background};
`
const PokemonList = styled.ul`
    display: flex;
    flex-wrap: wrap;
`

const PokemonItem = styled.li`
    list-style-type: none;
    display: flex;
    margin-left: 10px;
`

const Subtitle = styled.h3`
    margin: 10px;
`

export function PokemonDetails() {
    const [pokemon, setPokemon] = useState(null);
    const [moves, setMoves] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const { id } = useParams();
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                setPokemon({
                    id: data.id,
                    name: data.name,
                    imageBase: data.sprites.front_default,
                    imageShiny: data.sprites.front_shiny,
                    type: data.types.map(type => type.type.name).join(' and '),
                });
                setMoves(data.moves.map(move => move.move.name));
                setAbilities(data.abilities.map(ability => ability.ability));
            } catch (error) {
                console.error("Erro ao buscar dados de Pokémon:", error);
            }
        }

        fetchPokemonData();
    }, [id]);

    useEffect(() => {
        async function fetchAbilityDescriptions() {
            const updatedAbilities = await Promise.all(
                abilities.map(async (ability) => {
                    const response = await fetch(ability.url);
                    const data = await response.json();
                    return {
                        ...ability,
                        effect: data.effect_entries.find(entry => entry.language.name === "en")?.effect || "No description available"
                    };
                })
            );
            setAbilities(updatedAbilities);
        }

        if (abilities.length > 0) {
            fetchAbilityDescriptions();
        }
    }, [abilities]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Background />
            <PokemonLink to={'/'} theme={theme}>Back to pokemon list</PokemonLink>
            <PokemonSpecifications>
                <Header theme={theme}>
                    <img src={pokemon.imageBase} alt={pokemon.name + ' Base version'} />
                    <h2>{pokemon.name}</h2>
                </Header>
                <section>
                    <DetailSection theme={theme} >
                        <Subtitle>Moves:</Subtitle>
                        <PokemonList>
                            {moves.map((move, index) => (
                                <PokemonItem key={index}>{move}</PokemonItem>
                            ))}
                        </PokemonList>
                    </DetailSection>
                    <DetailSection theme={theme} >
                        <Subtitle>Abilities:</Subtitle>
                        <PokemonList>
                            {abilities.map((ability, index) => (
                                <PokemonItem key={index}>
                                    <p>{ability.name}: {ability.effect}</p>
                                </PokemonItem>
                            ))}
                        </PokemonList>
                    </DetailSection>
                    <DetailSection theme={theme} >
                        <Subtitle>Type:</Subtitle>
                        <p theme={theme}>{pokemon.type}</p>
                    </DetailSection>
                    <DetailSection theme={theme} >
                        <Subtitle>Shiny version:</Subtitle>
                        <img src={pokemon.imageShiny} alt={pokemon.name + ' Shine version'} />
                    </DetailSection>
                </section>
            </PokemonSpecifications>
        </>
    );
}