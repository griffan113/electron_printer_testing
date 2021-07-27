import { useCallback, useRef } from 'react';
import { Button } from '../Button';
import WebcamModal, { WebcamModalHandles } from '../WebCamModal';
import { Container } from './styles';

export const Home = () => {
  const modalRef = useRef<WebcamModalHandles>(null);

  const handleFilePathChange = useCallback(() => {
    window.Main.printSilently();
  }, []);

  const handleOpenCameraModal = useCallback(() => {
    modalRef.current?.handleOpenModal();
  }, []);

  return (
    <Container>
      <Button isPrimary value="Print" onClick={handleFilePathChange} />
      <Button isPrimary value="Open Camera Modal" onClick={handleOpenCameraModal} />
      <WebcamModal ref={modalRef} />
    </Container>
  )
};

