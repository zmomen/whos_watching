import { getAllMedia } from "./api";

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_GLOBAL_USER":
      return {
        ...state,
        userId: action.payload,
      };
    case "GET_ALL_MEDIA":
      let mediaData = null;
      getAllMedia()
        .then(({ data }) => {
          mediaData = data;
        })
        .catch((err) => console.warn("dispatch err", err));
      return {
        ...state,
        media: mediaData,
      };
    default:
      return state;
  }
};

export default Reducer;
