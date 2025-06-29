import { BrowserRouter } from 'react-router';
import { ConfigProvider, theme} from 'antd';
import AppRoutes from './routes/AppRoutes';
//import './App.css'
import './reset.css'

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          wireframe: false,
          colorPrimary: "#e9b943",
          colorInfo: "#e9b943"
        },
        algorithm: theme.darkAlgorithm
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
