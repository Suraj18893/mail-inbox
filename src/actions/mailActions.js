// Action creator to initiate the fetching of mails
export const fetchMails = () => ({
    type: 'FETCH_MAILS',
  });

  // Action creator to set the fetched mails in the state
  export const setMails = (mails) => ({
    type: 'SET_MAILS',
    payload: mails,
  });
  