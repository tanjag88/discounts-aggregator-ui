import { useEffect, useState, useRef } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [noOfProducts, setNoOfProducts] = useState(null);

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        setNoOfProducts(response.headers.get("x-total-count")); 
        const linkHeader = response.headers.get("Link");
        
        
        if (linkHeader) {
        
         setTotalPages(parseInt(linkHeader
            .split(",")
            .filter(function (item) {
              return item.includes("last");
            })[0]
            .match(/page=([0-9]+)/)[1]));

          
        }else {setTotalPages(1); }
       
        
        if (response.ok) {
          
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();
    return () => {
      isMounted.current = false;
    };
  }, [url]);
  return { data, error, loading, totalPages, noOfProducts};
  
}



