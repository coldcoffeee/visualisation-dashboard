import { useCallback, useEffect, useState } from "react";
import AppContext from "./app-context.js";
import axios from "axios";

const fetchData = async () => {
  try {
    const { data: articles } = await axios.get(
      "http://localhost:4000/articles"
    );
    const { data: countries } = await axios.get(
      "http://localhost:4000/countries"
    );
    const { data: pestles } = await axios.get("http://localhost:4000/pestles");
    const { data: sectors } = await axios.get("http://localhost:4000/sectors");
    const { data: sources } = await axios.get("http://localhost:4000/sources");
    const { data: topics } = await axios.get("http://localhost:4000/topics");

    return Promise.resolve({
      articles,
      countries: countries.sort((a, b) => (a.name < b.name ? -1 : 1)),
      pestles,
      sectors,
      sources,
      topics,
      loaded: true,
    });
  } catch (err) {
    throw err;
  }
};
const AppContextProvider = (props) => {
  const [data, setData] = useState({
    articles: [],
    countries: [],
    pestles: [],
    sectors: [],
    sources: [],
    topics: [],
  });

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const changeDimensionsHandler = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  window.onresize = changeDimensionsHandler;
  useEffect(() => {
    const beginFetch = async () => {
      const resData = await fetchData();
      setData(resData);
    };
    beginFetch();
  }, []);

  return (
    <AppContext.Provider
      value={{
        dimensions,
        ...data,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
