import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

export const useGetData = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const makeRequest = useCallback(async () => {
    const result = await axios.get(url);
    return result.data;
  }, [url]);

  useEffect(() => {
    setIsLoading(true);
    makeRequest()
      .then(result => {
        setIsLoading(false);
        setData(result);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [makeRequest, setData]);

  return {
    isLoading,
    data,
  };
};
