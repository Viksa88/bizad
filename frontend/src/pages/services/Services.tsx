import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Alert, Badge, Button, Header, Select } from "../../components";
import { axiosclient } from "../../lib/api";
import { statuses } from "../../utils/constants";
import { SelectItem, Service } from "../../utils/types";
import { DropDownService } from "../../utils/types/dropDownService";

const Services = () => {
  const [dropdownServices, setDropDownServices] = useState<SelectItem[]>([]);
  const [currentUserServices, setCurrentUserServices] = useState<Service[]>([]);

  const [service, setService] = useState<Service>({
    name: "",
    status: "",
  });

  const [isServiceCreateLoading, setIsServiceCreateLoading] =
    useState<boolean>(false);

  const [isServicesLoading, setIsServicesLoading] = useState<boolean>(false);

  useEffect(() => {
    axiosclient
      .get("/api/dropdown/services")
      .then((res) => {
        setDropDownServices(
          res.data.map((item: DropDownService) => {
            return {
              name: item.name,
              value: item.name,
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const fetchCurrentUserServices = async () => {
    setIsServicesLoading(true);
    await axiosclient
      .get("/api/services")
      .then((res) => {
        setCurrentUserServices(res.data);
        setIsServicesLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsServicesLoading(false);
      });

    setIsServicesLoading(false);
  };

  useEffect(() => {
    fetchCurrentUserServices();
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceName: string = e.target.value;

    setService((prevState) => {
      return {
        ...prevState,
        name: serviceName,
      };
    });
  };

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

  const handleServiceCreateFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsServiceCreateLoading(true);

    await axiosclient
      .post("/api/services", service)
      .then((res) => {
        fetchCurrentUserServices();
        setIsServiceCreateLoading(false);
      })
      .catch((err) => {
        alert("Service adding failed");
        setIsServiceCreateLoading(false);
      });

    setIsServiceCreateLoading(false);
  };

  const handleServiceDeleteClick = async (serviceid: string | undefined) => {
    await axiosclient
      .delete(`/api/services/${serviceid}`)
      .then((res) => {
        fetchCurrentUserServices();
      })
      .catch((err) => {
        alert("Service deletion failed");
      });
  };

  return (
    <div>
      <Header
        title="Services"
        subtitle="Choose services that you would like to get from BizAd"
        isHalfWidth={false}
      />

      <form onSubmit={handleServiceCreateFormSubmit}>
        <div className="d-flex align-items-center gap-4 mt-4 px-2">
          <div className="d-flex align-items-center gap-2">
            <p className="m-0"> Service Name: </p>
            <div>
              <Select
                items={dropdownServices}
                onChange={handleServiceChange}
                selectedItem={service.name}
              />
            </div>
          </div>

          <div className="d-flex align-items-center justify-items-center gap-2">
            <p className="m-0"> Status: </p>
            <div>
              <Select
                items={statuses}
                onChange={handleServiceStatusChange}
                selectedItem={service.status}
              />
            </div>
          </div>

          <Button
            type="submit"
            title="Add"
            isLoading={isServiceCreateLoading}
            variant="btn-outline-success"
          />
        </div>
      </form>

      <div className="px-2">
        <div className="my-4">
          {!isServicesLoading && currentUserServices.length === 0 && (
            <Alert
              variant="alert-success"
              message="You haven't selected any services yet"
            />
          )}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Service Name</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentUserServices.length > 0 &&
              currentUserServices.map((service) => (
                <tr className="table-light" key={uuidv4()}>
                  <td>
                    <Link to={`/services/${service._id}`}>{service.name}</Link>
                  </td>

                  <td>
                    {service.status === "active" ? (
                      <Badge text={service.status} variant="text-bg-success" />
                    ) : (
                      <Badge
                        text={service.status}
                        variant="text-bg-secondary"
                      />
                    )}
                  </td>
                  <td>
                    <i
                      className="bi bi-trash3 pe-auto"
                      onClick={() => handleServiceDeleteClick(service._id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
