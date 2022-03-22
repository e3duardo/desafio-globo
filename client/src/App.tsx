import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/index.css";

import Header from "./components/header";
import HomeView from "./containers/home_view";
import SurveyView from "./containers/survey_view";
import LoginView from "./containers/login_view";
import { AuthProvider, RequireAuth } from "./authprovider";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route
                path="/votacao/:id"
                element={
                  <RequireAuth>
                    <SurveyView />
                  </RequireAuth>
                }
              />
              <Route path="/" element={<HomeView />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
