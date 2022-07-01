import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock';
import '../styles/_discover.scss';
import { connect } from 'react-redux';
import {
  fetchNewReleasesList,
  fetchFeaturedPlaylistsList,
  fetchCategoriesList
} from "../../../redux/reducers"

class Discover extends Component {
  constructor(props) {
    super(props);
    this.props.fetchNewReleasesList();
    this.props.fetchFeaturedPlaylistsList();
    this.props.fetchCategoriesList();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      newReleaseLoading: "",
      featuredListLoading: "",
      categoryLoading: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      newReleaseLoading: props.newReleaseLoading,
      featuredListLoading: props.featuredListLoading,
      categoryLoading: props.categoryLoading,
      newReleases: props.newReleases,
      playlists: props.playlists,
      categories: props.categories
    };
  }

  render() {
    const {
      newReleases,
      playlists,
      categories,
      newReleaseLoading,
      featuredListLoading,
      categoryLoading
    } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} loading={newReleaseLoading} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} loading={featuredListLoading} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" loading={categoryLoading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newReleaseLoading: state.MusicLists.newReleaseLoading,
  featuredListLoading: state.MusicLists.featuredListLoading,
  categoryLoading: state.MusicLists.categoryLoading,
  newReleases: state.MusicLists.newReleasesList,
  playlists: state.MusicLists.featuredPlaylistsList,
  categories: state.MusicLists.categoriesList,
});

const mapDispatchToProps = { fetchNewReleasesList, fetchFeaturedPlaylistsList, fetchCategoriesList };
export default connect(mapStateToProps, mapDispatchToProps)(Discover);