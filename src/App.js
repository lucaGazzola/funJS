import './App.css';
import background from './images/background/dark-forest.png';
import Menu from './components/Menu';

function App() {
  const appStyle = {
    position: 'relative',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };

  return (
    <div className="App" style={appStyle}>
      <Menu />
    </div>
  );
}

export default App;
