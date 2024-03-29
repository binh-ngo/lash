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
Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <Navbar />
    <Router>
      {/* <Account> */}
        <Routes>
        <Route path="/home" element={<Home />} />
        </Routes>
      {/* </Account> */}
    </Router>
    </div>
  );
}

export default App;
