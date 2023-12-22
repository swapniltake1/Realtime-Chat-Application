import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Status from './components/Status/Status';
import StatusViewer from './components/Status/StatusViewer';

function App() {
  return (
    <div >
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/status' element={<Status />} />
        <Route path='/status/:userId' element={<StatusViewer />} />


      </Routes>
    </div>
  );
}

export default App;
