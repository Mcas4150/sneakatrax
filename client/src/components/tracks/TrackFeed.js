import React, { Component } from "react";
import PropTypes from "prop-types";
import TrackItem from "./TrackItem";

class TrackFeed extends Component {
  render() {
    const { tracks } = this.props;

    return tracks.map(track => <TrackItem key={track._id} track={track} />);
  }
}

TrackFeed.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default TrackFeed;
