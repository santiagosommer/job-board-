import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData(null);
        setError(null);

        const source = axios.CancelToken.source();
        axios.get(url, { cancelToken: source.token })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setError('An error ocurred...');
                }
            })
        return () => {
            source.cancel();
        }

    }, [url]);

    return { data, error }
}

export default useFetch