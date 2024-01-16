import { useEffect, useState } from "react";

function Album() {
  const [album, setAlbum] = useState([]);
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

  return (
    <>
      <ol>
        {album.map((item, index) => {
          return (
            <div key={index} style={{ color: "blue" }}>
              <li>
                {item.title}
                <button>Update</button>
                <button>delete</button>
              </li>
            </div>
          );
        })}
      </ol>
      <div>
        <h2>Add A new Album</h2>
      </div>
    </>
  );
}

export default Album;
