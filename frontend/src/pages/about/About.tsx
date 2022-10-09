import React from "react";
import { Header } from "../../components";

const About = () => {
  return (
    <div className="vw-100 vh-100">
      <div>
        <Header
          title="About This App"
          subtitle="What makes BizAd the #1 app for advertising businesses"
          isHalfWidth={true}
        />

        <div className="text-center w-50 mx-auto">
          <p className="fs-5 mt-5">
            Everyday many business owners choose to use our app to advertise
            their business and to gain more traction to their website and online
            store
          </p>
          <button type="button" className="btn btn-primary">
            Start Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
