import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import client from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { fetchAllPins, fetchPinsQuery } from "../utils/data";

const Feed = ({ loading, setLoading }) => {
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = fetchPinsQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data.length === 0 ? null : data);
        setLoading(false);
      });
    } else {
      client.fetch(fetchAllPins).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  return (
    <div>
      {!!pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <h1>Sorry! We couldn't find pins related to this topic!</h1>
      )}
    </div>
  );
};

export default Feed;
