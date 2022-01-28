import React, { ComponentType, PropsWithoutRef } from 'react'
import { connect } from 'react-redux'
import { mapState, MODE, PLAY } from '../store'
import { Button } from './button'

const toggleMode = () => ({ type: MODE.TOGGLE_MODE })

const togglePlay = (state: boolean) => ({ type: state ? PLAY.END_GAME : PLAY.START_GAME })

const modeConnector = connect(mapState<'mode'>('mode'), { toggleMode })

const playConnector = connect(mapState<'play'>('play'), { togglePlay })

export const PlayButton: ComponentType<{ disabled: boolean }> = playConnector(PlayControl as any)

export const ModeButton: ComponentType<{ disabled: boolean }> = modeConnector(ModeControl as any)

function PlayControl(props: PropsWithoutRef<{ play: boolean; disabled: boolean; togglePlay: (state: boolean) => { type: PLAY } }>) {
  const className = props.play ? 'stop' : 'start'
  return <div className="control button">
    <Button className={className} onClick={props.togglePlay.bind(null, props.play)} disabled={props.disabled} />
    <small>{className.toUpperCase()}</small>
  </div>
}

function ModeControl(props: PropsWithoutRef<{ mode: boolean; disabled: boolean; toggleMode: (state: boolean) => { type: MODE } }>) {
  const className = props.mode ? 'strict' : 'normal'
  return <div className="control button">
    <Button className={className} onClick={props.toggleMode.bind(null, props.mode)} disabled={props.disabled} />
    <small>{className.toUpperCase()}</small>
  </div>
}
