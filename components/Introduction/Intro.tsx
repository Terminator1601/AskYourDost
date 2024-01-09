import React from "react";
import Link from "next/link";

const Intro = () => {
  return (
    <>
      <div className="place-content-center">
        <div className=" py-36 mx-5 grid grid-cols-2 text-center">
          <div className="text-center">
            <span style={{ color: "var(--orange)" }}>Ask</span>
            <span style={{ color: "var(--green)" }}>Your</span>
            <span style={{ color: "var(--blue)" }}>Dost</span>
            <span>
              {" "}
              is a platform which provides you the information of the products
              and services which are provided in your locality.
            </span>
            <br />
            <br />
            <p>
              Here you can find information about the services available in your
              locality and you can also list your business services in this
              platform by simply clicking the{" "}
              <span className="hover:brightness-150">
                <a href="/freeListing" style={{ color: "var(--blue)" }}>
                  FREELISTING
                </a>
              </span>{" "}
              button and filling the details of your business.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/intro-image.png"
              alt="intro image"
              className="w-56"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
