// @flow
import * as React from 'react';

type child = {
  children: React.Node
}

const App = ({children}: child) => {
  return (
    <div>
      {children}
    </div>
  )
};

export default App;