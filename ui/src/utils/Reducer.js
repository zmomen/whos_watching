import { getNowPlaying } from "./api";

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_GLOBAL_USER":
      return {
        ...state,
        userId: action.payload,
      };
    case "GET_NOW_PLAYING":
      let nowPlaying = null;
      getNowPlaying()
      .then(({ data }) => {
        nowPlaying = data;
        console.warn("called?", nowPlaying);
        })
        .catch((err) => console.warn("dispatch err", err));
      return {
        ...state,
        nowPlaying: nowPlaying,
      };
    default:
      return state;
  }
};

export default Reducer;
