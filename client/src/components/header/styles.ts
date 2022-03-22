import styled, { css } from "styled-components";

import bbb22 from "../../assets/bg-bbb22.png";

// big brothers

export const HeaderBar = styled.div`
  height: 74px;
  line-height: 74px;
  background-color: #5001b3;
  display: flex;
  align-items: center;

  .container{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    margin: 0;
    color: #fff;
    font-family: "Lato", sans-serif;
    font-weight: 100;
  }

  svg {
    width: 99px;
    height: 31px;
  }
  .dummy {
    width: 99px;
  }
`;

// brothers

export const Container = styled.header`
  background: url(${bbb22}) no-repeat center center;
  background-size: 694px 140px;
  transition-delay: 0;
  transition-duration: 300ms;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
  margin-bottom: 20px;;
`;
export const Brothers = styled.div`
  display: flex;
  justify-content: center;
`;

interface BrotherProps {
  out: boolean;
}

export const Brother = styled.div<BrotherProps>`
  height: 8.75em;
  position: relative;
  width: 2.84091em;

  ${(props) =>
    props.out &&
    css`
      -webkit-filter: grayscale(1);
      -webkit-filter: grayscale(100%);
      filter: grayscale(100%) !important;
      filter: url("data:image/svg+xml;utf8,<svgversion='1.1'xmlns='http://www.w3.org/2000/svg'><filterid='grayscale'><feColorMatrixtype='matrix'values='0.33330.33330.3333000.33330.33330.3333000.33330.33330.33330000010'/></filter></svg>#grayscale");
      filter: gray;
    `}

  img {
    bottom: -0.3125em;
    height: 4.33125em;
    left: 50%;
    margin-left: -2.64688em;
    max-width: none;
    position: absolute;
    transition-duration: 300ms;
    transition-property: width, height, margin-left;
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
    width: 5.29375em;

    &:hover {
      height: 5.625em;
      margin-left: -3.4375em;
      width: 6.875em;
    }
  }
`;
