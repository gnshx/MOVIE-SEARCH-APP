import React from "react";

function Search({ sea, setsea }) {

  return (
    <>
    <div className="search">
        <div>
        <img src="./search.svg" alt="search logo" />
 <input type="text" value={sea} placeholder="search your movie" onChange={ (e) => setsea(e.target.value) } />
    
     </div>
     </div>
    </>
  );
}

export default Search;
