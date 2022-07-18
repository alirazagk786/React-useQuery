import { useState } from 'react';
import {useQuery} from 'react-query';
import Planet from './Planet';



const Planets = () => {
    const [page,setPage] = useState(1);
    const { data, status ,isPreviousData} = useQuery(['planets',page], () => fetchPlanets(page), 
    {keepPreviousData : true }
    //config property
    // {
    //     staleTime : 0,
    //     //cacheTime : 10,
    //     onSuccess : () => console.log('data fetched successfully'),
    //     onError : () => console.log('Error with fetching data!')
    // }
    )

    const fetchPlanets = async (key) => {
        console.log(page);
        const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
        return await res.json();
    }

    return ( 
        <div className='main'>
            <h2>Planets</h2>

            <button
             onClick={()=> setPage(old => Math.max( old-1, 1 ))}
             disabled={page===1}
             >{"<<"}</button>
            <span>{`Page : ${page}`}</span>
            <button
             onClick={() => (!isPreviousData && data?.next ) && 
             setPage(old => old + 1 )
             }
             disabled={!data?.next}
             >{">>"}</button>

           {status === 'error' && (
            <div>Error Fetching data.</div>
           )}

           {status === 'loading' && (
            <div>Loading data...</div>
           )}

           {status === 'success' && (
            
            data?.results?.map(planet => (
            <Planet key = {planet.name} planet={planet} />
            ))

           )}


        </div>
     );
}
 
export default Planets;