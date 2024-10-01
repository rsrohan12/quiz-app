import React, { useContext} from 'react';
import './App.css';

import QuizForm from './components/form/QuizForm';
import Rules from './components/rules/Rules';
import IsClickedContext from './context/use-context';

function App() {

  const ctx = useContext(IsClickedContext);

  return (
   <>
      {!ctx.changeContent && <div className="startup">
        <Rules />
      </div>}
      {ctx.changeContent && <div className="App">
        <QuizForm />
      </div>}
    </>
  );
}

export default App;
