import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { CarList } from './components/CarList';
import AddCar from './components/AddCar';

function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Carshop
          </Typography>
        </Toolbar>
      </AppBar>
      <CarList />   
    </div>
  );
}

export default App;
