import FormSearch from "./FormSearch";
import Result from "./Result";
import axios from "axios";
import {
  createResultMajorLimitCost,
  createResultLimitCost,
  createResultMajorAnyCost,
} from "../funtion";
const apikey = "YOUR_API_KEY";
const Select = () => {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(false);
  const [search, setSearch] = useState({ zipcode: "", major: "", cost: 50000 });
  const [listMajor, setListMajor] = useState([]);

  useEffect(() => {
    async function getList() {
      axios
        .get(
          `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&api_key=${apikey}`
        )
        .then((response) => {
          const results = [];
          for (let key in response.data.results[0]) {
            if (key.indexOf("2018.academics.program_percentage.") !== -1) {
              results.push(key.slice(34));
            }
          }
          setListMajor(results);
        });
    }
    getList();
  }, []);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStart(true);
    searchUniversities(search.zipcode, search.major, search.cost);
  };
  const searchUniversities = async (zipcode, major, cost) => {
    if ((zipcode === "") & (major === "") & (cost < 100000)) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&api_key=${apikey}`
      )
        .then((response) => {
          setData(createResultLimitCost(response, cost));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((zipcode !== "") & (major === "") & (cost < 100000)) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&zip=${zipcode}&distance=10mi&api_key=${apikey}`
      )
        .then((response) => {
          setData(createResultLimitCost(response, cost));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((zipcode === "") & (major !== "") & (cost < 100000)) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&api_key=${apikey}`
      )
        .then((response) => {
          setData(createResultMajorLimitCost(response, major, cost));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((zipcode !== "") & (major !== "") & (cost < 100000)) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&zip=${zipcode}&distance=10mi&api_key=${apikey}`
      )
        .then((response) => {
          setData(createResultMajorLimitCost(response, major, cost));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((zipcode === "") & (major === "") & (cost === "100000")) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&api_key=${apikey}`
      )
        .then((response) => {
          setData(response.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((zipcode !== "") & (major === "") & (cost === "100000")) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&zip=${zipcode}&distance=10mi&api_key=${apikey}`
      )
        .then((response) => {
          setData(response.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((zipcode === "") & (major !== "") & (cost === "100000")) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&api_key=${apikey}`
      )
        .then((response) => {
          setData(createResultMajorAnyCost(response, major));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if ((zipcode !== "") & (major !== "") & (cost === "100000")) {
      await axios(
        `https://api.data.gov/ed/collegescorecard/v1/schools.json?fields=id,school.name,school.state,location.lat,location.lon,2018.cost.tuition,2018.academics.program_percentage&zip=${zipcode}&distance=10mi&api_key=${apikey}`
      )
        .then((response) => {
          setData(createResultMajorAnyCost(response, major));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="select">
      <FormSearch
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        listMajor={listMajor}
      />

      {start && <Result data={data} />}
    </section>
  );
};
export default Select;
