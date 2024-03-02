import React, { useEffect, useState } from "react";
import MasonryLayout from "./MasonryLayout";
import client from "../client";
import Spinner from "./Spinner";
import { fetchPinsQuery } from "../utils/data";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (/\w+/g.test(searchTerm)) {
      setLoading(true);

      const query = fetchPinsQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
      setLoading(false);
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && !loading && (
        <div className="mt-10 text-center text-xl">No pins found!</div>
      )}
    </div>
  );
};

export default Search;
