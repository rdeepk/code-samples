import * as React from 'react'

interface ILinkProps {
  onClick: () => void
  text: string
}

const Link: React.SFC<ILinkProps> = (props: ILinkProps) => (
  <a onClick={props.onClick} style={{cursor: 'pointer'}}>{props.text}</a>
)

export default Link