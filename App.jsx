import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} />
    </Routes>
  );
}

export default App;