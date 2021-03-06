import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";

import store from './redux/store/store'
import { Provider } from 'react-redux'
import Login from "./pages/login/Login";

const App = () => {
  return (
      <Provider store={store}>
          <Router>
              <Routes>
                  <Route path='/' element={<Home />} />

                  <Route path='hotels/'>
                      <Route index element={<List />} />
                      <Route path=':id' element={<Hotel />} />
                  </Route>

                  <Route path='/login' element={<Login />} />
              </Routes>
          </Router>
      </Provider>
  );
}

export default App;
