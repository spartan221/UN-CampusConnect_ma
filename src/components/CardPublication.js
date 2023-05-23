import React from 'react';
import { Box, Heading, Text, Stack, Image, AspectRatio } from 'native-base';

const CardPublication = (props) => {
  const { title, description, date, imageUrl } = props;
  return (
    <Box alignItems="center" m={'5%'}>
      <Box
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
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: imageUrl,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {title}
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
              {date}
            </Text>
          </Stack>
          <Text fontWeight="400">{description}</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardPublication;
