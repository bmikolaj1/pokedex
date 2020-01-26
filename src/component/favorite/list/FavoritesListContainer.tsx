import React from "react";
import axios from "axios";
import { IPokemonShort } from "../../../model/pokemon/PokemonShort";
import { IPokemon } from "../../../model/pokemon/Pokemon";
import FavoritesListView from "./FavoritesListView";
import PokemonDetailsView from "../../pokemon/view/PokemonDetailsView";
import { Globals } from "../../../util/Globals";

interface IFavoritesListContainerState {
  favoritesList: IPokemonShort[];
  favorites?: IPokemon;
  showDetails: boolean;
}

class FavoritesListContainer extends React.Component<
  any,
  IFavoritesListContainerState
> {
  state: IFavoritesListContainerState = {
    showDetails: false,
    favoritesList: []
  };

  componentDidMount() {
    let pokemons = localStorage.getItem(Globals.localStorageKey);
    if (pokemons) {
      this.setState({ favoritesList: JSON.parse(pokemons) });
    }
  }

  onRowClick = (url: string) => {
    const self = this;
    axios
      .get(url)
      .then(function(response: any) {
        self.setState({
          favorites: response.data,
          showDetails: true
        });
      })
      .catch(function(error) {})
      .then(function() {});
  };

  onClose = () => {
    this.setState({ showDetails: false });
  };

  render = () => {
    return (
      <React.Fragment>
        {this.state.showDetails && (
          <PokemonDetailsView
            pokemon={this.state.favorites ? this.state.favorites : undefined}
            onClose={this.onClose}
          ></PokemonDetailsView>
        )}
        {this.state.favoritesList && this.state.favoritesList.length > 0 && (
          <FavoritesListView
            favoritesList={this.state.favoritesList}
            onRowClick={this.onRowClick}
          ></FavoritesListView>
        )}
      </React.Fragment>
    );
  };
}

export default FavoritesListContainer;
