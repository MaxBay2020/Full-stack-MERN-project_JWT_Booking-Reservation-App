import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='hotels'>
              <Route index element={<List />} />
              <Route path=':id' element={<Hotel />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
