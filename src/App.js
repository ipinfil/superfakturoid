import { Pane } from 'evergreen-ui';
import InvoiceForm from './InvoiceForm';

function App() {
  return (
    <Pane display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" backgroundColor="#1F3D99">
      <InvoiceForm />
    </Pane>
  );
}

export default App;
