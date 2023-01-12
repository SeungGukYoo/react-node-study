import { Route, Routes } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import Detail from './community/Detail';
import Edit from './community/Edit';
import List from './community/List';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='list' element={<List />} />
        <Route path='/create' element={<Create />} />
        <Route path='/detail/:num' element={<Detail />} />
        <Route path='/edit/:num' element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
