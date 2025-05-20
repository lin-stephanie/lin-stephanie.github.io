import styled from 'styled-components'

import { colors } from '@/configs'

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  color: ${colors.red[200]};
  text-decoration: none;
  transition: color 0.1s ease-in-out;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    color: #fff;
  }
`

const Link = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <StyledLink href={href} target="_blank" rel="noopener noreferrer">
    {children}
    {/* <span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        color="currentColor"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </span> */}
  </StyledLink>
)

export default Link
