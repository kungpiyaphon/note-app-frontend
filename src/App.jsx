import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/common/Navbar";


function App() {
  return <Router>
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  </Router>;
}

export default App;
