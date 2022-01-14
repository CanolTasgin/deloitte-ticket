import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pageNum, setPage] = useState(0);

  const searchEvents = async () => {
    try {
      const res = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=ETG7Ye6TEGdENcwB6NR0HjFcLimxZyxm&size=10&keyword=${keyword}&${pageNum.toString()}`
      );
      setTickets(res);
    } catch (err) {
      console.error(
        "Error occured while trying to recieve forms\nError: ",
        err
      );
    }
  };

  const handleSearchInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (keyword) {
      searchEvents();
    } else {
      alert("Please enter some search text!");
    }
  };

  useEffect(() => {
    searchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("response:", tickets);
  return (
    <Container fluid="sm">
      <h1>Home page</h1>
      <Form inline className="d-flex">
        <FormControl
          onChange={handleSearchInput}
          value={keyword}
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
          {/* <h2>{tickets && tickets.data.page.totalElements} results found</h2> */}
          <Table striped bordered hover style={{ marginTop: 10 }}>
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
                  <td>{index + 1}</td>
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
        </Fragment>
      ) : (
        <Fragment>
          <h2>No results found</h2>
        </Fragment>
      )}
    </Container>
  );
}
