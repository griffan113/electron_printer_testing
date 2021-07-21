import { useCallback } from 'react';
import { Container } from './styles';

export const Home = () => {
  const handleFilePathChange = useCallback(() => {
    window.Main.printSilently();
  }, [])

  const handleOpenCamera = useCallback(() => {
    window.Main.openCameraWindow();
  }, [])

  return (
    <Container>
      <button onClick={handleFilePathChange}>Print</button>
      <button onClick={handleOpenCamera}>Open Camera</button>
    </Container>
  )
};

