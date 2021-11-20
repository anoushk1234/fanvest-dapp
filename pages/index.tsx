import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Flex, Button, Box,Heading } from '@chakra-ui/react'
import SomeText from '../components/SomeText'
const Home: NextPage = () => {
  return (
    <Box
    p={4}
    m={4}
    >
  <SomeText />
  </Box>
  )
}

export default Home
