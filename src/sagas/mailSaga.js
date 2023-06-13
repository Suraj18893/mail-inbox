import { put, takeEvery, call } from 'redux-saga/effects';
import { setMails } from '../actions/mailActions';

// Worker saga responsible for fetching mails
function* fetchMails() {
  try {
    // Make API request to fetch mails
    const response = yield call(fetch, 'https://run.mocky.io/v3/15a3a1c3-1cda-4409-b1b1-2f39f5f25123');
    const mails = yield response.json();
    // Dispatch action to set mails in the store
    yield put(setMails(mails));
  } catch (error) {
    console.log('Error fetching mails:', error);
  }
}

// Watcher saga that listens for FETCH_MAILS action
function* mailSaga() {
  yield takeEvery('FETCH_MAILS', fetchMails);
}

export default mailSaga;
