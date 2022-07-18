import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import People from './components/People'
import Planets from './components/Planets'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();


function App() {
  const [ page , setPage]=useState('Planets');
  
  return (
    <>
    <div className="App">
     <Navbar setPage={setPage}/>
     <QueryClientProvider client={queryClient}>
     <div className="container">
      {page === 'People' ? <People/> : <Planets/> }
     </div>
     <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
    </div>
    </>
  );
}

export default App;
