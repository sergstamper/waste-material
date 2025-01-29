import { useState } from 'react'
import './App.css'

import Options from './components/Options/Options';
import Input from './components/Input/Input';
import Display from './components/Display/Display';
import Variation from './components/Variation/Variation';
import Recommendation from './components/Recommendation/Recommendation';

function App() {
  return (
    <>
      <Options />
      <Input />
      <Input />
      <Display />
      <Variation />
      <Recommendation />
    </>
  )
}

export default App
