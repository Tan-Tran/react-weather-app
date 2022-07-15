import { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api/fetchCity";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  useEffect(() => {
    handleOnChange({
      label: "Ho Chi Minh City VN",
      value: "10.82302 106.62965",
    });
  }, []);

  console.log(search);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  return (
    <AsyncPaginate
      placeholder="Search for city ..."
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
