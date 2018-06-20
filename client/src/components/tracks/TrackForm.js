import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputGroup from "../common/InputGroup";
import { addTrack } from "../../actions/trackActions";

class TrackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newTrack = {
      title: this.state.title,
      artist: this.state.artist,
      youtube: this.state.youtube,
      discogs: this.state.discogs,
      name: user.name
    };

    this.props.addTrack(newTrack);
    this.setState({
      title: "",
      artist: "",
      youtube: "",
      discogs: "",
      hidden: true
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(e) {
    this.setState({
      hidden: false
    });
  }

  render() {
    const { errors, hidden } = this.state;

    const addButton = (
      <div className="add-button" onClick={this.onClick}>
        <i id="icon" class="fa fa-plus" />
      </div>
    );

    const addForm = (
      <div className="add-form">
        <div className="card-dull">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <InputGroup
                placeholder="title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <InputGroup
                placeholder="artist"
                name="artist"
                value={this.state.artist}
                onChange={this.onChange}
                error={errors.artist}
              />
              <InputGroup
                placeholder="url (use youtube share link!)"
                name="youtube"
                value={this.state.youtube}
                onChange={this.onChange}
                error={errors.youtube}
              />
              <InputGroup
                placeholder="discogs"
                name="discogs"
                value={this.state.discogs}
                onChange={this.onChange}
                error={errors.discogs}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Add Track
            </button>
          </form>
        </div>
      </div>
    );

    return <div className="add-section">{hidden ? addButton : addForm}</div>;
  }
}

TrackForm.propTypes = {
  addTrack: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTrack }
)(TrackForm);
