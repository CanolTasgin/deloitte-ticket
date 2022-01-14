import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Image, Button } from "react-bootstrap";

export default function EventDetail() {
  const { id } = useParams();
  const [details, setDetails] = useState();

  const getDetails = async () => {
    try {
      const res = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=ETG7Ye6TEGdENcwB6NR0HjFcLimxZyxm`
      );
      setDetails(res);
    } catch (err) {
      console.error(
        "Error occured while trying to recieve forms\nError: ",
        err
      );
    }
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("details", details);

  return (
    <Container style={{ padding: 40 }}>
      <Link to={"/"}>
        <Button
          style={{
            backgroundColor: "#000000",
            border: "none",
            marginBottom: 5,
          }}
        >
          &lt; Back to Home
        </Button>
      </Link>
      {details && details.data ? (
        <div>
          {details.data.images && details.data.images.length > 0 && (
            <Image
              width={300}
              alt={details.data.images[0].url}
              src={details.data.images[0].url}
            />
          )}
          <h2>{details.data.name}</h2>
          <p>{details.data.info}</p>
          <strong>
            {details.data.ticketLimit && details.data.ticketLimit.info}
          </strong>
          <br />
          {details.data._embedded && details.data._embedded.venues.length > 0
            ? details.data._embedded.venues.map((venue, index) => (
                <p key={index}>
                  {venue.name}{" "}
                  {index < details.data._embedded.venues.length - 1 ? ", " : ""}
                </p>
              ))
            : "No venues"}
          <br />
          <h3>Ticketing Details</h3>
          {details.data.ticketing && details.data.ticketing.healthCheck && (
            <>
              <p>{details.data.ticketing.healthCheck.description}</p>
              <a href={details.data.ticketing.healthCheck.learnMoreUrl}>
                Learn More
              </a>
            </>
          )}
          <h3>Please Note</h3>
          <p>{details.data.pleaseNote}</p>
        </div>
      ) : (
        <div>Couldn't find event details. Please checkout other events.</div>
      )}
    </Container>
  );
}
