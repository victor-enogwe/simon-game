import { ComponentProps } from 'global'
import React from 'react'
import { connect } from 'react-redux'
import { mapState, MODE, PLAY } from '../store'
import { Button } from './button'

const toggleMode = () => ({ type: MODE.TOGGLE_MODE })

const togglePlay = (state: boolean) => ({ type: state ? PLAY.END_GAME : PLAY.START_GAME })

const modeConnector = connect(mapState<'mode'>('mode'), { toggleMode })

const playConnector = connect(mapState<'play'>('play'), { togglePlay })

export const PlayButton = playConnector(PlayControl)

export const ModeButton = modeConnector(ModeControl)

function PlayControl(props: ComponentProps<typeof playConnector>) {
  const className = props.play ? 'stop' : 'start'
  return <div className="control button">
    <Button className={className} onClick={props.togglePlay.bind(null, props.play)} disabled={props.disabled} />
    <small>{className.toUpperCase()}</small>
  </div>
}

function ModeControl(props: ComponentProps<typeof modeConnector>) {
  const className = props.mode ? 'strict' : 'normal'
  return <div className="control button">
    <Button className={className} onClick={props.toggleMode} disabled={props.disabled} />
    <small>{className.toUpperCase()}</small>
  </div>
}
