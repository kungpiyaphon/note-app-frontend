import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return <Router>
    <AuthProvider>
      
    </AuthProvider>
  </Router>;
}

export default App;
