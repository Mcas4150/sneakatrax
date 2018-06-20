import {
  ADD_TRACK,
  GET_TRACKS,
  GET_TRACK,
  DELETE_TRACK,
  TRACK_LOADING
} from "../actions/types";

const initialState = {
  tracks: [],
  track: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TRACK_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        loading: false
      };
    case GET_TRACK:
      return {
        ...state,
        track: action.payload,
        loading: false
      };
    case ADD_TRACK:
      return {
        ...state,
        tracks: [action.payload, ...state.tracks]
      };
    case DELETE_TRACK:
      return {
        ...state,
        tracks: state.tracks.filter(track => track._id !== action.payload)
      };
    default:
      return state;
  }
}
