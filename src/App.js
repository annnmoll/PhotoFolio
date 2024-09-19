import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import AlbumList from "./components/AlbumList/AlbumList";
import Spinner from "react-spinner-material";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <Navbar />

      <div className="folio-container">
        <AlbumList loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
}

export default App;
