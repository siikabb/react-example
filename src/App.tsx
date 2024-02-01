import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Upload from './views/Upload';

const App = () => {
  return (
    <>
      <h1>My art app</h1>
      {/* TODO: implement router for switching between views */}
      <Home />
      <Profile />
      <Single />
      <Upload />
    </>
  );
};

export default App;
