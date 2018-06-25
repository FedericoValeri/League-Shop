# League-Shop
## Esame Progettazione Applicazioni Web e Mobili
### Descrizione del progetto
E-Commerce ispirato al videogioco League of Legends. All’interno del sito è possibile registrarsi ed effettuare il login come utente. Una volta completata la registrazione è possibile procedere all’acquisto di “campioni”, aventi ognuno le proprie caratteristiche ed il proprio prezzo, espresso in “essenze blu”, la valuta utilizzata nel videogioco. È importante precisare che al momento della registrazione, al nuovo utente saranno assegnate automaticamente 50.000 essenze blu per permettere l’acquisto di campioni. Inoltre, ogni utente può acquistare un determinato campione una ed una sola volta. L’idea di fondo è che una volta acquistato un campione, esso diventa disponibile per il giocatore che lo ha acquistato che quindi potrà utilizzarlo nelle sue partite. Al momento dell’acquisto quindi, il campione acquistato viene aggiunto all’elenco dei campioni posseduti dall’utente, e rimosso dalla lista globale nella home page del sito. L’utente potrà verificare i campioni che ha acquistato accedendo al proprio profilo, dove verranno mostrati la data di acquisto, il totale pagato e ovviamente le rimanenti essenze blu.
Il sito comprende anche un’area riservata all’admin, dove è possibile visualizzare la lista degli utenti attualmente registrati e la lista di tutti i campioni a disposizione. L’admin ha la facoltà di aggiungere campioni al negozio tramite form ed eventualmente cancellarli.
### Tecnologie utilizzate
Il progetto è stato realizzato utilizzando Nodejs, Express, MongoDB e Bootstrap come libreria iniziale per il front-end. La struttura del progetto è basata sul pattern MVC:

* Utilizzando Mongoose (http://mongoosejs.com/), all’interno della cartella “models” vengono creati i modelli degli oggetti che interagiscono nel programma attraverso la definizione di “Schemas”, così facendo i documenti all’interno del database non relazionale vengono rappresentati come oggetti Javascript.

* Nella cartella “views”, vengono definite le pagine html, utilizzando il view engine Handlebars (https://handlebarsjs.com/). 

* Infine nella cartella “controllers” vengono definite le function delle routes che poi vengo esportate all’interno delle routes stesse (definite nella cartella “routes”).

Per quanto riguarda l’autenticazione degli utenti, il tutto viene gestito con Passport (http://www.passportjs.org/) utilizzando passport-local (https://github.com/jaredhanson/passport-local) come authentication strategy. Al momento della registrazione, le password vengono criptate grazie al package bcrypt-nodejs (https://www.npmjs.com/package/bcrypt-nodejs) e poi salvate nel database. Per quanto riguarda la validazione, viene usato il package express-validator (https://github.com/express-validator/express-validator). Per creare la sessione viene utilizzato express-session (https://github.com/expressjs/session) e per creare uno storage dove salvare la sessione, connect-mongo (https://www.npmjs.com/package/connect-mongo).
### Authors
* Federico Valeri  

* Francesco Casoni

* Melania Fattorini

------------------------------------------------------------------------------------------------------------------------------------------------------

Guida per Git: http://rogerdudler.github.io/git-guide/index.it.html
