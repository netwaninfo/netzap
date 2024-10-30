'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { Loader2 } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="grid grid-cols-2 h-full items-center">
      <div className="bg-neutral-900 h-full" />

      <div className="p-4 flex justify-center">
        <SignIn.Root>
          <Clerk.Loading>
            {isGlobalLoading => (
              <div className="max-w-[350px] w-full">
                <SignIn.Step className="space-y-6" name="start">
                  <div className="flex flex-col items-center space-y-1.5">
                    <h2 className="text-2xl font-bold text-center">
                      Bem-vindo de volta!
                    </h2>

                    <p className="text-center text-muted-foreground">
                      Por favor, insira seu email para continuar
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <Clerk.Field name="identifier">
                      <Clerk.Input
                        type="email"
                        asChild
                        placeholder="email@netwaninfo.com"
                      >
                        <Input />
                      </Clerk.Input>
                    </Clerk.Field>

                    <SignIn.Action
                      submit
                      asChild
                      className="w-full font-medium"
                      disabled={isGlobalLoading}
                    >
                      <Button>
                        <Clerk.Loading>
                          {isLoading =>
                            isLoading && (
                              <Loader2 className="size-4 animate-spin" />
                            )
                          }
                        </Clerk.Loading>
                        Continuar
                      </Button>
                    </SignIn.Action>
                  </div>
                </SignIn.Step>

                <SignIn.Step className="space-y-6" name="verifications">
                  <div className="flex flex-col items-center space-y-1.5">
                    <h2 className="text-2xl font-bold text-center">
                      Quase lá!
                    </h2>

                    <p className="text-center text-muted-foreground">
                      Digite sua senha para acessar a plataforma
                    </p>
                  </div>

                  <SignIn.Strategy name="password">
                    <div className="space-y-2.5">
                      <Clerk.Field name="password">
                        <Clerk.Input
                          type="password"
                          asChild
                          placeholder="awesome@2024"
                        >
                          <Input />
                        </Clerk.Input>
                      </Clerk.Field>

                      <SignIn.Action
                        submit
                        asChild
                        className="w-full font-medium"
                        disabled={isGlobalLoading}
                      >
                        <Button>
                          <Clerk.Loading>
                            {isLoading =>
                              isLoading && (
                                <Loader2 className="size-4 animate-spin" />
                              )
                            }
                          </Clerk.Loading>
                          Continuar
                        </Button>
                      </SignIn.Action>
                    </div>
                  </SignIn.Strategy>
                </SignIn.Step>
              </div>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      </div>
    </div>
  )
}
