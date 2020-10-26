import React from "react";

const FormSearch = ({ search, handleChange, handleSubmit, listMajor }) => {
  return (
    <form>
      <div>
        <label>Zip code</label>
        <input
          name="zipcode"
          value={search.zipcode}
          onChange={handleChange}
          type="text"
          placeholder="zipcode"
        />
      </div>
      <div>
        <label>Major</label>
        <select name="major" onChange={handleChange} value={search.major}>
          <option value="">---select major---</option>
          {listMajor.map((major, index) => (
            <option key={index} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Cost</label>
        <input
          name="cost"
          value={search.cost}
          onChange={handleChange}
          type="range"
          min={0}
          max={100000}
        />
        <div className="box">
          {search.cost === "100000" && "any"}
          {search.cost === "0" && "$0"}
          {search.cost > 0 &&
            search.cost < 100000 &&
            "less than" +
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(search.cost)}
        </div>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );
};

export default FormSearch;
