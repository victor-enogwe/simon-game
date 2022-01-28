import { ComponentProps } from 'global'
import React from 'react'
import { connect } from 'react-redux'
import { mapState } from '../store'

const connector = connect(mapState('pattern'))

export const Display = connector(function (props: ComponentProps<typeof connector>) {
  return <div className="control display">
    <div className="screen">
      <span>{props.pattern && props.pattern.pattern ? props.pattern.pattern.length : '--'}</span>
    </div>
    <small>LEVEL</small>
  </div>
})
