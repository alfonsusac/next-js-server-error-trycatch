import Image from 'next/image'
import styles from './page.module.css'
import { TryCatch } from './trycatch'
import { ErrorMessage } from './trycatch.client'

export const dynamic = 'force-dynamic'
export default function Home() {
  return (
    <>
      <div>
        Static Server Component
      </div>
      <TryCatch
        Check={ ThrowableComponent }
        onError={ () => <ErrorMessage /> }
      >
        42
      </TryCatch>
      <TryCatch
        Check={ ThrowableComponentWithParam }
        onError={ () => <ErrorMessage /> }
        id="Hello World"
      >
        69
      </TryCatch>
    </>
  )
}


async function ThrowableComponent(p: { children?: React.ReactNode }) {
  const rn = Math.random()
  console.log(rn)
  if (rn > 0.4) throw new Error("Intentional Oopsie " + rn)
  return (
    <div>
      Hey it didn&apos;t break!
      <br />
      Here is children:
      <div style={ { fontSize: "12rem" } }>
        { p.children }
      </div>
    </div>
  )
}

async function ThrowableComponentWithParam(p: { children?: React.ReactNode, id: string }) {
  const rn = Math.random()
  console.log(rn)
  if (rn > 0.4) throw new Error("Intentional Oopsie " + rn)
  return (
    <div>
      Hey it didn&apos;t break!
      <br />
      Here is children:
      <div style={ { fontSize: "4rem" } }>
        { p.children } { p.id }
      </div>
    </div>
  )
}