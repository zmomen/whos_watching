const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_GLOBAL_USER":
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
