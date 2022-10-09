import React, { useEffect, useState } from "react";

import { Header } from "../../components";
import BusinessCard from "../../components/businessCard/BusinessCard";
import { axiosclient } from "../../lib/api";
import { Business } from "../../utils/types";

const Home = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [direction, setDirection] = useState<"column" | "row">("column");
  const [searchedBusinesses, setSearchedBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    axiosclient
      .get("/api/business")
      .then((res) => {
        setBusinesses(res.data);
        setSearchedBusinesses(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearchStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (query === "") {
      setSearchedBusinesses(businesses);
    } else {
      const relevantBusinesses = businesses.filter((business) =>
        business.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setSearchedBusinesses(relevantBusinesses);
    }
  };

  return (
    <div>
      <Header
        title="BizAd"
        subtitle="Advertise your business"
        isHalfWidth={false}
      />
      <div className="mt-4 px-2">
        <div className="d-flex align-items-center">
          <div className="input-group w-100">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ flex: "none" }}
              onChange={handleSearchStringChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setDirection("row");
              }}
            >
              <i className="bi bi-list-task"></i>
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setDirection("column");
              }}
            >
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`mt-4 d-flex gap-4 ${
            direction === "row" ? "flex-column" : "flex-wrap"
          }`}
        >
          {searchedBusinesses.length > 0 &&
            searchedBusinesses.map((business) => (
              <BusinessCard
                name={business.name}
                description={business.description}
                image={business.image}
                phone={business.phone}
                address={business.address}
                url={business.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
