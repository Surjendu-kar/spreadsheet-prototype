import Header from './components/Header';
import SpreadsheetTable from './components/Spreadsheet';
import Tabs from './components/Tabs';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Toolbar />
      <SpreadsheetTable />
      <Tabs />
    </div>
  );
}

export default App;
