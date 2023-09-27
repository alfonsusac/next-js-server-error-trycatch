import { unstable_cache } from "next/cache"
import ErrorClientActionRunner from "./trycatch.client"
import { Suspense } from "react"

/**
 * 1. Server tries to render component
 * 2. Server fails rendering component
 * 3. Error gets caught by catch()
 * 4. Renders fallback on the client with retry button
 * 5. Client comps renders fallback first with button
 * 
 */




export async function TryCatch<P>({ Check, onError, ...rest }: {
  Check: React.FunctionComponent<any>,
  // children?: React.ReactNode,
  onError: (error: any) => (React.ReactNode | Promise<React.ReactNode>),
} & P) {

  return (
    // <Suspense>
      <TryCatchInternal Check={ Check } onError={ onError } {...rest } />
    // </Suspense>
  )

}

async function TryCatchInternal<P>({ Check, onError, ...rest }: {
  Check: React.FunctionComponent<any>,
  // children?: React.ReactNode,
  onError: (error: any) => (React.ReactNode | Promise<React.ReactNode>),
} & P) {

  try {
    console.log('\n Trying..')
    const Checked = (await (Check as any)(rest))
    console.log("Trying Internal")
    return (Checked)
  } catch (error: any) {
    console.log("TryCarch error")
    console.log(error.toString())
    return <ErrorClientActionRunner
      initialError={ error.toString() }
      fallback={ (onError as any)(error) }
    />
  }

}