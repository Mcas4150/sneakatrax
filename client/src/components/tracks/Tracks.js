import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TrackForm from "./TrackForm";
import TrackFeed from "./TrackFeed";
import Spinner from "../common/Spinner";
import { getTracks } from "../../actions/trackActions";
import "./Tracks.css";

class Tracks extends Component {
  componentDidMount() {
    this.props.getTracks();
  }

  render() {
    const { tracks, loading } = this.props.track;
    let trackContent;

    if (tracks === null || loading) {
      trackContent = <Spinner />;
    } else {
      trackContent = <TrackFeed tracks={tracks} />;
    }

    return (
      <div className="tracklist container">
        <TrackForm />
        {trackContent}
      </div>
    );
  }
}

Tracks.propTypes = {
  getTracks: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  track: state.track
});

export default connect(
  mapStateToProps,
  { getTracks }
)(Tracks);
