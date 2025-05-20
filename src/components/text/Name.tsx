import styled, { css } from 'styled-components'

import { colors } from '@/configs'

const gradientStyles = css`
  position: relative;

  color: transparent;
  white-space: nowrap;

  &::before {
    content: attr(data-text);

    position: absolute;
    top: 2.5%;
    left: 0.5%;

    color: black;
    white-space: nowrap;
    text-shadow:
      1px 1px 3px ${colors.red[350]},
      1px 1px 3px
        ${({ theme }) => (theme.isLight ? colors.red[100] : colors.red[950])};
  }

  &::after {
    content: attr(data-text);

    position: absolute;
    top: 0%;
    left: 0%;

    background: linear-gradient(
      120deg,
      ${colors.red[900]} 0%,
      ${colors.red[400]} 50%,
      ${colors.red[100]} 100%
    );
    background-clip: text;
    -webkit-background-clip: text;

    color: transparent;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
  }
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    align-items: flex-end;
    gap: 1.5rem;
  }
`

const StyledP = styled.p`
  ${gradientStyles}

  font-size: 2.2rem;
  letter-spacing: 1.5px;

  @media (min-width: 460px) {
    font-size: 2.5rem;
  }

  /* 510 */
  @media (min-width: 576px) {
    font-size: 3rem;
  }

  /* 670 */
  @media (min-width: 768px) {
    margin-right: 2.8rem;
    font-size: 3rem;
  }

  /* 900 */
  @media (min-width: 1024px) {
    margin-right: 3.6rem;
    font-size: 3.4rem;
  }

  /* 1150 */
  @media (min-width: 1280px) {
    margin-right: 4.5rem;
    font-size: 4rem;
  }

  /* 1440 */
  @media (min-width: 1536px) {
    margin-right: 4.5rem;
    font-size: 4.6rem;
  }

  /* 1920 */
`

const StyledH1 = styled.h1`
  ${gradientStyles}

  margin: 0;

  font-size: 2.2rem;
  letter-spacing: 0.4rem;

  @media (min-width: 460px) {
    font-size: 3rem;
  }

  @media (min-width: 576px) {
    font-size: 4rem;
  }

  @media (min-width: 768px) {
    font-size: 5rem;
  }

  @media (min-width: 1024px) {
    font-size: 6rem;
  }

  @media (min-width: 1280px) {
    font-size: 7rem;
  }

  @media (min-width: 1536px) {
    font-size: 8.5rem;
  }
`

const Name = () => (
  <StyledDiv>
    <StyledP data-text="HEY THERE, I'M">HEY THERE, I&apos;M</StyledP>
    {/* <StyledP data-text="HEY THERE, I'M">{`HEY THERE, I'M`}</StyledP> */}
    <StyledH1 data-text="STEPHANIE LIN">STEPHANIE LIN</StyledH1>
  </StyledDiv>
)

export default Name
