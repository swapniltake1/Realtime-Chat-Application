import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Status from './components/Status/Status';
import StatusViewer from './components/Status/StatusViewer';
import SignIn from './components/Register/SignIn';
import SignUp from './components/Register/SignUp';

function App() {
  return (
    <div >
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/status' element={<Status />} />
        <Route path='/status/:userId' element={<StatusViewer />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />


      </Routes>
    </div>
  );
}

export default App;
