import Image from 'next/image'
import styles from './page.module.css'
import { TryCatch } from './trycatch'
import { ErrorMessage } from './trycatch.client'

export const dynamic = 'force-dynamic'
export default function Home() {
  return (
    <div>
      <div>
        Header
        <a href="/" style={ { textDecoration: 'underline', color: '#aaa' } }>refresh page</a>
      </div>
      <TryCatch
        Check={ ThrowableComponent }
        onError={ () => <ErrorMessage /> }
      >
        42
      </TryCatch>
      <TryCatch
        Check={ ThrowableComponent }
        onError={ () => <ErrorMessage /> }
      >
        69
      </TryCatch>
    </div>
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
      <div>
        <a href="/" style={ { textDecoration: 'underline', color: '#aaa'} }>refresh page</a>
      </div>
    </div>
  )
}