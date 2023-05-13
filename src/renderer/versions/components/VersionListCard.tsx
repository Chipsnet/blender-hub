/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import {
  Card,
  CardHeader,
  Heading,
  Text,
  CardFooter,
  Button,
} from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';

type Props = {
  name: string;
  path: string;
  uuid: string;
};

export default function VersionListCard(props: Props) {
  const { name, path, uuid } = props;

  const launch = () => {
    console.log(uuid);
    window.electron.ipcRenderer.sendMessage('launch-app', [uuid]);
  };

  return (
    <Card width="full">
      <CardHeader>
        <Heading size="md">{name}</Heading>
        <Text pt="2" fontSize="sm">
          {path}
        </Text>
      </CardHeader>
      <CardFooter>
        <Button colorScheme="blue" leftIcon={<SunIcon />} onClick={launch}>
          起動する
        </Button>
      </CardFooter>
    </Card>
  );
}
