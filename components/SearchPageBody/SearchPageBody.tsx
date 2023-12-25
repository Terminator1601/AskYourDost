import React from "react";
import FilterSection from "../FilterSection";

const SearchPageBody = () => {
  return (
    <div>
      <div className="grid grid-cols-3">
        <div>
          <FilterSection />
        </div>
        <div className="col-span-2">
          <h2>this is two divs </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur facilis ad repellendus aut reiciendis quibusdam. Fuga
            quaerat ut, asperiores nostrum, id tempore dolorum cum optio vero
            consectetur eligendi suscipit quas! Obcaecati deserunt aliquam illo
            amet, odit nam eligendi distinctio explicabo quis voluptates sit eos
            officiis facere quae aspernatur ex ducimus rem possimus quas
            voluptatem corporis laboriosam eum magnam illum! Illum labore
            distinctio sit harum facilis, dolores illo praesentium deserunt vero
            hic fugiat at ipsa a officiis nesciunt nobis, non dignissimos eius.
            Fugit mollitia ut saepe nulla ipsum blanditiis facere fugiat! Maxime
            similique odio, accusantium laborum aliquid consequuntur vero
            impedit totam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchPageBody;
