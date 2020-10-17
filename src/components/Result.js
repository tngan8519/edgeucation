import React from "react";

const Result = ({ data }) => {
  return (
    <section className="result">
      <h4>Results:</h4>
      <ol>
        {data.map((x, index) => (
          <li key={index}>
            <div> {x["school.name"]}</div>
            <div>State: {x["school.state"]}</div>
            <div>
              Tuition-in-state:
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(x["2018.cost.tuition.in_state"])}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Result;
