import React from "react";
import {
  Container,
  Form,
  FormControl,
  Button,
  ListGroup,
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

export default function About() {
  return (
    <Container style={{ padding: 50 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", paddingRight: 30 }}>
          <Button>&lt; Home</Button>
        </Link>
        <h1>Features</h1>
        <br />
      </div>
      <ListGroup>
        <ListGroup.Item>Search</ListGroup.Item>
        <ListGroup.Item>Dynamic Page Size</ListGroup.Item>
        <ListGroup.Item>Custom Pagination Component</ListGroup.Item>
        <ListGroup.Item>Event Details Page</ListGroup.Item>
        <ListGroup.Item>Sort by Name and Date in current page</ListGroup.Item>
        <ListGroup.Item>
          Continuous deployment with Github and{" "}
          <a href="https://vercel.com/">Vercel</a>
        </ListGroup.Item>
      </ListGroup>
      <br />
      <h3>Details</h3>
      <p>
        <a href="https://reactrouter.com/docs/en/v6/getting-started/overview">
          React-router-dom v6
        </a>{" "}
        for routing and passing search parameters.{" "}
      </p>
      <p>
        Used axios library to fetch event informations from{" "}
        <a href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2">
          {" "}
          Ticket Master Discovery API
        </a>
      </p>
      <p>
        <a href="https://react-bootstrap.github.io/">React-bootstrap</a> library
        for styling of the pagination and table components and implemented their
        functionalities from scratch
      </p>
      <p>
        Limited upper limit of pagination to page 99 due to limitations of
        Ticketmaster API. As also stated in the Rate Limits section of the
        document, they only support retrieving the 1000th item.
      </p>
      <p>
        In the project instructions, I wasn't allowed to send a new request for
        sorting, so I had to implement sorting feature for only the page that
        user recieved. i.e. if user is in 5th page and wants to sort events by
        date, only the events in the 5th page will be sorted. Unfortunetly
        TicketMaster API does not send all events at once to allow me to create
        a proper sorting feature.
      </p>
    </Container>
  );
}
