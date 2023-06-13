// Define initial state for the mail reducer
const initialState = {
    mails: [],
  };

  // Define the mail reducer function
  const mailReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MAILS':
        // Update the state with the fetched mails
        return {
          ...state,
          mails: action.payload,
        };
      default:
        // Return the current state for any other action
        return state;
    }
  };

  // Export the mail reducer
  export default mailReducer;
