import { useCallback, useRef } from 'react';
import { Button } from '../Button';
import WebCamModal, { WebCamModalHandles } from '../WebCamModal';
import { Container } from './styles';

export const Home = () => {
  const modalRef = useRef<WebCamModalHandles>(null);

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
      <WebCamModal ref={modalRef} />
    </Container>
  )
};

