import axios from "axios";

import {
  ADD_TRACK,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TRACKS,
  GET_TRACK,
  TRACK_LOADING,
  DELETE_TRACK
} from "./types";

// Add Post
export const addTrack = trackData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/tracks", trackData)
    .then(res =>
      dispatch({
        type: ADD_TRACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getTracks = () => dispatch => {
  dispatch(setTrackLoading());
  axios
    .get("/api/tracks")
    .then(res =>
      dispatch({
        type: GET_TRACKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRACKS,
        payload: null
      })
    );
};

// Get Post
export const getTrack = id => dispatch => {
  dispatch(setTrackLoading());
  axios
    .get(`/api/tracks/${id}`)
    .then(res =>
      dispatch({
        type: GET_TRACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRACK,
        payload: null
      })
    );
};

// Delete Post
export const deleteTrack = id => dispatch => {
  axios
    .delete(`/api/tracks/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TRACK,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/tracks/like/${id}`)
    .post(`/api/profile/like/${id}`)
    .then(res => dispatch(getTracks()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/tracks/unlike/${id}`)
    .then(res => dispatch(getTracks()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setTrackLoading = () => {
  return {
    type: TRACK_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
