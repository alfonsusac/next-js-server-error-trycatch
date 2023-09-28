import Image from 'next/image'
import styles from './page.module.css'
import { TryCatch } from './trycatch'
import { ErrorMessage } from './trycatch.client'
import { ErrorBoundary } from 'react-error-boundary'

export const dynamic = 'force-dynamic'
export default function Home() {
  return (
    <>
      <div>
        Static Server Component
      </div>

      <p>Using try catch: </p>
      <TryCatch
        Check={ ThrowableComponent }
        onError={ () => <ErrorMessage /> }
      >
        42
      </TryCatch>
      <p>Using Error Boundaries</p>
      <ErrorBoundary fallback={ <ErrorMessage /> }> 
        <TryCatch
          Check={ InnocentLookingComponent }
          onError={ () => <ErrorMessage /> }
          id="Hello World"
        >
          69
        </TryCatch>
      </ErrorBoundary>
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

async function InnocentLookingComponent(p: { children?: React.ReactNode, id: string }) {

  return (
    <div>
      Hey it didn&apos;t break!
      <br />
      Here is children:
      <div style={ { fontSize: "4rem" } }>
        { p.children } { (p as any).ids.prop }
      </div>
      {/* <TroublesomeComponent /> */}
    </div>
  )
}

function TroublesomeComponent() {
  const rn = Math.random()
  console.log(rn)
  if (rn > 0.2) throw new Error("Intentional Oopsie " + rn)
  return (
    <div>Pretty darn lucky</div>
  )
}