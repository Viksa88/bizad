import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Select } from "../../components";
import { axiosclient } from "../../lib/api";
import { statuses } from "../../utils/constants";
import { Service } from "../../utils/types";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isServiceUpdateLoading, setIsServiceUpdateLoading] =
    useState<boolean>(false);

  const [intialService, setInitialService] = useState<Service>({
    name: "",
    status: "",
    comment: "",
  });

  const [service, setService] = useState<Service>({
    name: "",
    status: "",
    comment: "",
  });

  const handleServiceStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const status: string = e.target.value;
    setService((prevState) => {
      return {
        ...prevState,
        status: status,
      };
    });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment: string = e.target.value;
    setService((prevState) => {
      return {
        ...prevState,
        comment: comment,
      };
    });
  };

  useEffect(() => {
    axiosclient
      .get(`/api/services/${id}`)
      .then((res) => {
        setService(res.data);
        setInitialService(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsServiceUpdateLoading(true);
    await axiosclient
      .put(`/api/services/${id}`, service)
      .then((res) => {
        setIsServiceUpdateLoading(false);
        navigate("/services");
      })
      .catch((err) => {
        setIsServiceUpdateLoading(false);
        alert("Service update failed");
      });

    setIsServiceUpdateLoading(false);
  };

  const handleCancelButtonClick = () => {
    navigate("/services");
  };

  return (
    <div className="w-25 px-2 mt-4">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <Select
            items={statuses}
            onChange={handleServiceStatusChange}
            selectedItem={service.status}
          />
        </div>

        <div className="my-3">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <textarea
            onChange={handleCommentChange}
            className="form-control"
            id="comment"
            value={service.comment}
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <Button
            title="Update"
            variant="btn-outline-success"
            type="submit"
            isLoading={isServiceUpdateLoading}
            disabled={
              intialService.status === service.status &&
              (intialService.comment === service.comment ||
                (intialService.comment === undefined && service.comment === ""))
            }
          />

          <Button
            onClick={handleCancelButtonClick}
            title="Cancel"
            variant="btn-outline-secondary"
          />
        </div>
      </form>
    </div>
  );
};

export default ServiceDetails;
