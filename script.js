// Uppgift 2 – Variabler och scope

console.log('--- Uppgift 2: före blocket ---');
console.log(varVariable); // undefined (var "hoistas" och kan nås, men har inget värde än)
// console.log(letVariable);   // Skulle krascha: ReferenceError (let är block-scopad)
// console.log(constVariable); // Skulle krascha: ReferenceError (const är block-scopad)

{
    var varVariable = 'Jag är var';
    let letVariable = 'Jag är let';
    const constVariable = 'Jag är const';

    console.log('--- Uppgift 2: inuti blocket ---');
    console.log(varVariable);   // "Jag är var"
    console.log(letVariable);   // "Jag är let"
    console.log(constVariable); // "Jag är const"
}

console.log('--- Uppgift 2: efter blocket ---');
console.log(varVariable); // "Jag är var" (var bryr sig inte om block)
// console.log(letVariable);   // Skulle krascha: ReferenceError: letVariable is not defined
// console.log(constVariable); // Skulle krascha: ReferenceError: constVariable is not defined

/*
    Reflektion uppgift 2

    Hur var, let och const skiljer sig gällande block:
    var är funktions-scopad (eller global om den inte ligger i en funktion). Den bryr sig inte
    om block { ... }. En var som deklareras inuti ett block kan därför nås både före och efter
    blocket. let och const är block-scopade. De finns bara inuti det block där de deklareras
    och kan inte nås utanför det. Skillnaden mellan let och const är att en let-variabel kan
    tilldelas ett nytt värde, medan en const måste få ett värde direkt och inte kan tilldelas
    om.

    Vad som händer vid olika placering av console.log():
    - Före blocket: varVariable ger undefined. var-deklarationer "hoistas" (lyfts upp) till
      toppen av sitt scope och får värdet undefined tills raden med tilldelningen körs. Att
      skriva ut letVariable eller constVariable före blocket ger ett ReferenceError som kraschar
      skriptet, eftersom de inte finns i det yttre scopet. Därför är de raderna bortkommenterade.
    - Inuti blocket: alla tre variablerna går att nå och deras värden skrivs ut.
    - Efter blocket: varVariable går att nå och skriver ut "Jag är var", eftersom var inte är
      block-scopad. letVariable och constVariable ger ReferenceError, eftersom deras scope tog
      slut när blocket stängdes. Därför är även de raderna bortkommenterade.
*/


// Uppgift 3 och 4 – Funktion för att addera tal, jämförelser och specialvärden

const add = (num1, num2) => {
    // Uppgift 4 – jämförelser
    console.log('--- add anropad ---');
    console.log(num1 == 0);
    console.log(num2 === '0');
    console.log(num2 === 0);
    console.log(num1 == NaN);

    // Uppgift 4 – ternary operator
    console.log(num1 ? 'truthy' : 'falsy');

    // Uppgift 4 – if-sats
    if (
        !(num1 === null || num1 === undefined || num2 === null || num2 === undefined) &&
        typeof num1 === 'number' && !Number.isNaN(num1) &&
        typeof num2 === 'number' && !Number.isNaN(num2)
    ) {
        // Uppgift 3, steg 4 (flyttad hit i uppgift 4)
        return num1 + num2;
    } else {
        console.log('Felaktig input: båda argumenten måste vara tal.');
    }
};

/*
    Reflektion uppgift 3

    Vad som händer om variabeln skapats med let i stället:
    Funktionen skulle fungera på exakt samma sätt. Skillnaden är att en let-variabel kan
    tilldelas ett nytt värde. Det skulle gå att skriva t.ex. add = 5; senare i koden, och då
    skulle funktionen försvinna och alla senare anrop till add() skulle krascha med
    "TypeError: add is not a function". Med const skyddas variabeln mot att tilldelas om, och
    add pekar alltid på funktionen. Med både let och const går det dock inte att anropa
    funktionen före raden där den skapas.

    Samma funktion skriven som en funktionsdeklaration:

        function add(num1, num2) {
            return num1 + num2;
        }

    (En funktionsdeklaration hoistas i sin helhet och kan därför anropas även före raden där
    den står i koden.)

    Vad det innebär att en funktion returnerar något:
    När en funktion når ett return-uttryck avslutas funktionen direkt. Värdet efter return
    skickas tillbaka till stället där funktionen anropades. Där kan värdet sparas i en
    variabel, skrivas ut eller användas i ett annat uttryck, t.ex. let resultat = add(2, 3);
    som ger resultat värdet 5. Om en funktion inte når något return returnerar den undefined.
*/

/*
    Reflektion uppgift 4

    Vad en ternary operator är och hur den skiljer sig från en if()-sats:
    En ternary operator (villkor ? värdeOmSant : värdeOmFalskt) är JavaScripts enda operator
    med tre operander. Villkoret utvärderas. Om det är truthy blir resultatet uttrycket före
    kolon, annars uttrycket efter kolon. Skillnaden mot en if-sats är att en ternary är ett
    uttryck som ger ett värde. Den kan därför stå direkt inuti t.ex. console.log() eller
    tilldelas till en variabel. En if-sats är en sats som styr vilka kodrader som körs och ger
    inget värde i sig. Den passar bättre när flera rader kod ska köras. En ternary passar bäst
    för korta val mellan två värden.

    Skillnaden mellan == och ===:
    == (lös jämförelse) gör typomvandling innan jämförelsen om värdena har olika typer.
    Därför är t.ex. "0" == 0 true och false == 0 true. === (strikt jämförelse) gör ingen
    typomvandling. Värdena måste ha både samma typ och samma värde, så "0" === 0 är false.
    === är oftast säkrare eftersom det ger färre överraskningar.
    Obs: NaN är inte lika med något, inte ens sig själv. Därför ger num1 == NaN alltid false,
    oavsett vad num1 är. För att kontrollera NaN används i stället Number.isNaN().

    Hur jag löste if-satsens villkor som kontrollerar att parametrarna inte är null:
    Jag skrev villkoret (num1 === null || num1 === undefined || num2 === null ||
    num2 === undefined). Det blir sant om minst en av parametrarna är null eller undefined.
    Hela uttrycket omges av en parentes med ett ! (icke) framför, så det vänds till sant
    endast när ingen av parametrarna är null eller undefined. Med && kombineras det sedan
    med kontrollen att båda parametrarna är tal: typeof num1 === 'number' och
    !Number.isNaN(num1), och samma för num2. Kontrollen av NaN behövs eftersom NaN har typen
    'number' fast det inte är ett giltigt tal. Programmet går alltså in i if-satsen bara om
    ingen parameter är null/undefined OCH båda är riktiga tal. Annars körs else-satsen.

    Mitt val gällande strängar:
    Jag har valt att inte acceptera strängar, inte ens strängar som ser ut som tal, t.ex. "3".
    Funktionens uppgift är att göra en addition. Om en sträng skulle släppas igenom gör
    JavaScript sammanslagning i stället för addition, t.ex. "0" + 3 blir "03" och inte 3.
    Genom att kräva att båda parametrarna har typen 'number' (och inte är NaN) blir resultatet
    alltid en korrekt matematisk summa. Annars får användaren ett tydligt meddelande om att
    input är felaktig. Ett alternativ hade varit att omvandla strängar till tal med Number(),
    så att "3" blir 3, men jag valde den striktare lösningen för att funktionen bara ska
    räkna med värden som faktiskt är tal från början.
*/


// Uppgift 5 – Anropa funktioner

const num1 = 0;
let arg1;
let sum = false;

// Test 1
console.log('=== Test 1: add(sum, 1) ===');
console.log(add(sum, 1));

// Test 2
console.log('=== Test 2: add("0", 3) ===');
console.log(add("0", 3));

// Test 3
console.log('=== Test 3: add(3, "num1") ===');
console.log(add(3, "num1"));

// Test 4
console.log('=== Test 4: add(-5, num1) ===');
console.log(add(-5, num1));

// Test 5
console.log('=== Test 5: add(arg1, 7) ===');
console.log(add(arg1, 7));

// Test 6
console.log('=== Test 6: add() ===');
console.log(add());

// Valfria andra kombinationer
console.log('=== Valfritt test 7: add(2, 3) ===');
console.log(add(2, 3));

console.log('=== Valfritt test 8: add(null, 5) ===');
console.log(add(null, 5));

console.log('=== Valfritt test 9: add(NaN, 2) ===');
console.log(add(NaN, 2));

// Skriv ut num1 och sum
console.log('=== Variablerna sum och num1 ===');
console.log(sum);
console.log(num1);

/*
    Reflektion uppgift 5

    Skillnaden mellan parameter, variabel och argument:
    - En variabel är en namngiven plats som lagrar ett värde, t.ex. const num1 = 0;.
    - En parameter är ett namn i funktionsdefinitionen som tar emot ett värde när funktionen
      anropas, t.ex. num1 och num2 i (num1, num2) => { ... }. Inuti funktionen fungerar
      parametrar som lokala variabler.
    - Ett argument är det faktiska värdet som skickas in vid anropet, t.ex. -5 och num1 i
      add(-5, num1). Argumentens värden tilldelas parametrarna i samma ordning.

    Vilket output jag får allra sist (värdet i num1) och varför:
    Allra sist skrivs num1 ut, och det ger 0. Den globala variabeln num1 skapades med const
    och fick värdet 0. Parametern num1 i funktionen add är en helt egen lokal variabel som
    skuggar den globala num1 inuti funktionen. Det som händer med parametern påverkar inte
    den globala variabeln. Eftersom num1 är const kan den dessutom inte tilldelas om.
    Raden innan skrivs sum ut och ger false, eftersom jag skrev ut returvärdena direkt med
    console.log() och aldrig tilldelade sum något nytt värde.

    Steg för steg – varför varje rad ger det output den ger
    (ordning inuti add: num1 == 0, num2 === '0', num2 === 0, num1 == NaN, ternary,
    sedan if/else och till sist returvärdet):

    Test 1: add(sum, 1) -> num1 = false, num2 = 1
      true      -> false == 0: false typomvandlas till talet 0, och 0 == 0.
      false     -> 1 === '0': olika typer (number och string).
      false     -> 1 === 0: olika värden.
      false     -> NaN är aldrig lika med något.
      "falsy"   -> false är falsy.
      "Felaktig input..." -> typeof false är 'boolean', inte 'number'.
      undefined -> else-grenen har inget return, så funktionen returnerar undefined.

    Test 2: add("0", 3) -> num1 = "0", num2 = 3
      true      -> "0" == 0: strängen "0" typomvandlas till talet 0.
      false     -> 3 === '0': olika typer.
      false     -> 3 === 0: olika värden.
      false     -> NaN är aldrig lika med något.
      "truthy"  -> "0" är en icke-tom sträng, och alla icke-tomma strängar är truthy.
      "Felaktig input..." -> typeof "0" är 'string'.
      undefined -> inget return körs.

    Test 3: add(3, "num1") -> num1 = 3, num2 = "num1" (en sträng, inte variabeln num1)
      false     -> 3 == 0: olika värden.
      false     -> "num1" === '0': olika strängar.
      false     -> "num1" === 0: olika typer.
      false     -> NaN är aldrig lika med något.
      "truthy"  -> 3 är ett tal skilt från 0, alltså truthy.
      "Felaktig input..." -> typeof "num1" är 'string'.
      undefined -> inget return körs.

    Test 4: add(-5, num1) -> num1 = -5, num2 = 0 (värdet i den globala variabeln num1)
      false     -> -5 == 0: olika värden.
      false     -> 0 === '0': olika typer.
      true      -> 0 === 0: samma typ och samma värde.
      false     -> NaN är aldrig lika med något.
      "truthy"  -> -5 är skilt från 0, alltså truthy (även negativa tal är truthy).
      -5        -> båda är riktiga tal, så if-satsen körs och returnerar -5 + 0 = -5.

    Test 5: add(arg1, 7) -> num1 = undefined (arg1 har inget värde), num2 = 7
      false     -> undefined == 0: undefined är bara löst lika med null och undefined.
      false     -> 7 === '0': olika typer.
      false     -> 7 === 0: olika värden.
      false     -> NaN är aldrig lika med något.
      "falsy"   -> undefined är falsy.
      "Felaktig input..." -> num1 är undefined.
      undefined -> inget return körs.

    Test 6: add() -> inga argument, så både num1 och num2 blir undefined
      false     -> undefined == 0 är false.
      false     -> undefined === '0' är false.
      false     -> undefined === 0 är false.
      false     -> NaN är aldrig lika med något.
      "falsy"   -> undefined är falsy.
      "Felaktig input..." -> parametrarna är undefined.
      undefined -> inget return körs.

    Valfritt test 7: add(2, 3)
      false, false, false, false, "truthy", och sedan 5 eftersom båda är tal och 2 + 3 = 5.

    Valfritt test 8: add(null, 5)
      false     -> null == 0 är false (null är bara löst lika med null och undefined).
      false, false, false, "falsy" (null är falsy), "Felaktig input...", undefined.

    Valfritt test 9: add(NaN, 2)
      false     -> NaN == 0 är false.
      false, false,
      false     -> NaN == NaN är false. NaN är inte ens lika med sig själv.
      "falsy"   -> NaN är falsy.
      "Felaktig input..." -> typeof NaN är 'number', men Number.isNaN(NaN) är true,
                  så villkoret fångar upp det.
      undefined -> inget return körs.

    Sist:
      false     -> sum har aldrig tilldelats ett nytt värde.
      0         -> den globala const num1, som aldrig påverkats av funktionen.
*/
