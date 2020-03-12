import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { SimonGame } from './components'
import './scss/index.scss'
import { store } from './store'

render(<Provider store={store}><SimonGame /></Provider>, document.querySelector('simon-game'))
