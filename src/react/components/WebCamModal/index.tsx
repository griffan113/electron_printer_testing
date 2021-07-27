import {
  useRef,
  useState,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
} from 'react'
import Webcam from 'react-webcam'

import { Container, ModalContent } from './styles'

export interface WebcamModalHandles {
  handleOpenModal: () => void
  capture: () => void
  handleCloseModal: () => void
}

const WebcamModal: ForwardRefRenderFunction<WebcamModalHandles> = (
  props,
  ref
) => {
  const webcamRef = useRef<Webcam>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal,
      capture,
      handleCloseModal,
    }
  })

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() as string

    window.Main.savePicture(imageSrc)
  }, [webcamRef])

  const handleOpenModal = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsVisible(false)
  }, [])

  if (!isVisible) return null

  return (
    <>
      <Container>
        <ModalContent>
          <Webcam
            style={{ height: '100%' }}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </ModalContent>
      </Container>
    </>
  )
}

export default forwardRef(WebcamModal)
