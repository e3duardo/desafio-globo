import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.scss";

import Header from "./components/header";
import HomeView from "./containers/home_view";
import SurveyView from "./containers/survey_view";
import LoginView from "./containers/login_view";
import BackstageView from "./containers/backstage_view";
import { AuthProvider, RequireAuth } from "./authprovider";
import Footer from "./components/footer";
import RegisterView from "./containers/register_view";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/cadastro" element={<RegisterView />} />
              <Route
                path="/votacao/:id"
                element={
                  <RequireAuth>
                    <SurveyView />
                  </RequireAuth>
                }
              />

              <Route
                path="/producao/dashboard"
                element={
                  <RequireAuth backstage>
                    <BackstageView />
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
