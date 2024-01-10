import { useEffect, useState } from "react";

const useFetchGet = (url) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setInterval(async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Getting request failed');
                }
                const newData = await response.json();
                if (isMounted) {
                    setData(newData);
                }
            }
            catch (error) {
                console.log(error);
            }
        }, 3000)
        return () => {
            isMounted = false
        }
    }, [url])

    return [data];
}

export default useFetchGet;