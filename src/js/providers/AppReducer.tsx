export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_CONTACT":
      return {
        ...state,
        currentContact: action.payload,
      };

    case "SET_ACKNOWLEDGED_IDS":
      return {
        ...state,
        acknowledgedIds: action.payload,
      };

    default:
      return state;
  }
};
