import React from "react";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Details of event with id: {id}</h1>
    </div>
  );
}
