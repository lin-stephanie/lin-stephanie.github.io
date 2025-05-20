import styled, { css } from 'styled-components'

import { colors } from '@/configs'

const gradientStyles = css`
  position: relative;

  color: transparent;
  white-space: nowrap;

  &::before {
    content: attr(data-text);

    position: absolute;
    top: 0.5%;
    left: 0.2%;

    color: black;
    white-space: nowrap;

    text-shadow: 0.1px 0.1px 1px black;
  }

  &::after {
    content: attr(data-text);

    position: absolute;
    top: 0%;
    left: 0%;

    background: linear-gradient(
      120deg,
      ${colors.orange[300]} 0%,
      ${colors.orange[200]} 50%,
      ${colors.orange[100]} 100%
    );
    /* background: linear-gradient(120deg, #fdba74 0%, #ffedd5 70%, #fff7ed 100%); */
    /* background: linear-gradient(120deg, #fb923c 0%, #fed7aa 50%, #fff7ed 100%); */
    background-clip: text;
    -webkit-background-clip: text;

    color: transparent;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
  }
`

const StyledP = styled.p`
  ${gradientStyles}

  font-size: 0.8rem;
  line-height: 60px;
  letter-spacing: 0.1px;

  @media (min-width: 460px) {
    font-size: 0.8rem;
    line-height: 90px;
    letter-spacing: 2px;
  }

  @media (min-width: 576px) {
    font-size: 1rem;
    line-height: 90px;
    letter-spacing: 2px;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
    line-height: 90px;
    letter-spacing: 2px;
  }

  @media (min-width: 1024px) {
    font-size: 1.3rem;
    line-height: 90px;
    letter-spacing: 2px;
  }

  @media (min-width: 1280px) {
    font-size: 1.5rem;
    line-height: 90px;
    letter-spacing: 2px;
  }

  @media (min-width: 1536px) {
    font-size: 1.8rem;
    line-height: 90px;
    letter-spacing: 2px;
  }
`

const Tags = () => {
  const text = 'A FRONT-END DEVELOPER MAKING IDEAS CLICK'
  return <StyledP data-text={text}>{text}</StyledP>
}

export default Tags
