import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Show from './containers/Show/Show';


const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shows/:id' element={<Show />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>}/>
      </Routes>
    </Layout>
  );
};

export default App;
