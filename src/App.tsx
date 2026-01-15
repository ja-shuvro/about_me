import { Button, Container, Title, Text, Group } from '@mantine/core';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container size="sm" mt="xl">
      <Title order={1} mb="md">Welcome to Mantine!</Title>
      <Text mb="xl">
        This is a basic example to verify that Mantine is correctly installed and configured.
      </Text>
      <Group mb="lg">
        <Button variant="filled" color="blue" onClick={() => setCount(c => c + 1)}>
          Count is {count}
        </Button>
        <Button variant="outline" color="red" onClick={() => setCount(0)}>
          Reset
        </Button>
      </Group>

      <Text size="sm" c="dimmed">
        Edit src/App.tsx to start building your app.
      </Text>
    </Container>
  );
}

export default App;
