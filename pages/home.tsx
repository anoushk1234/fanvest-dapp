import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Flex, Button, Box,Heading } from '@chakra-ui/react'
const Hom: NextPage = () => {
    return (
        <>
        <Head>
            <title>Home</title>
        </Head>
        <Flex
            align="center"
            justify="center"
            direction="column"
            height="100vh"
        >
            <Box>
            <Heading as="h1" size="xl">
                Home
            </Heading>
            </Box>
            <Box>
            <Link href="/about">
                <Button>About</Button>
            </Link>
            </Box>
        </Flex>
        </>
    )
}

export default Hom