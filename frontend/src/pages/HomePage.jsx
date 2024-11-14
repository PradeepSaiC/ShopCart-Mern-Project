import { Container, SimpleGrid, Text, VStack,Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'
const HomePage = () => {
  const {fetchProducts,products} = useProductStore();
  const [loading,setLoading] = useState(true);
  useEffect(()=> {
    fetchProducts().finally(()=>setLoading(false))
  },[fetchProducts])

  
  return (
    <div>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Text
              fontSize={"30"}
              fontWeight={"bold"}
              bgGradient={"linear(to-r,cyan.400,blue.500)"}
              bgClip={"text"}
              textAlign={"center"}
            >
              Current Products 
            </Text>

            <SimpleGrid 
            columns={{
              base:1,
              md: 2,
              lg:3
            }}
            spacing={10}
            w={"full"}
            >

              {products.map((product) => (
                <ProductCard key={product._id} product={product}/>
              ))}
            </SimpleGrid>

            {loading ? (
             <Spinner
             thickness="4px"
             speed="0.65s"
             emptyColor="gray.200"
             color="cyan.400"
             size="xl"
           />
          ):(
            products.length === 0 && (
              <Text fontSize={"xl"} textAlign={'center'} fontWeight={"bold"} color={"gray.500"}>
              No Products found {" "}
              <Link to={"/create"}>
                  <Text as="span" color={"blue.500"} _hover={{textDecoration:"underline"}}>
                    Create a product
                  </Text>
              </Link>

            </Text>
           )
          )}
          
            {}
        </VStack>
      </Container>
    </div>
  )
}

export default HomePage