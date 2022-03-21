import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/index.css';

import Header from './components/header';
import SurveyView from './containers/surveyview';
import VotingView from './containers/votingview';
import LoginView from './containers/loginview';
import { AuthProvider, RequireAuth } from './authprovider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              <Route path='/login' element={<LoginView />} />
              <Route path='/votar/:id' element={
                <RequireAuth>
                  <VotingView />
                </RequireAuth>} />
              <Route path='/' element={<SurveyView />} />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
