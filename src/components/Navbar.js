const Navbar = ({setPage}) => {
    return ( 
        <nav>
           <h1>Star Wars Info</h1>
            <button onClick={()=> setPage('Planet')}>Planet</button>
            <button onClick={()=> setPage('People')}>People</button>
        </nav>
     );
}
 
export default Navbar;