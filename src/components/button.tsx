import React, { DetailedHTMLProps } from 'react'

export function Button(props: DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return <button {...props} />
}
