import { Icon, Stack, Text } from '@chakra-ui/react';
import { GiFlowerPot } from 'react-icons/gi';

import { BackgroundImage } from '@/components/common/BackgroundImage';
import { usePrefetchTreatments } from '../treatments/hooks/useTreatments';

export function Home() {
    usePrefetchTreatments(); // Not great to have this on every render, but this component isn't very dynamic so no big deal.

    return (
        <Stack textAlign='center' justify='center' height='84vh'>
            <BackgroundImage />
            <Text
                textAlign='center'
                fontFamily='Forum, sans-serif'
                fontSize='6em'>
                <Icon m={4} verticalAlign='top' as={GiFlowerPot} />
                Lazy Days Spa
            </Text>
            <Text>Hours: limited</Text>
            <Text>Address: nearby</Text>
        </Stack>
    );
}
