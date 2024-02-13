import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
// import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Choose from "./pages/Choose";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<RegistrationForm />} />
      </Routes> */}
      <Homepage />
      <RegistrationForm />
      <Choose />
      <LoginForm />
    </>
  );
}

export default App;
