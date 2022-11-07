import { useEffect, useState  , useCallback} from "react";
import { VStack, Icon, useToast, FlatList } from "native-base"
import { Octicons } from '@expo/vector-icons'
import { useNavigation , useFocusEffect } from '@react-navigation/native'
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { PoolCard, PoolcardProps } from '../components/PoolCard'
import { Loading } from '../components/Loading'
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {

    const [isLoading, setIsloading] = useState(true)
    const [pools, setPools] = useState<PoolcardProps[]>([])

    const navigation = useNavigation()
    const toast = useToast()

    async function fetchPools() {

        try {
            setIsloading(true)
            const response = await api.get('/pools')
            setPools(response.data.pools)

        } catch (err) {
            console.log(err)

            toast.show({
                title: 'Não foi possivel carregar os bolões',
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setIsloading(false)
        }

    }


    useFocusEffect(useCallback(() => {
        fetchPools()
    }, []))


    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button
                    title="BUSCAR BOLÃO POR CODIGO"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    onPress={() => navigation.navigate('find')}
                />
            </VStack>
            {
                isLoading ?
                    <Loading />
                    :
                    <FlatList
                        data={pools}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <PoolCard data={item} />}
                        px={5}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ pb: 10 }}
                        ListEmptyComponent={() => <EmptyPoolList />}
                    />

            }

        </VStack>
    )
}