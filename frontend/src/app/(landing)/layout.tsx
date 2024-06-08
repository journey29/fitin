import { PropsWithChildren } from "react"

import { Container } from "@/components/Container"

import { Header } from "./_components/Header"

const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}

export default LandingLayout
