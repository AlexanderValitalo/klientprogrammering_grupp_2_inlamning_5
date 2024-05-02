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

### `Tillgänglighetsanpassningar`

Vi har följt de riktlinjer som krävs för tillgänglighetsanpassning. Detta innebär att vissa förbättringar gjordes, för mer information se den tekniska genomgången.

## `Teknisk genomgång`

### `Optimering`

- I uppgiften så ingick det att vi skulle visa på att vi kan lazy-loading. Vår sida har endast en bild på första sidan som i nuläget använder sig av lazy-loading då uppgiften krävde det. Vi vet om att egentligen så ska man inte ha lazy-loading på bilder som ska synas direkt när sidan laddas men för uppgiftens skull så har vi gjort det för att visa att vi kan det.

- Vi har använt oss av Image-komponenten istället för img-taggen för att förbättra bildoptimeringen. Bilden har även specificerad width och height.

- Som tidigare nämnt har vi flyttat ut mycket kod i flertalet separata komponenter vilket har gjort att vissa delar av sidorna kan serverrenderas vilket gör applikationen snabbare.

- I förra versionen hade vi 96% i Performance enligt Lighthouse. I senaste versionen har vi 92%. Detta beror till största del på att vi enligt uppgiften har tvingats använda lazy-loading på en bild som inte behöver ha det egentligen.

### `Tillgänglighet`

- Semantisk html har använts, exempelvis header, main, footer, h1, h2, h3.
- Inmatningsfälten har antingen id och tillhörande labels eller aria-labels för att underlätta för skärmläsare. För våra ingrediensinmatningsfält så löste vi det genom att ta med indexnummret i namnet på respektive aria-label exempelvis "Ingredient name 7" för den 7:e ingrediensens namn. 
- Kontrasten var innan lite sämre i placeholders och navigationslänkarna i förra versionen men har nu förbättrats. 
- Applikationen har anpassats för både lightmode och darkmode. Den kör det som din webbläsare är inställd på.

## `Utmaningar och lösningar`

- När vi skulle göra vår update-funktion så hade vi lite problem med att hitta lösning på hur det går till med indexeddb, främst vad gäller "Key-värdet", dvs hur man skriver för att kunna updatera rätt objekt i databasen och inte enbart skapa ett nytt varje gång. Efter en hel del sökning så fann vi att vi var tvungna att parsa värdet till ett number. 

- Vid skapandet av våra dynamiska ingrediensfält så var det lite klurigt att komma på hur det skulle fungera då vi har titel på receptet som string, ingredienserna som en array med objekt och cookinginstructions som en string som vi ville ha som en gemensam hook för att hålla ihop det som ett recept. En del av lösningen var att vi "mappar" över alla ingredienser och skapade komponenten IngredientInput som kunde ta hand om ingrediensernas inmatning och värden. 
