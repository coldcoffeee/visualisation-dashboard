import { createContext } from "react";

const AppContext = createContext({
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  articles: [],
  countries: [],
  pestles: [],
  sectors: [],
  sources: [],
  topics: [],
  loaded: false,
});

export default AppContext;
