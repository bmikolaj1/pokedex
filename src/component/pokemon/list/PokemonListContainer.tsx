import React from "react";
import PokemonListView from "./PokemonListView";
import PokemonDetailsView from "../view/PokemonDetailsView";
import axios from "axios";
import { IPokemonShort } from "../../../model/pokemon/PokemonShort";
import { IPokemon } from "../../../model/pokemon/Pokemon";
import { Globals } from "../../../util/Globals";
import { message } from "antd";

interface IPokemonShortContainerState {
  pokemonList: IPokemonShort[];
  pokemon?: IPokemon;
  showDetails: boolean;
  numOfElements: number;
}

class PokemonListContainer extends React.Component<
  any,
  IPokemonShortContainerState
> {
  state: IPokemonShortContainerState = {
    showDetails: false,
    pokemonList: [],
    numOfElements: 0
  };

  componentDidMount() {
    this.loadData();
  }

  onPageChange = (page: number) => {
    this.loadData(page);
  };

  loadData = (page?: number) => {
    let offset = page ? (page - 1) * 10 : 0;
    const self = this;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
      .then(function(response: any) {
        let pokemonResponse = response.data.results;
        let pokemons = localStorage.getItem(Globals.localStorageKey);
        if (pokemons) {
          let favorites = JSON.parse(pokemons);
          for (let favorite of favorites) {
            for (let pokemon of pokemonResponse) {
              if (pokemon.name === favorite.name) {
                pokemon.isFavorite = true;
              }
            }
          }
        } else {
        }
        self.setState({
          pokemonList: pokemonResponse,
          numOfElements: response.data.count
        });
      })
      .catch(function(error) {})
      .then(function() {});
  };

  onRowClick = (url: string) => {
    const self = this;
    axios
      .get(url)
      .then(function(response: any) {
        self.setState({
          pokemon: response.data,
          showDetails: true
        });
      })
      .catch(function(error) {})
      .then(function() {});
  };

  onHandleFavorites = (record: IPokemonShort) => {
    let favorites = localStorage.getItem(Globals.localStorageKey);
    let oldFavorites = [];

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      oldFavorites = parsedFavorites;
    }

    if (record.isFavorite) {
      oldFavorites.push(record);
    } else {
      oldFavorites = oldFavorites.filter(function(item: IPokemonShort) {
        return item.name !== record.name;
      });
    }

    let newPokemonList = this.state.pokemonList;
    newPokemonList.forEach(function(item: IPokemonShort) {
      if (record.name === item.name) {
        item.isFavorite = record.isFavorite;
      }
    });

    this.setState({
      pokemonList: newPokemonList
    });

    localStorage.setItem(Globals.localStorageKey, JSON.stringify(oldFavorites));
    message.success("Pokemon list updated!");
  };

  onClose = () => {
    this.setState({ showDetails: false });
  };

  render = () => {
    return (
      <React.Fragment>
        {this.state.showDetails && (
          <PokemonDetailsView
            pokemon={this.state.pokemon ? this.state.pokemon : undefined}
            onClose={this.onClose}
          ></PokemonDetailsView>
        )}
        {this.state.pokemonList && this.state.pokemonList.length > 0 && (
          <PokemonListView
            pokemonList={this.state.pokemonList}
            onRowClick={this.onRowClick}
            onHandleFavorites={this.onHandleFavorites}
            onPageChange={this.onPageChange}
            numOfElements={this.state.numOfElements}
          ></PokemonListView>
        )}
      </React.Fragment>
    );
  };
}

export default PokemonListContainer;
