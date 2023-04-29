import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ChakraProvider,
  Flex,
  Text,
  Box,
  Heading,
  extendTheme,
  Grid,
  GridItem,
  Stack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import './App.css';
import { ChevronDownIcon, SunIcon } from '@chakra-ui/icons';

const theme = extendTheme({
  fonts: {
    heading: `'Noto Sans JP', sans-serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
});

function Hello() {
  return (
    <Box>
      <Heading size="md" mb={5}>
        バージョン
      </Heading>
      <VStack gap={2}>
        <Card width={"full"}>
          <CardHeader>
            <Heading size="md">Blender 3.25</Heading>
            <Text pt="2" fontSize="sm">
              C:\Program Files\Blender Foundation\Blender 3.5\blender.exe
            </Text>
          </CardHeader>
          <CardFooter>
            <Button colorScheme="blue" leftIcon={<SunIcon />}>
              起動する
            </Button>
          </CardFooter>
        </Card>
        <Card width={"full"}>
          <CardHeader>
            <Heading size="md">Blender 3.25</Heading>
            <Text pt="2" fontSize="sm">
              C:\Program Files\Blender Foundation\Blender 3.5\blender.exe
            </Text>
          </CardHeader>
          <CardFooter>
            <Button colorScheme="blue" leftIcon={<SunIcon />}>
              起動する
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </Box>
  );
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateRows="repeat(10, 1fr)"
        templateColumns="repeat(4, 1fr)"
        height="100vh"
      >
        <GridItem colSpan={4} rowSpan={1}>
          <Flex
            bgColor="gray.50"
            p={5}
            justifyContent="space-between"
            alignItems="center"
            h="full"
          >
            <Box>
              <Heading as="h1" size="md" fontWeight="bold">
                BlenderHub
              </Heading>
            </Box>
            <Box>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  日本語
                </MenuButton>
                <MenuList>
                  <MenuItem>日本語</MenuItem>
                  <MenuItem>English</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} rowSpan={9} shadow="md">
          <VStack p={3} alignItems="start">
            <Button colorScheme="blue" variant="outline">
              バージョン
            </Button>
            <Button colorScheme="blue" variant="ghost">
              プロジェクト
            </Button>
          </VStack>
        </GridItem>
        <GridItem colSpan={3} rowSpan={9} p={8}>
          <Router>
            <Routes>
              <Route path="/" element={<Hello />} />
            </Routes>
          </Router>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
