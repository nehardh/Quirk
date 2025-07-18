'use client'

import { getProviders, signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

export default function SignIn({ providers }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome Back 👋</h1>
        <p className="text-gray-500 mb-8">Sign in to continue</p>
        {Object.values(providers).map((provider: any) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="flex items-center justify-center gap-2 w-full mb-4 px-6 py-3 bg-black text-white rounded-xl transition hover:bg-gray-800"
          >
            {provider.name === 'Google' && <FcGoogle size={22} />}
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
