import { useEffect, useState } from "react";

function Album() {
  const [album, setAlbum] = useState([]);
  const [newalbum,setnewAlbum]=useState("");
  console.log(album)
  useEffect(() => {
    //fetching the data
    async function fetchdata() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        if (!response.ok) {
          throw new Error("Not Abel to fetch the Data");
        }
        const result = await response.json();

        setAlbum(result);
      } catch (error) {}
    }

    fetchdata();
  }, []);

  const addAlbum=async ()=>{
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId:album.id+1,
          title:newalbum}),
        });

        if(!response.ok){
            throw new Error('not abel to get the data');
        }

        const a=await response.json();
        setAlbum([...album,a]);
        setnewAlbum("");

    } catch (error) {
        console.log("error",error);
    }
  }


  const updateAlbum=async (albumId)=>{
    try {
      const response=await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`,{
        method:'PUT',
        headers:
          {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({title:"Title Updated!!"}),

      })

      if(!response.ok){
        throw new Error('not abel to fetch the data from given id');

      }
      const result=await response.json();
      const update = album.map((album) =>
      album.id === albumId ? result : album
    );

    setAlbum(update);

      

      
    } catch (error) {
      
    }
  }
  const deleteAlbum = async (albumId) => {
     try {
        const response=await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`,{
            method:'DELETE',
        });
        if(!response.ok){
            throw new Error("cannot get the data with given id");

        }

        const updateAlbum=await album.filter((item)=> item.id!==albumId);
        setAlbum(updateAlbum);
        
     } catch (error) {
        
     }
  };

  return (
    <>
      <ol className="Album">
        <h1>ALBUMS</h1>
        {album.map((item, index) => {
          return (
            <div key={index} style={{ color: "white" }}>
              <li>
                {item.title}
                <button onClick={()=>updateAlbum(item.id)}>Update</button>
                <button
                  onClick={() => {
                    deleteAlbum(item.id);
                  }}
                >
                  delete
                </button>
              </li>
            </div>
          );
        })}
      </ol>
      <div>
        <h2>Add A new Album</h2>
        <input type="text" placeholder="Enter the Title" value={newalbum} onChange={(e)=>setnewAlbum(e.target.value)}/>
        <button onClick={addAlbum}>Add Album </button>
      </div>
    </>
  );
}

export default Album;
