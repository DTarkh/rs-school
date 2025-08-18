import { useState } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';
import UncontrolledForm from './components/UncontrolledForm';
import ReactHookForm from './components/ReactHookForm';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHookformOpen, setIsHookformOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen} setOpen={setIsOpen}>
        <UncontrolledForm setOpen={setIsOpen} />
      </Modal>
      <Modal open={isHookformOpen} setOpen={setIsHookformOpen}>
        <ReactHookForm setOpen={setIsHookformOpen} />
      </Modal>
      <main className="bg-gray-800 w-full h-screen flex flex-col items-center">
        <div className="flex gap-7 mt-20">
          <Button onClick={() => setIsOpen(true)}>Uncontrolled Form</Button>
          <Button onClick={() => setIsHookformOpen(true)}>
            React hook Form
          </Button>
        </div>
      </main>
    </>
  );
}

export default App;
