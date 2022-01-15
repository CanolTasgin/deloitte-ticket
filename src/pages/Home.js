import React, { useEffect, useState, Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Pagination from "../components/Pagination";
import spinner from "../assets/spinner.gif";

export default function Home() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [searchKey, setKeyword] = useState("");

  let page = searchParams.get("page") || 1;
  let keyword = searchParams.get("keyword") || "";

  const searchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=ETG7Ye6TEGdENcwB6NR0HjFcLimxZyxm&size=${size}&keyword=${keyword}&page=${
          page - 1
        }`
      );
      setTickets(res);
    } catch (err) {
      console.error(
        "Error occured while trying to recieve forms\nError: ",
        err
      );
    }
    setLoading(false);
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setSearchParams({ keyword: searchKey });
    }
    setKeyword(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setSearchParams({ keyword: searchKey });
    }
  };

  const pageSizeEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchEvents();
    }
  };

  const handleSearchSubmit = (e) => {
    if (searchKey) {
      setSearchParams({ keyword: searchKey });
    } else {
      alert("Please enter some search text!");
    }
  };

  useEffect(() => {
    searchEvents();
  }, [keyword, page]);

  return (
    <Container fluid="sm">
      <h1>Home page</h1>
      <Form.Label htmlFor="basic-url">Page Size</Form.Label>
      <Form
        inline
        className="d-flex"
        size="sm"
        style={{ width: 300, marginBottom: 10 }}
      >
        <FormControl
          onChange={(e) => setSize(e.target.value)}
          onKeyDown={pageSizeEnter}
          value={size}
          type="number"
          placeholder="Page Size"
          className="mr-sm-2"
        />
        <Button onClick={() => searchEvents()} variant="outline-info">
          Refresh
        </Button>
      </Form>

      <Form.Label htmlFor="basic-url">Search</Form.Label>

      <Form inline className="d-flex" style={{ width: 500, marginBottom: 10 }}>
        <FormControl
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          value={searchKey}
          type="text"
          placeholder="Search"
          className="mr-sm-2"
        />
        <Button onClick={() => handleSearchSubmit()} variant="outline-info">
          Search
        </Button>
      </Form>
      {tickets && tickets.data && tickets.data.page.totalElements > 0 ? (
        <Fragment>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Venues</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {tickets.data._embedded.events.map((event, index) => (
                <tr key={index}>
                  <td>{index + 1 + (page - 1) * size}</td>
                  <td>{event.name}</td>
                  <td>
                    {event._embedded && event._embedded.venues.length > 0
                      ? event._embedded.venues.map((venue, index) => (
                          <p key={index}>
                            {venue.name}{" "}
                            {index < event._embedded.venues.length - 1
                              ? ", "
                              : ""}
                          </p>
                        ))
                      : "No venues"}
                  </td>
                  <td>
                    {event.dates &&
                      event.dates.start &&
                      event.dates.start.localDate}
                  </td>
                  <td>
                    {event.dates &&
                      event.dates.start &&
                      event.dates.start.localTime}
                  </td>
                  <td>
                    {event.dates &&
                      event.dates.status &&
                      event.dates.status.code}
                  </td>
                  <td>
                    <Link to={`/event/${event.id}`}>
                      <Button
                        style={{ backgroundColor: "#000000", border: "none" }}
                      >
                        >
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {tickets.data.page && <Pagination pageInfo={tickets.data.page} />}
        </Fragment>
      ) : (
        <Fragment>
          {loading ? (
            <img src={spinner} alt="Loading Spinner" />
          ) : (
            <h2>No results found</h2>
          )}
        </Fragment>
      )}
    </Container>
  );
}
