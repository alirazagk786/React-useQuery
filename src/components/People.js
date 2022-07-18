import { useState } from 'react';
import {useQuery} from 'react-query';
import Person from './Person';

const fetchPeople = async (param) => {
    const page=param.queryKey[1];
    const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    return res.json();
}

const People = () => {
    const [page,setPage] = useState(1);
    const { data, status , isPreviousData } = useQuery(['people',page],fetchPeople,{keepPreviousData : true})

    return ( 
        <div className='main'>

         <h2>People</h2>
         <button
         onClick={()=> setPage(old => Math.max( old-1, 1 ))}
         disabled={page ===1 }
         >
            {"<<"}
         </button>
            <span>{`Page : ${page}`}</span>
         <button
         onClick={() => (!isPreviousData && data?.next ) && 
         setPage(old => old + 1 )
         }
         disabled={!data?.next}
         >
            {">>"}</button>


           {status === 'error' && (
            <div>Error Fetching data.</div>
           )}

           {status === 'loading' && (
            <div>Loading data...</div>
           )}

           {status === 'success' && (
            
            data?.results?.map(person => (
            <Person key = {person.name} person={person} />
            ))

           )}


        </div>
     );
}
 
export default People;