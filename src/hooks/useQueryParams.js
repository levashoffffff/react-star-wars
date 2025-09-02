import { useLocation } from "react-router";

export const useQueryParams = () => {
    //Данная конструкция вернет объект
    return new URLSearchParams(useLocation().search);
}
