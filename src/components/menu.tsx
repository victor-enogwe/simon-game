import { InitialState, ComponentProps } from 'global'
import React from 'react'
import { connect } from 'react-redux'
import { ModeButton, PlayButton } from './control'
import { Display } from './display'
import { Switch } from './switch'

const connector = connect((state: InitialState) => ({ power: state.power, play: state.play }))


export const Menu = connector(function (props: ComponentProps<typeof connector>) {
  return <div className="menu">
    <h1>Simon <sup>TM</sup></h1>
    <div className="panel">
      <Display />
      <PlayButton disabled={!Boolean(props.power)} />
      <ModeButton disabled={props.play} />
      <Switch disabled={!Boolean(props.power)} />
    </div>
  </div>
})
