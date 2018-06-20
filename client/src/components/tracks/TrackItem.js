import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { addLikeToProfile } from "../../actions/profileActions";
import { deleteTrack, addLike } from "../../actions/trackActions";
import ReactPlayer from "react-player";

class TrackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };

    this.onClickPlay = this.onClickPlay.bind(this);
  }

  onDeleteClick(id) {
    this.props.deleteTrack(id);
  }

  onLikeClick(id) {
    // const likeData = {
    //   title: req.body.title,
    //   artist: req.body.artist,
    //   youtube: req.body.youtube,
    //   discogs: req.body.discogs
    // }

    this.props.addLike(id);
    this.props.addLikeToProfile(id);
    // this.props.addLikeToProfile(likeData, this.props.history);
  }

  onClickPlay(e) {
    this.setState({
      playing: true
    });
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { track, auth, showActions } = this.props;
    const { playing } = this.state;

    const player = (
      <ReactPlayer
        url={track.youtube}
        controls="true"
        width="auto"
        height="100%"
      />
    );

    const thumbnail = (
      <img
        src={"https://img.youtube.com/vi/" + track.youtube.slice(17) + "/0.jpg"}
      />
    );

    return (
      <div className="track-card">
        <div className="track-card__player" onClick={this.onClickPlay}>
          {playing ? player : thumbnail}
        </div>
        <div className="track-card__info">
          <a href={track.discogs} target="_blank">
            <h4 className="track-card__info__title">{track.title}</h4>
          </a>
          <h5 className="track-card__info__artist">{track.artist}</h5>

          <div className="track-card__info__details">
            {/* <p className="track-card__info__details-poster">{track.name}</p> */}
            {/* <p className="track-card__info__details-votes">
              {showActions ? (
                <span>
                  <button
                    onClick={this.onLikeClick.bind(this, track._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-smile", {
                        "text-info": this.findUserLike(track.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {track.likes.length}
                    </span>
                  </button>

                  {track.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, track._id)}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </p> */}
          </div>
        </div>
      </div>
    );
  }
}

TrackItem.defaultProps = {
  showActions: true
};

TrackItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  addLikeToProfile: PropTypes.func.isRequired,
  deleteTrack: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    deleteTrack,
    addLike,
    addLikeToProfile
  }
)(TrackItem);
