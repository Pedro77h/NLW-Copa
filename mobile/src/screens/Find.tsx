import { VStack, Heading, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";


export function Find() {

    const [isLoading, setIsloading] = useState(false)
    const [code, setCode] = useState('')

    const toast = useToast()
    const { navigate } = useNavigation()


    async function handleJoinPool() {

        try {
            setIsloading(true)

            if (!code.trim()) {
                return toast.show({
                    title: "Digite o codigo",
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post('/pools/join', { code })

            navigate('pools')

            toast.show({
                title: 'Voce entrou no bolão Com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

        } catch (err) {
            console.log(err)
            setIsloading(false)

            if (err.response?.data?.message === 'Pool not found') {
                return toast.show({
                    title: 'Não foi possivel encontrar o bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            if (err.response?.data?.message === 'You already joined this pool.') {
                return toast.show({
                    title: 'Voce ja esta nesse bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            toast.show({
                title: 'Erro no bolão',
                placement: 'top',
                bgColor: 'red.500'
            })



        }


    }



    return (
        <VStack flex={1} bg="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">

                <Heading fontFamily="heading"
                    color="white"
                    fontSize="xl"
                    mb={8}
                    textAlign="center">
                    Encontre um bolão através {'\n'} de seu código unico
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o código do bolão"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                    maxLength={6}
                />

                <Button
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />

            </VStack>
        </VStack>
    )
}