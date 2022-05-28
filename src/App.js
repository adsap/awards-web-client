import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Welcome from './pages/Welcome';
import Feed from './pages/Feed';
import store from './store'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Welcome/>} />
            <Route exact path='/feed' element={<Feed/>} />
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  );
}

export default App;