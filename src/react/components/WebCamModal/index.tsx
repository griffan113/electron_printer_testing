import {
  useRef,
  useState,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle
} from 'react';
import Webcam from "react-webcam";
import { Button } from '../Button';

import {
  Container,
  ModalHeader,
  ModalContent,
  ModalBody,
  Picture,
  Preview,
  PreviewHeader
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
  });

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
            <Button onClick={handleCloseModal} value="X" isPrimary={false} />
          </ModalHeader>
          <ModalBody>
            <Webcam
              style={{ borderRadius: "5px", maxHeight: "300px", height: "60%" }}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <Button value="Capture photo" onClick={capture} isPrimary />
            {imgSrc && (
              <Preview>
                <PreviewHeader>
                  <h3>Preview</h3>
                  <Button onClick={() => setImgSrc("")} value="X" isPrimary={false} />
                </PreviewHeader>
                <Picture
                  src={imgSrc}
                />
              </Preview>
            )}
          </ModalBody>
        </ ModalContent>
      </Container>
    </>
  );
};

export default forwardRef(WebCamModal)
