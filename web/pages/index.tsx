import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

interface HomeProps {
  count: number
}

export default function Home(props: HomeProps) {

  return (
    <h1>Contagem: {props.count}</h1>
  )
}

export const getServerSideProps = async () =>{

 const response = await fetch('http://localhost:3333/pools/count')

 const data = await response.json()

 return {
  props:{
    count: data.count
  }
 }

}


