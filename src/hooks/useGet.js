import { useState, useEffect } from 'react';
import { httpClient } from '../services/http.service';
import { toast } from 'react-toastify';

const useGet = ({
  path,
  dataPath = 'data',
  showSuccesToast = false,
  successToastText,
  showFailureToast = true,
  failureToastText = 'Ocurrio un error al cargar la informacion',
  log = false,
  afterFetch,
  manual = false,
  method = 'get',
  payload,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [path]);

  const fetchData = async newPath => {
    setLoading(true);
    try {
      const res = await httpClient[method](newPath ? newPath : path, payload);
      setData(res[dataPath]);
      if (log) {
        console.log('useGet', path, res[dataPath]);
      }
      setLoading(false);
      if (afterFetch) {
        afterFetch(res[dataPath]);
      }

      return res[dataPath];
    } catch (error) {
      // toast(failureToastText, { type: 'error' });
      setLoading(false);
    }
  };

  return {
    data,
    fetchData,
    loading,
  };
};

export default useGet;
