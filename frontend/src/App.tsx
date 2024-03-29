import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
// import { Account } from "./Accounts"
import { Amplify } from "aws-amplify"
import { awsconfig } from "./aws-exports";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Staff } from "./pages/Staff";
Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        {/* <Account> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>
        {/* </Account> */}
      </Router>
      <Footer />
    </div>
  );
}

export default App;
