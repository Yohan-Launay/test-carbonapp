import {useEffect, useState} from "react";


function App() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/movies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

  return (
    <>
      <h1>Bienvenue sur votre catalogue !</h1>
        <div className="d-flex">
        {data && data.map((movie) => (
            <div className="card p-2 m-2" key={movie.id}>
                <div>
                    <h3>{movie.title}</h3>
                    <img src={movie.img_path} alt=""/>
                </div>
            </div>
        ))}
        </div>
    </>
  )
}

export default App
