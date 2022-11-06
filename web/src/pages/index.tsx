import Image from 'next/image'
import logo from '../assets/logo.svg'
import avatars from '../assets/users-avatar-example.png'
import appPreview from '../assets/app-nlw-copa-preview.png'
import iconCheckImage from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  userCount: number
  guessCount: number
  poolsCount: number
}

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso , o codigo foi copiado para a area de transferencia')

      setPoolTitle('')

    } catch (err) {
      alert('Falha ao criar o bolão , tente novamente!')
    }

  }


  return (
    <div className="max-w-[1124px]  h-screen mx-auto gap-28 grid grid-cols-2 items-center"  >
      <main>
        <Image src={logo}
          alt="Logo NLW " />

        <h1 className='mt-14 text-white text-5xl font-bold'>Crie seu próprio bolão da copa e compartilhe entre amigos</h1>

        <div className='mt-10 flex items-center gap-2'>

          <Image src={avatars}
            alt="Avatares Usuario" />
          <strong className='text-gray-100 text-xl' >
            <span className='text-ignite-500'>+{props.userCount} </span>pessoas já estão usando
          </strong>

        </div>

        <form
          className='mt-10 flex gap-2'
          onSubmit={createPool}
        >

          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type="text"
            required
            placeholder='Qual o nome do seu bolão?'
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle} />
          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type="submit">Criar meu Bolão</button>

        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você recebera um código unico que poderá usar para convidar outras pessoas</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex  items-center justify-between text-gray-100' >
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImage} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolsCount} </span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />


          <div className='flex items-center gap-6'>
            <Image src={iconCheckImage} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount} </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreview}
        alt="Dois Celulares Mostrando a versão Mobile"
        quality={100}
      />
    </div>

  )
}



export const getStaticProps = async () => {

  const [userCountResponse, guessCountResponse, poolsCountResponse] = await Promise.all([
    api.get('users/count'),
    api.get('guesses/count'),
    api.get('pools/count')
  ])

  return {
    props: {
      userCount: userCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      poolsCount: poolsCountResponse.data.count
    },
    revalidate: 50
  }

}



