import { ButtonName, ComponentProps, InitialState } from 'global'
import React from 'react'
import { connect } from 'react-redux'
import { PLAYER_PATTERN } from '../store'
import { clickButton } from '../utils/ai'
import { Button } from './button'
import { Menu } from './menu'

export const buttonNames: ButtonName[] = ['one', 'two', 'three', 'four']

const recordPlayerPattern = (payload: ButtonName) => ({ type: PLAYER_PATTERN.RECORD_PLAYER_PATTERN, payload })

const connector = connect((state: InitialState) => ({ ...state }), { recordPlayerPattern })

export const SimonGame = connector(function (prop: ComponentProps<typeof connector>) {
  return <div>
    <div id="boards">
      {buttonNames.map((...props) => <Button
        disabled={prop.turn}
        id={props[0]}
        className='board'
        key={props[1]}
        onClick={() => {
          if (prop.playerPattern.length >= (prop.pattern?.pattern?.length ?? 1)) return
          clickButton(props[0], 0, prop.pattern?.pattern?.length ?? 0)
          prop.recordPlayerPattern(props[0])
        }}
      />)}
      {<Menu />}
    </div>
    <div className="credits">
      This Game Tests Your Brain Memory Power<br />
      Find out how many times you can remember the patterns correctly.<br />
      &copy; {(new Date()).getFullYear()} <a href="http://victor.enogwe.me">iykyvic</a>
    </div>
  </div>
})
