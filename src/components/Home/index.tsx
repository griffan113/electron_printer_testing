import { useCallback } from 'react';
import { Container } from './styles';

export const Home = () => {
  // const [filePath, setFilePath] = useState<string>("");

  const handleFilePathChange = useCallback(() => {
    window.Main.requestOpenDialog();
  }, [])

  return (
    <Container>
      <button onClick={handleFilePathChange}>Print</button>
      {/* <Text>{filePath}</Text> */}
    </Container>
  )
};

