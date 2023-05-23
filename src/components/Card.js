import React from 'react';
import { Box, Heading, Text, Stack } from 'native-base';

const Card = (props) => {
  const { nameGroup, status, deadline } = props;
  return (
    <Box alignItems="center">
      <Box
        width={'80%'}
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {nameGroup}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {status}
            </Text>
          </Stack>
          <Text fontWeight="400">{deadline}</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Card;
