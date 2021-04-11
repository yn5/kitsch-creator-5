import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  width: 100vw;
`;

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const Header = styled.div`
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const OutputImage = styled.img`
  display: flex;
  flex: 1 1 auto;
  background: url('/assets/images/checkered-transparency-background.svg');
  background-image: linear-gradient(45deg, #bbbbbb 25%, transparent 25%),
    linear-gradient(-45deg, #bbbbbb 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #bbbbbb 75%),
    linear-gradient(-45deg, transparent 75%, #bbbbbb 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  object-fit: contain;
  overflow: auto;
`;

export const Title = styled.h1`
  margin: 1rem 0;
`;

export const TextButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  border-bottom: 1px solid black;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
