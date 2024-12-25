'use client'

import { useDebounce } from '@uidotdev/usehooks'
import { BookUser, Search } from 'lucide-react'
import { Suspense } from 'react'

import { useControlledInput } from '@netzap/ui/hooks/use-controlled-input'

import { Button } from '@netzap/ui/components/button'
import { Input } from '@netzap/ui/components/input'
import { ScrollArea } from '@netzap/ui/components/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@netzap/ui/components/sheet'

import { FETCH_LIMIT } from '@/consts'
import { ContactsList } from './contacts-list'
import { ContactsListSkeleton } from './contacts-list-skeleton'

export function ContactsSheet() {
  const [search, setSearch] = useControlledInput()
  const debouncedSearch = useDebounce(search, 300)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <BookUser />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col pb-0">
        <SheetHeader>
          <SheetTitle>Nova conversa</SheetTitle>
          <SheetDescription>
            Procure e seleciona um contato para iniciar uma nova conversa.
          </SheetDescription>

          <div className="flex items-center relative">
            <div className="absolute left-3 inset-y-center">
              <Search className="size-4 text-muted-foreground" />
            </div>

            <Input
              className="pl-9"
              placeholder="Pesquise pelo nome ou telefone"
              value={search}
              onChange={setSearch}
            />
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 -mx-6">
          <ScrollArea className="h-full">
            <div className="space-y-1 pt-2 pb-4 mx-6">
              <Suspense
                fallback={<ContactsListSkeleton amount={FETCH_LIMIT} />}
              >
                <ContactsList search={debouncedSearch} limit={FETCH_LIMIT} />
              </Suspense>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
