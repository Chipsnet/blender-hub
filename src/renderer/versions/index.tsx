/* eslint-disable no-console */
import { Box, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import VersionListCard from './components/versionListCard';

type VersionDataType = {
  name: string;
  path: string;
  dir: string;
  uuid: string;
};

type JsonDataType = {
  versions: VersionDataType[];
  'app-version': string;
  language: string;
};

export default function Versions() {
  const [versions, setVersions] = useState<VersionDataType[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-database', []);
  }, []);

  window.electron.ipcRenderer.on('set-database', (arg: JsonDataType) => {
    console.log(arg);
    setVersions(arg.versions);
  });

  return (
    <Box>
      <Heading size="md" mb={5}>
        バージョン
      </Heading>
      <VStack gap={2}>
        {versions.map((m) => (
          <VersionListCard
            key={m.uuid}
            name={m.name}
            path={m.path}
            uuid={m.uuid}
          />
        ))}
      </VStack>
    </Box>
  );
}
