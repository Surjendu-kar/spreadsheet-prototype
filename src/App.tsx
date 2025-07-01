import Header from './components/Header';
import Tabs from './components/Tabs';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Toolbar/>
      <Tabs/>
    </div>
  );
}

export default App;
