import {
  useRef,
  useState,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle
} from 'react';
import Webcam from "react-webcam";

import {
  Container,
  ModalHeader,
  CloseButton,
  ModalContent,
  ModalBody,
  Picture
} from './styles';

export interface WebCamModalHandles {
  handleOpenModal: () => void;
}

const WebCamModal: ForwardRefRenderFunction<WebCamModalHandles> = (props, ref) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal
    }
  })

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() as string;

    window.Main.savePicture(imageSrc)
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const handleOpenModal = useCallback(() => {
    setIsVisible(true);
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, [])

  if (!isVisible) return null;

  return (
    <>
      <Container>
        <ModalContent>
          <ModalHeader>
            <CloseButton onClick={handleCloseModal}>X</CloseButton>
          </ModalHeader>
          <ModalBody>
            <Webcam
              height={"300px"}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo</button>
            {imgSrc && (
              <Picture
                src={imgSrc}
              />
            )}
          </ModalBody>
        </ ModalContent>
      </Container>
    </>
  );
};

export default forwardRef(WebCamModal)
