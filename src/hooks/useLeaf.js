import { useState } from 'react';
import { useEffect } from 'react';
import useFetch from 'use-http';

const useLeaf = companyId => {
  const [company, setCompany] = useState(companyId);
  const [leafs, setLeafs] = useState([]);
  const [request, response] = useFetch(`/leaf?filter=company||$eq||${company}`);

  const loadLeafs = async () => {
    await request.get();
    if (response.ok) {
      setLeafs(await response.json());
      // console.log('useLeaf', leafs);
    } else {
      onError();
    }
  };

  const onError = err => {
    console.log(err);
  };

  useEffect(() => {
    if (company) {
      loadLeafs();
    }
  }, [company]);

  return {
    onError,
    setCompany,
    leafs,
    loadLeafs,
  };
};

export default useLeaf;
