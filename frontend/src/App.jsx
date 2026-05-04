import ChatPage from './pages/ChatPage';
import FaultyTerminal from './assets/FaultyTerminal';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GroupMemberPage from "./pages/GroupMemberPage";
import { Routes, Route } from 'react-router';
function App() {

  return (

    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <FaultyTerminal
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        scale={2.1}
        gridMul={[2, 1]}
        digitSize={1.6}
        timeScale={0.4}
        pause={false}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={0.9}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#ec6eff"
        mouseReact
        mouseStrength={0.5}
        pageLoadAnimation
        brightness={0.3}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/group-members" element={<GroupMemberPage />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;