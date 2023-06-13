import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMails } from '../actions/mailActions';

const MailDetail = () => {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails);
  const { id } = useParams();
  const selectedMail = mails.find((mail) => mail.id === parseInt(id));

  useEffect(() => {
    dispatch(fetchMails());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="mt-4">Mail Details</h1>
      {selectedMail ? (
        <div className="card my-4">
          <div className="card-header">Subject: {selectedMail.subject}</div>
          <div className="card-body">
            <p className="card-text">Body: {selectedMail.body}</p>
          </div>
        </div>
      ) : (
        <p>Mail not found.</p>
      )}
    </div>
  );
};

export default MailDetail;
