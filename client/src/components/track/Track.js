import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrackItem from "../tracks/TrackItem";
import Spinner from "../common/Spinner";
import { getTrack } from "../../actions/trackActions";

class Track extends Component {
  componentDidMount() {
    this.props.getTrack(this.props.match.params.id);
  }

  render() {
    const { track, loading } = this.props.track;
    let trackContent;

    if (track === null || loading || Object.keys(track).length === 0) {
      trackContent = <Spinner />;
    } else {
      trackContent = (
        <div>
          <TrackItem track={track} showActions={false} />
        </div>
      );
    }

    return (
      <div className="track">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {trackContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Track.propTypes = {
  getTrack: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  track: state.track
});

export default connect(mapStateToProps, { getTrack })(Track);
