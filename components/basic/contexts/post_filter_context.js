import { createContext } from "react";

const postFilterContext = createContext({
    filterBy: "",
    changeFilterBy: () => {},
});


export default postFilterContext;