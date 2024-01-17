import React from "react";
import "tailwindcss/tailwind.css";

const Dashboard = () => {
  return (
    <>
      <div>Welcome!!</div>
      <div className="grid lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-3">
        <div>
          <h1>hello</h1>
        </div>
        <div className="col-span-5">
          <h1>tmkc</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A animi
            consequuntur omnis dignissimos quas voluptas hic similique assumenda
            architecto! Eius laborum accusamus quisquam. Quod id ad quibusdam
            voluptatem rem odit voluptatibus quas velit nemo ab, est reiciendis.
            Ad tempore distinctio nihil consectetur, optio debitis commodi
            deleniti consequuntur nemo earum recusandae et similique? Saepe
            odit, voluptatum error non praesentium, deleniti vero natus
            assumenda corporis nihil veniam, iure quas reprehenderit sapiente?
            Ut sunt, placeat ipsam animi optio est perferendis quasi voluptates
            laborum perspiciatis iusto excepturi quos quis nobis minima pariatur
            quidem laboriosam facere amet. Perspiciatis deserunt illum nulla
            ullam expedita numquam aut?
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
