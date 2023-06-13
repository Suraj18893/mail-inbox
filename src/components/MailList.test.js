import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import MailList from "../components/MailList";

describe("MailList component", () => {
  const mockStore = configureStore([]);
  const mockMails = [
    { id: 1, subject: "Test Mail 1", tag: "inbox" },
    { id: 2, subject: "Test Mail 2", tag: "inbox" },
    { id: 3, subject: "Test Mail 3", tag: "draft" },
    { id: 4, subject: "Test Mail 4", tag: "spam" },
    { id: 5, subject: "Test Mail 5", tag: "trash" },
  ];
  let store;

  beforeEach(() => {
    store = mockStore({
      mails: mockMails,
    });
  });

  test("renders the Mail List header", () => {
    render(
      <Provider store={store}>
        <Router>
          <MailList />
        </Router>
      </Provider>
    );
    const headerElement = screen.getByText(/Mail List/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the mail subjects when mails are loaded", () => {
    render(
      <Provider store={store}>
        <Router>
          <MailList />
        </Router>
      </Provider>
    );
    const mailSubjectElements = screen.getAllByRole("link");
    expect(mailSubjectElements).toHaveLength(2);
    expect(mailSubjectElements[0]).toHaveTextContent("Test Mail 1");
    expect(mailSubjectElements[1]).toHaveTextContent("Test Mail 2");
  });

  test('renders the default tag as "Inbox"', () => {
    render(
      <Provider store={store}>
        <Router>
          <MailList />
        </Router>
      </Provider>
    );
    const defaultTagElement = screen.getByDisplayValue("Inbox");
    expect(defaultTagElement).toBeInTheDocument();
  });

  test("changes the selected tag when a different tag is selected", () => {
    render(
      <Provider store={store}>
        <Router>
          <MailList />
        </Router>
      </Provider>
    );
    const tagSelectElement = screen.getByRole("combobox");
    fireEvent.change(tagSelectElement, { target: { value: "spam" } });
    const selectedTagElement = screen.getByDisplayValue("Spam");
    expect(selectedTagElement).toBeInTheDocument();
  });

  test("displays the filtered mails based on the selected tag", () => {
    render(
      <Provider store={store}>
        <Router>
          <MailList />
        </Router>
      </Provider>
    );
    const tagSelectElement = screen.getByRole("combobox");
    fireEvent.change(tagSelectElement, { target: { value: "draft" } });
    const mailSubjectElements = screen.getAllByRole("link");
    expect(mailSubjectElements).toHaveLength(1);
    expect(mailSubjectElements[0]).toHaveTextContent("Test Mail 3");
  });
});
