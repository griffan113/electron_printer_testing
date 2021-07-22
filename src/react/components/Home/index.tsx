import { useCallback, useRef } from 'react';
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
      <button onClick={handleFilePathChange}>Print</button>
      <button onClick={handleOpenCameraModal}>Open Camera Modal</button>
      <WebCamModal ref={modalRef} />
    </Container>
  )
};

