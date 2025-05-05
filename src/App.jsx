import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/common/Navbar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";


function App() {
  return <Router>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  </Router>;
}

export default App;
