import { useCallback, useState } from 'react'

const useFetch = () => {

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


        const getData = useCallback(async (category = null, amount, difficulty, applyData) => {
            setIsLoading(true);
            try{
                const response = await fetch(category
                    ? `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple` 
                    : `https://opentdb.com/api_category.php`);

                if(!response.ok){
                    throw new Error('request failed');
                }
    
                const data = await response.json();

                category ? applyData(data.results) : applyData(data.trivia_categories);
            }
            catch (err) {
                setIsError(true);
            }
            setIsLoading(false);
        }, []);
        
    return {
        isLoading,
        getData,
        isError
    };
};

export default useFetch;