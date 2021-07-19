import { useCallback, useState } from 'react';
import { Container, Text } from './styles';

export const Home = () => {
  const [filePath, setFilePath] = useState<string>("");

  const handleFilePathChange = useCallback(() => {
    window.Main.requestOpenDialog((data: string) => {
      setFilePath(data);
    });
  }, [])

  return (
    <Container>
      <button onClick={handleFilePathChange}>Choose File</button>
      <Text>{filePath}</Text>
    </Container>
  )
};

