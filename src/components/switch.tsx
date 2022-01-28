import React, { ComponentType, createRef, PropsWithoutRef } from 'react'
import { connect } from 'react-redux'
import { SwitchComponentProps } from '../@types/global'
import { mapState, POWER } from '../store'

const togglePower = (state: POWER.ON | POWER.OFF) => ({ type: Boolean(state) ? POWER.POWER_OFF : POWER.POWER_ON })

const connector = connect(mapState<'power'>('power'), { togglePower })

export const Switch: ComponentType<{ disabled: boolean }> = connector(SwitchComponent as any)

function SwitchComponent (props: PropsWithoutRef<SwitchComponentProps>) {
  const inputRef = createRef<HTMLInputElement>()

  return <div className="switch">
    <small>OFF</small>
    <div className="toggle" onClick={() => inputRef?.current?.click()} onKeyDown={() => inputRef?.current?.click()} role="button">
      <input
        ref={inputRef}
        hidden={true}
        id="on"
        name="on"
        checked={Boolean(props.power)}
        type="checkbox"
        onChange={props.togglePower.bind(null, props.power)}
      />
      <div className="slider" />
    </div>
    <small>ON</small>
  </div>
}
