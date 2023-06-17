import { useEffect, useState } from 'react';
import { message } from 'antd';

const useFetch = (url, setStateFunc) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setStateFunc(data)
                setLoading(false);
            } catch (error) {
                message.error(`Fetch error: ${error.message}`);
                setLoading(false);
            }
        };
        fetchData();
    }, [url, setStateFunc]);

    return { loading };
};

export default useFetch;
