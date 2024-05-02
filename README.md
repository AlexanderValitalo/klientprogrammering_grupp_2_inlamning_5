This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# `Inlämningsuppgift 5, Projektalternativ 3: Receptsamling, Grupp 2: Alexander, Oskar och Milla`

## `Beskrivning och syfte av webbapplikationen`

Syftet med webbapplikationen är att enkelt kunna spara alla dina favoritrecept. Lägg enkelt till ingredienser och tillagningsinstruktioner, och du är klar! Använd sökfunktionen för att snabbt hitta vilket recept som helst som du har sparat.

## `Instruktioner för att Köras Lokalt`

För att köra denna applikation lokalt, följ dessa steg:

1. Klona projektet till din lokala maskin.
2. Installera beroenden med `npm install`, `yarn install`, `pnpm install` eller `bun install`.
3. Kör utvecklingsservern med `npm run dev`, `yarn dev`, `pnpm dev` eller `bun dev`.
4. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare för att se resultatet.

## `Beskrivning av hur datalagring sker`

### `Indexeddb`

Vi har använt Indexeddb till att spara användarens recept.
Detta gjorde vi för att IndexedDB är ett lågnivå-API för klientlagring av stora mängder strukturerad data och passar därför bra till vårt ändamål.

Några andra bra anledningar till att vi använder Inedexeddb är:

- Offline-åtkomst
- Prestanda då den ej behöver göra nätverksförfrågningar
- Sökbarhet då den kan indexera datan oavsett vilken egenskap som helst
- Stor lagringsgräns i jämförelse med andra lagringssät som exempelvis Localstorage som kan lagra max cirka 5MB
- Asynkrona anrop vilket gör så att huvudtråden inte blokeras
- Strukturerad data

### `SessionStorage`

Vi har valt att använda SessionStorage till vår sökfunktion så att sökningen inte försvinner om man byter sida medans applikationen fortfarande är öppen.

Fördelen med Sessionstorage är att den är enkel att använda och försvinner av sig självt när fliken stängs.

## `Implementerade förbättringar`

### `Komponentflyttning`

I förra versionen hade vi nästan all kod direkt i respektive page vilket gjorde att allt blev klientrenderat eftersom vi behövde använda use client med denna lösningen. I den senaste versionen har vi skapat flera separata komponenter och flyttat ut mycket av koden, vilket har gjort så att delar av sidorna kan serverrenderas. En annan stor fördel med detta är för applikationens skalbarhet om man hade utökat projektet ytterligare i framtiden.

### `Update/Delete`

I förra versionen gick det bara att lägga till och läsa recept. I senaste versionen går det även att uppdatera befintliga recept och ta bort dem. Vid uppdatering så ser användaren det befintliga receptet så att man enkelt ser vad man vill uppdatera. När användaren trycker på "ta bort"-knappen så kommer det upp en förfrågan om man verkligen vill ta bort den, för att minska risken att man tar bort recept av misstag.

### `Ingrediensinput`

I förra versionen kunde användaren endast skriva in ingredienser i ett stort textfält, vilket funkar men inte är speciellt användarvänligt. I den senaste versionen kan användaren mata in varje ingrediens separat med separata fält för namn, mängd, och enhet. Användaren kan enkelt lägga till fler ingredienser, eller ångra sig och ta bort redan befintliga ingredienser. "IngredientInput" är en komponent som vi använder både när man lägger till recept och när de uppdateras.

## `Teknisk genomgång`

## `Utmaningar och lösningar`



- komponentflyttning
- lazy loading
- aria-labels
- update
- delete
- standard
- semantisk html
- tillgänglighetsförbättringar ex knotrast
- dynamisk ingridiensfältsuppbyggnad
