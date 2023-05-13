import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Button,
  ChakraProvider,
  Flex,
  Box,
  Heading,
  extendTheme,
  Grid,
  GridItem,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import './App.css';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Versions from './versions';

const theme = extendTheme({
  fonts: {
    heading: `'Noto Sans JP', sans-serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
});

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
              <Route path="/" element={<Versions />} />
            </Routes>
          </Router>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
