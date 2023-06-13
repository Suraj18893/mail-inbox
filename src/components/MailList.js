import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchMails } from "../actions/mailActions";

const MailList = () => {
  const dispatch = useDispatch();
  const [selectedTag, setSelectedTag] = useState(
    () => sessionStorage.getItem("selectedTag") || "inbox"
  );
  const [searchQuery, setSearchQuery] = useState(
    () => sessionStorage.getItem("searchQuery") || ""
  );
  const mails = useSelector((state) => state.mails);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch mails on component mount
  useEffect(() => {
    dispatch(fetchMails());
  }, [dispatch]);

  // Update selectedTag and searchQuery when URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tag = queryParams.get("tag");
    const query = queryParams.get("q");
    setSelectedTag(tag || "inbox");
    setSearchQuery(query || "");
  }, [location]);

  // Handle tag change
  const handleTagChange = (event) => {
    const newTag = event.target.value;
    setSelectedTag(newTag);
    navigate(`?q=${searchQuery}&tag=${newTag}`);
  };

  // Handle search
  const handleSearch = (event) => {
    event.preventDefault();
    const newQuery = searchQuery;
    setSearchQuery(newQuery);
    navigate(`?q=${newQuery}&tag=${selectedTag}`);
  };

  // Filter mails based on selected tag
  const filteredMails =
    selectedTag === "all"
      ? mails
      : mails.filter((mail) => mail.tag === selectedTag);

  // Filter search results based on search query
  const searchResults = filteredMails.filter((mail) =>
    mail.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save selectedTag and searchQuery to session storage
  useEffect(() => {
    sessionStorage.setItem("selectedTag", selectedTag);
    sessionStorage.setItem("searchQuery", searchQuery);
  }, [selectedTag, searchQuery]);

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Mail List</h1>
      <div className="mb-4">
        <h3>Tags:</h3>
        <select
          className="form-select"
          value={selectedTag}
          onChange={handleTagChange}
        >
          <option value="inbox">Inbox</option>
          <option value="draft">Draft</option>
          <option value="spam">Spam</option>
          <option value="trash">Trash</option>
          <option value="all">All</option>
        </select>
      </div>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      {mails.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {searchQuery && (
            <p>
              Search results for <strong>{searchQuery}</strong> (
              {searchResults.length} mails)
            </p>
          )}
          <ul className="list-group">
            {searchResults.map((mail) => (
              <li className="list-group-item" key={mail.id}>
                <Link
                  to={`/mail/${mail.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h3>{mail.subject}</h3>
                </Link>
                <p>Tag: {mail.tag}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MailList;
