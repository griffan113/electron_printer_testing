import { Container, Image, Text } from './styles'

export const Home = () => {
  return (
    <Container>
      <h1>Electron, React and TypeScript Template</h1>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <Text>Edit <code>src/App.tsx</code> and save to reload.</Text>
      <Text>You can use Bootstrap, Styled Components or pure CSS to beatify your app :)</Text>
    </Container>
  )
}

