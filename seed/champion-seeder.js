var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/league-shop');


//richiedo lo schema per l'oggetto Champion
var Champion = require('../models/champion');
var User = require('../models/user');
//richiedo lo schema per l'oggetto Skill
var Skill = require('../models/skill');

//creazione skills Veigar
var veigarSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/XIxZkdw.png",
        letter: 'Passiva',
        title: 'Potere malefico fenomenale',
        description: "Colpire un campione nemico con un incantesimo o effettuare un uccisione conferisce a Veigar aumenti permanenti di potere magico."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Q2l0G1Z.png",
        letter: 'Q',
        title: 'Colpo distruttivo',
        description: "Veigar spara un colpo di energia oscura che infligge danni magici ai primi due nemici colpiti."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/KAsjGzE.png",
        letter: 'W',
        title: 'Materia oscura',
        description: "Veigar evoca una grande massa di materia oscura, facendola cadere dal cielo in una posizione bersaglio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/G1L3Xjd.png",
        letter: 'E',
        title: 'Punto di non ritorno',
        description: "Veigar distorce i bordi dello spazio attorno a una posizione bersaglio stordendo i nemici che passano attraverso il perimetro."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/fMk43Sy.png",
        letter: 'R',
        title: 'Esplosione primordiale',
        description: "Scatena un attacco energetico contro il campione nemico bersaglio."
    })
];

//creazione skills Irelia
var ireliaSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/EYQWlDe.png",
        letter: 'Passiva',
        title: 'Fervore di Ionia',
        description: "Quando Irelia colpisce i nemici con le sue abilità ottiene un bonus cumulabile di danni ai suoi attacchi base."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/2n7x6aV.png",
        letter: 'Q',
        title: 'Impeto della lama',
        description: "Irelia scatta in avanti per colpire il suo bersaglio, curandosi."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Wx9t6eN.png",
        letter: 'W',
        title: 'Danza sprezzante',
        description: "Irelia crea una formazione difensiva con le sue lame caricando un colpo che infligge danni."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/R4IGqGU.png",
        letter: 'E',
        title: 'Duetto impeccabile',
        description: "Irelia lancia due lame che convergono una sull'altra. I nemici colpiti vengono danneggiati, storditi e marchiati."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/wZmNhNX.png",
        letter: 'R',
        title: "Lama dell'avanguardia",
        description: "Irelia lancia una gran quantità di lame che esplodono verso l'esterno dopo aver colpito un campione nemico. I nemici colpiti dalle lame vengono danneggiati e marchiati. Dopodiché, le lame formano un muro che danneggia, rallenta e disarma i nemici che lo attraversano."
    })
];

//creazione skills Ashe
var asheSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/pqp2Sr8.png",
        letter: 'Passiva',
        title: 'Colpo di ghiaccio',
        description: "Gli attacchi di Ashe rallentano il bersaglio, aumentando i danni inflitti a quest'ultimo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/3nnunOy.png",
        letter: 'Q',
        title: "Concentrazione dell'esploratrice",
        description: "Ashe aumenta temporaneamente la sua velocità d'attacco e trasforma il suo attacco base in una potente sventagliata per tutta la durata."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/XvZDdE5.png",
        letter: 'W',
        title: 'Raffica di frecce',
        description: "Ashe lancia 9 frecce che infliggono maggiori danni in un'area conica dinnanzi a lei."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/7MkyXKe.png",
        letter: 'E',
        title: 'Colpo del falco',
        description: "Ashe invia il suo spirito del falco in ricognizione ovunque sulla mappa."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/m8jzwxg.png",
        letter: 'R',
        title: 'Freccia di cristallo incantata',
        description: "Ashe scaglia una freccia di ghiaccio in linea retta che infligge danni e stordisce il bersaglio."
    })
];

//creazione skills Garen
var garenSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/ikD5YbP.png",
        letter: 'Passiva',
        title: 'Perseveranza',
        description: "Se Garen non ha subito danni o è stato colpito dalle abilità dei nemici, rigenera una percentuale della sua salute massima ogni secondo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/LxaE1SQ.png",
        letter: 'Q',
        title: 'Colpo decisivo',
        description: "Garen ottiene un aumento di velocità di movimento, liberandosi di tutti i rallentamenti e colpendo un punto vitale con il prossimo attacco, che infliggerà danni bonus e silenzierà il bersaglio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/3nxncn6.png",
        letter: 'W',
        title: 'Scudo del coraggio',
        description: "Garen ottiene un grande aumento di Tenacia e riduzione danni per un breve momento, seguito da una quantità minore di riduzione danni per una durata più lunga."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/6A8fSEl.png",
        letter: 'E',
        title: 'Giudizio',
        description: "Garen esegue una danza della morte con la spada, infliggendo danni a chi lo circonda per tutta la durata dell'effetto e danneggiando l'armatura dei campioni nemici colpiti."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/n7wqgVP.png",
        letter: 'R',
        title: 'Giustizia di Demacia',
        description: "Il campione nemico con più uccisioni recenti è il Malvagio. Gli attacchi di Garen infliggono danni puri aggiuntivi al campione Malvagio."
    })
];

//creazione skills Tristana
var tristanaSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/NrpWFJk.png",
        letter: 'Passiva',
        title: 'Supermira',
        description: "Aumenta la gittata d'attacco di Tristana con il livello."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Xi7PwiZ.png",
        letter: 'Q',
        title: 'Fuoco rapido',
        description: "Tristana spara rapidamente con la sua arma, aumentando la sua velocità d'attacco per un breve periodo di tempo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/6F9BFSs.png",
        letter: 'W',
        title: 'Salto del razzo',
        description: "Tristana spara al suolo per sollevarsi in aria verso una posizione distante, infliggendo danni e rallentando i nemici circostanti a dove atterra per un breve periodo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/hYgUDfM.png",
        letter: 'E',
        title: 'Carica esplosiva',
        description: "Piazza una bomba su un bersaglio, che esplode dopo una breve durata, infliggendo danni alle unità circostanti."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/9DROB8B.png",
        letter: 'R',
        title: 'Palla di cannone',
        description: "Tristana carica una palla di cannone gigante e la spara contro un'unità nemica. Così facendo infligge danni magici e respinge il bersaglio."
    })
];

//creazione skills Thresh 
var threshSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/oKgoA6c.png",
        letter: 'Passiva',
        title: 'Dannazione',
        description: "Thresh può raccogliere le anime dei nemici che muoiono vicino a lui, ottenendo permanentemente armatura e potere magico."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/fM9Kmh1.png",
        letter: 'Q',
        title: 'Condanna a morte',
        description: "Thresh incatena un nemico e lo tira verso di lui."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/H66urjp.png",
        letter: 'W',
        title: 'Passaggio oscuro',
        description: "Thresh lancia una lanterna che protegge i campioni alleati vicini dai danni. Gli alleati possono cliccare sulla lanterna per scattare da Thresh."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Fw3Ug56.png",
        letter: 'E',
        title: 'Sferzata',
        description: "Thresh esegue una spazzata con la sua catena, respingendo i nemici colpiti nella direzione del colpo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/n250zQq.png",
        letter: 'R',
        title: 'La scatola',
        description: "Una prigione che rallenta e infligge danni se viene oltrepassata."
    })
];

//creazione skills Talon 
var talonSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/tZYsxtc.png",
        letter: 'Passiva',
        title: 'Punta di lama',
        description: "Gli incantesimi di Talon infliggono ferite su campioni e mostri epici, accumulandosi fino a un massimo di 3 volte. Quando Talon attacca un campione con 3 cariche di ferita, questo subisce pesanti danni da emorragia nel tempo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/WJ61yhF.png",
        letter: 'Q',
        title: 'Diplomazia di Noxus',
        description: "Talon trafigge l'unità bersaglio balzando verso di essa."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/KTSTd1p.png",
        letter: 'W',
        title: 'Lame rotanti',
        description: "Talon lancia una raffica di pugnali che ritornano a lui, infliggendo danni fisici ogni volta che passano attraverso un nemico."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/nGmldM3.png",
        letter: 'E',
        title: "Via dell'assassino",
        description: "Talon supera ogni terreno o struttura, fino a una distanza massima."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Xuzo96g.png",
        letter: 'R',
        title: 'Assalto delle ombre',
        description: "Talon disperde un anello di lame e diventa invisibile guadagnando della velocità di movimento bonus. Quando Talon emerge dall'Invisibilità, le lame convergono verso la sua posizione."
    })
];

//creazione skills Yasuo
var yasuoSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/IXuRwn7.png",
        letter: 'Passiva',
        title: 'Via del vagabondo',
        description: "La probabilità di colpo critico di Yasuo è raddoppiata. Inoltre, quando Yasuo si muove accumula punti che lo portano a ottenere uno scudo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/WC87Lh9.png",
        letter: 'Q',
        title: "Tempesta d'acciaio",
        description: "Un colpo mirato base. Dopo due Tempeste d'acciaio consecutive, la prossima sarà un tornado che lancia in aria i nemici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/R2mfHvw.png",
        letter: 'W',
        title: 'Muro di vento',
        description: "Crea un muro mobile che blocca i proiettili nemici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/zJJMGcO.png",
        letter: 'E',
        title: 'Colpo di taglio',
        description: "Scatta attraverso un'unità, infliggendo danni magici crescenti ad ogni lancio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Sf0V4JM.png",
        letter: 'R',
        title: 'Ultimo respiro',
        description: "Si muove verso un'unità e la colpisce ripetutamente, infliggendo danni ingenti. Può essere lanciato solo su bersagli in aria."
    })
];

//creazione skills Kai'Sa
var kaisaSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/e7o8Inb.png",
        letter: 'Passiva',
        title: 'Seconda pelle',
        description: "Gli attacchi base di Kai'Sa accumulano Plasma, infliggendo danni magici bonus crescenti."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/bWPkZDS.png",
        letter: 'Q',
        title: 'Pioggia di Icathia',
        description: "Kai'Sa spara uno sciame di missili che vanno alla ricerca dei bersagli nelle vicinanze."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/kFXC25v.png",
        letter: 'W',
        title: 'Cercatore del Vuoto',
        description: "Kai'Sa spara un missile a lunga gittata, marchiando i nemici con la sua passiva."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/ilnmELt.png",
        letter: 'E',
        title: 'Sovraccarico',
        description: "Kai'Sa aumenta brevemente la sua velocità di movimento, poi aumenta la velocità d'attacco."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/PMFUUm5.png",
        letter: 'R',
        title: 'Istinto omicida',
        description: "Kai'Sa si teletrasporta in un punto vicino a un campione nemico colpito da Plasma, ottenendo uno scudo."
    })
];

//creazione skills Pyke
var pykeSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/yU9OQcs.jpg",
        letter: 'Passiva',
        title: 'Dono degli affogati',
        description: "Quando Pyke è celato ai nemici, rigenera rapidamente parte della salute persa di recente contro i campioni nemici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/IBX4N9J.jpg",
        letter: 'Q',
        title: 'Arpionaggio',
        description: "Pyke si prepara e lancia il suo arpione, impalando il primo nemico colpito e tirandolo verso di sé di una distanza fissa."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/GqTaVIN.jpg",
        letter: 'W',
        title: 'Immersione spettrale',
        description: "Pyke si tuffa nelle acque spettrali, entrando in uno stato di mimesi e ottenendo un sensibile aumento di velocità di movimento."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/UTTIgAy.jpg",
        letter: 'E',
        title: 'Risacca fantasma',
        description: "Pyke scatta, lasciandosi alle spalle un fantasma affogato. Dopo un breve ritardo, il fantasma torna da Pyke, danneggiando e stordendo tutti i nemici che attraversa."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/LLVd16P.jpg",
        letter: 'R',
        title: 'Morte dagli abissi',
        description: "Pyke colpisce un'area a forma di X, teletrasportandosi dai campioni e giustiziando quelli con meno di una quantità fissa di salute."
    })
];

//creazione skills Nasus
var nasusSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/2SvnJ5y.png",
        letter: 'Passiva',
        title: 'Divora anime',
        description: "Nasus assorbe l'energia spirituale del nemico e ottiene un bonus di rubavita."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Ivxri2J.png",
        letter: 'Q',
        title: 'Attacco incrementale',
        description: "Nasus colpisce il suo nemico, infligge danni e, se uccide il bersaglio, aumenta il potere del suo prossimo Attacco incrementale."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/BDXjyFn.png",
        letter: 'W',
        title: 'Deperimento',
        description: "Nasus invecchia un campione nemico, rallentando la sua velocità di movimento e d'attacco nel tempo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/eKmxc9Z.png",
        letter: 'E',
        title: 'Fuoco dello spirito',
        description: "Nasus scatena uno spirito fiamma in una zona del campo di battaglia, infliggendo danni e riducendo l'armatura dei nemici che sono all'interno di tale area."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/wEeqWvO.png",
        letter: 'R',
        title: 'Furia della sabbia',
        description: "Nasus scatena una possente tempesta di sabbia che colpisce i nemici vicini. Durante la tempesta ottiene salute e gittata d'attacco, danneggia i nemici vicini, ha una ricarica ridotta su Attacco incrementale e ottiene armatura e resistenza magica bonus per la durata dell'effetto."
    })
];

//creazione skills Miss Fortune
var missfortuneSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/92D1IVN.png",
        letter: 'Passiva',
        title: 'Un colpo e via',
        description: "Miss Fortune infligge danni bonus ogni volta che attacca un nuovo bersaglio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/oeztxiQ.png",
        letter: 'Q',
        title: 'Doppio colpo',
        description: "Miss Fortune spara un proiettile al nemico, infliggendo a lui e al bersaglio che gli sta dietro dei danni."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/5ckGTIM.png",
        letter: 'W',
        title: 'Andatura',
        description: "Miss Fortune ottiene velocità d'attacco bonus per un breve periodo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/pSmXIAS.png",
        letter: 'E',
        title: 'Pioggia di piombo',
        description: "Miss Fortune rivela un'area con una pioggia di proiettili, infliggendo danni a ondate agli avversari e rallentandoli."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/4FuMi2M.png",
        letter: 'R',
        title: 'Tempesta di proiettili',
        description: "Miss Fortune indirizza una raffica di proiettili nell'area conica davanti a lei, infliggendo una grande quantità di danni ai nemici."
    })
];


//creazione skills Jinx
var jinxSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/PVDnzNu.png",
        letter: 'Passiva',
        title: 'Che emozione!',
        description: "Jinx riceve un grande aumento di velocità di movimento e velocità d'attacco cumulativa quando danneggia una torre, un campione o un inibitore che vengono poi uccisi o distrutti entro 3 secondi."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/3TkNu7z.png",
        letter: 'Q',
        title: 'Caaambio!',
        description: "Jinx modifica i suoi attacchi base passando da Pow Pow, la sua minigun, a Fishbones, il suo lanciarazzi. Gli attacchi con Pow Pow conferiscono velocità d'attacco, mentre quelli con Fishbones infliggono danni ad area, conferiscono portata e assorbono mana."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/yprYLWs.png",
        letter: 'W',
        title: 'Zap!',
        description: "Jinx usa Zapper, la sua pistola elettrica, per sparare un colpo che danneggia il primo nemico colpito, rallentandolo e rivelandolo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/m4NMVei.png",
        letter: 'E',
        title: 'Fuochino fuochino!',
        description: "Jinx lancia una serie di granate che esplodono dopo 5 secondi, incendiando i nemici. Le granate mordono i campioni nemici che le calpestano, immobilizzandoli."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/NdoYkat.png",
        letter: 'R',
        title: 'Super mega razzo della morte!',
        description: "Jinx spara un super razzo attraverso la mappa, che guadagna danni mentre viaggia. Il razzo esplode al contatto con un campione nemico, infliggendo danni a lui e ai nemici circostanti in base alla loro salute mancante."
    })
];

//creazione skills Jhin
var jhinSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/1uF1cG2.png",
        letter: 'Passiva',
        title: 'Morte in quattro atti',
        description: "Spara con una cadenza fissa e ha solo quattro proiettili. Jhin incanta l'ultimo proiettile con magie nere per mettere a segno un colpo critico e infliggere danni bonus da esecuzione."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/m99UWhH.png",
        letter: 'Q',
        title: 'Ispirazione improvvisa',
        description: "Jhin spara un bossolo magico a un nemico. Può colpire fino a quattro bersagli e aumenta i suoi danni ogni volta che uccide."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Pgjo0za.png",
        letter: 'W',
        title: 'Florilegio letale',
        description: "Jhin spara un singolo colpo con una gittata incredibile. Perfora minion e mostri, ma si ferma al primo campione."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/W43kOl4.png",
        letter: 'E',
        title: 'Catturare il pubblico',
        description: "Jhin piazza una trappola di loto invisibile che sboccia quando viene calpestata. Rallenta i nemici nelle vicinanze per poi infliggere danni con un'esplosione di petali taglienti."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/qcDtFmT.png",
        letter: 'R',
        title: 'Chiamata alla ribalta',
        description: "Jhin canalizza, trasformando Sussurro in un maestoso cannone da spalla. È in grado di sparare 4 colpi potenziati con grande gittata, capaci di perforare minion e mostri, ma che si fermano al primo campione colpito."
    })
];

//creazione skills Caitlyn
var caitlynSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/5Do7Y5A.png",
        letter: 'Passiva',
        title: 'Colpo alla testa',
        description: "Ogni pochi attacchi o negli attacchi ai danni di nemici in trappola o nella rete, Caitlyn spara un Colpo alla testa che infligge danni bonus e cresce con la sua probabilità di colpo critico."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/0pi1aaF.png",
        letter: 'Q',
        title: 'Pacificatore di Piltover',
        description: "Caitlyn carica il suo fucile per 1 secondo per sparare un colpo penetrante che infligge danni fisici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/OiRjLEy.png",
        letter: 'W',
        title: 'Trappola per Yordle',
        description: "Caitlyn piazza una trappola per stanare gli yordle. Se attivata, la trappola rivela e immobilizza il campione nemico per 1,5 secondi."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/gm5H3YB.png",
        letter: 'E',
        title: 'Rete calibro 90',
        description: "Caitlyn spara una pesante rete per rallentare il bersaglio. Il rinculo la spinge all'indietro."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/CNFsNSm.png",
        letter: 'R',
        title: 'Colpo perfetto',
        description: "Caitlyn prende tempo per indirizzare il colpo perfetto, infliggendo danni ingenti a un bersaglio, a enorme distanza."
    })
];

//creazione skills Katarina
var katarinaSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/pS8mopL.png",
        letter: 'Passiva',
        title: 'Voracità',
        description: "Se Katarina raccoglie una Daga, la usa per colpire tutti i nemici vicini, infliggendo danni magici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/j3UVmTV.png",
        letter: 'Q',
        title: 'Lame danzanti',
        description: "Katarina lancia una Daga al bersaglio, che poi rimbalza verso i nemici vicini per poi finire a terra."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/1upC1Gd.png",
        letter: 'W',
        title: 'Preparazione',
        description: "Katarina ottiene un momentaneo aumento di velocità di movimento e lancia in aria una Daga, direttamente sopra di lei."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/r5UpqyA.png",
        letter: 'E',
        title: 'Shunpo',
        description: "Katarina si teletrasporta dal bersaglio, colpendolo se è un nemico o colpendo il nemico più vicino se non lo è."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/raKVrnK.png",
        letter: 'R',
        title: 'Loto mortale',
        description: "Katarina diventa una raffica di lame che infligge ingenti danni magici per tutta la durata della canalizzazione ai 3 campioni nemici più vicini."
    })
];

//creazione skills Annie
var annieSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/k7humBV.png",
        letter: 'Passiva',
        title: 'Piromania',
        description: "Ogni 4 incantesimi lanciati, l'incantesimo successivo di Annie stordisce il bersaglio per un breve periodo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/OYXQeFL.png",
        letter: 'Q',
        title: 'Disintegrazione',
        description: "Annie scaglia una palla di fuoco intrisa di mana, infliggendo danni e rimborsando il costo in mana se distrugge il bersaglio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/JT8eu1q.png",
        letter: 'W',
        title: 'Incenerimento',
        description: "Annie lancia un cono di fuoco rovente, infliggendo danni a tutti i nemici nell'area."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/BBLfuEQ.png",
        letter: 'E',
        title: 'Scudo pirico',
        description: "Conferisce ad Annie e Tibbers percentuali aumentati di resistenza ai danni e danneggia i nemici che attaccano con attacchi base."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/gVE94wN.png",
        letter: 'R',
        title: 'Evocazione: Tibbers',
        description: "Annie ordina al suo orso Tibbers di prender vita, infliggendo danni a tutte le unità nell'area. Tibbers può attaccare e brucia anche i nemici che stanno vicino a lui."
    })
];

//creazione skills Xayah
var xayahSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/IPAieWY.png",
        letter: 'Passiva',
        title: 'Tagli netti',
        description: "Dopo che Xayah usa un'abilità, i suoi successivi attacchi base colpiscono tutti i nemici sul loro percorso, lasciando piume che può richiamare verso di sé."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/SgpBX7L.png",
        letter: 'Q',
        title: 'Doppia piuma',
        description: "Xayah lancia due piume che infliggono danni e lasciano piume che può richiamare."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/RS7UjNH.png",
        letter: 'W',
        title: 'Piumaggio letale',
        description: "Xayah crea una tempesta di lame che aumenta la sua velocità d'attacco base e i danni, oltre a conferirle del movimento se attacca un campione."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/DojrIyy.png",
        letter: 'E',
        title: 'Incantapiume',
        description: "Xayah richiama a sé le piume che ha lasciato, infliggendo danni e immobilizzando i nemici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/zlRlGct.png",
        letter: 'R',
        title: 'Tumulto di piume',
        description: "Xayah salta e diventa non bersagliabile, per poi lanciare una raffica di daghe le quali lasciano piume che può richiamare."
    })
];

//creazione skills Rakan
var rakanSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/NsC2ACf.png",
        letter: 'Passiva',
        title: 'Manto piumato',
        description: "Rakan ottiene periodicamente uno scudo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/xB7a6Qz.png",
        letter: 'Q',
        title: 'Piuma incantata',
        description: "Scaglia una piuma magica che infligge danni magici. Colpire un campione o un mostro epico permette a Rakan di curare i suoi alleati."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/teK6YVd.png",
        letter: 'W',
        title: 'Ingresso trionfante',
        description: "Scatta verso una posizione, lanciando in aria i nemici all'arrivo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/R3l4dr3.png",
        letter: 'E',
        title: 'Danza di guerra',
        description: "Vola da un campione alleato, conferendogli uno scudo. Può essere rilanciata gratuitamente entro un breve periodo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/zkpph3t.png",
        letter: 'R',
        title: 'Toccata e fuga',
        description: "Ottiene velocità di movimento, ammalia e infligge danni magici ai nemici toccati."
    })
];

//creazione skills Ekko
var ekkoSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/Kw72wlQ.png",
        letter: 'Passiva',
        title: 'Risonanza del Motore-Z',
        description: "Il Motore Zero di Ekko carica le sue abilità e gli attacchi di energia temporale. Il terzo attacco infligge danni bonus."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/D8kKw0R.png",
        letter: 'Q',
        title: 'Cronodisco',
        description: "Ekko lancia una granata temporale che esplode, creando un campo di distorsione temporale. Dopo poco la granata si riavvolge e torna da Ekko."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/nksFfnZ.png",
        letter: 'W',
        title: 'Convergenza parallela',
        description: "Ekko divide la linea temporale, creando un'anomalia dopo pochi secondi che rallenta i nemici al suo interno."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/M68rtst.png",
        letter: 'E',
        title: 'Salto fasico',
        description: "Ekko esegue una manovra evasiva mentre carica il suo Motore-Z. Il suo prossimo attacco infligge danni bonus e distorce la realtà, teletrasportandolo verso il suo bersaglio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/EiKJp7e.png",
        letter: 'R',
        title: 'Salto temporale',
        description: "Ekko distrugge la sua linea temporale, diventando non bersagliabile e tornando indietro nel tempo in un momento più favorevole."
    })
];

//creazione skills Poppy
var poppySkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/1PKes5k.png",
        letter: 'Passiva',
        title: 'Ambasciatrice di ferro',
        description: "Poppy lancia il suo brocchiero, ottenendo gittata e danni magici bonus."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/KY2kR3W.png",
        letter: 'Q',
        title: 'Shock martellante',
        description: "Poppy colpisce con il martello, infliggendo danni e creando una zona che rallenta i nemici ed esplode dopo un periodo di tempo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/APfWhgO.png",
        letter: 'W',
        title: 'presenza ferrea',
        description: "Poppy blocca gli scatti dei nemici intorno a lei e ottiene velocità di movimento."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/qdoIgfG.png",
        letter: 'E',
        title: 'Carica eroica',
        description: "Poppy scatta verso il bersaglio e lo respinge. Se il bersaglio viene spinto contro un muro, rimane stordito."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/djoiGCS.png",
        letter: 'R',
        title: 'Verdetto del custode',
        description: "Poppy canalizza un colpo di martello che respinge i nemici molto indietro."
    })
];

//creazione skills Galio
var galioSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/fr2XwQ0.png",
        letter: 'Passiva',
        title: 'Distruzione del colosso',
        description: "Ogni manciata di secondi, gli attacchi base di Galio infliggono danni magici bonus in un'area."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/QhkwIIK.png",
        letter: 'Q',
        title: 'Venti di guerra',
        description: "Galio spara due raffiche di vento che convergono in un grande tornado."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/ykwaAQd.png",
        letter: 'W',
        title: 'Scudo di Durand',
        description: "Galio carica una posizione difensiva, muovendosi lentamente. Al rilascio, provoca e danneggia i nemici nelle vicinanze."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/AS3f2VV.png",
        letter: 'E',
        title: 'Pugno della giustizia',
        description: "Galio fa un passo indietro e carica, lanciando in aria il primo campione nemico che incontra."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Sw2LaxZ.png",
        letter: 'R',
        title: "Entrata dell'eroe",
        description: "Galio conferisce riduzione danni a un alleato. Dopo un breve lasso di tempo Galio colpisce la posizione originale dell'alleato, lanciando in aria i nemici nelle vicinanze."
    })
];

//creazione skills Zac
var zacSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/25UADMz.png",
        letter: 'Passiva',
        title: 'Divisione cellulare',
        description: "Quando subisce danni fatali, Zac si divide in 4 masse che cercano di ricombinarsi. Se le masse sono intatte, torna in vita con una quantità di salute proporzionale a quella delle masse sopravvissute."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/baIsbzx.png",
        letter: 'Q',
        title: 'Colpi allungati',
        description: "Zac allunga un braccio, afferrando un nemico. Attaccare un nemico diverso gli fa lanciare i bersagli uno contro l'altro."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/39FRdKR.png",
        letter: 'W',
        title: 'Materia instabile',
        description: "Il corpo di Zac erutta, danneggiando i nemici vicini."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/9q1zEu1.png",
        letter: 'E',
        title: 'Catapulta elastica',
        description: "Zac attacca le braccia al terreno e si tende all'indietro, per poi lanciarsi in avanti."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/hJzzJEc.png",
        letter: 'R',
        title: 'Boing!',
        description: "Zac si appiattisce, diventa immune agli effetti di controllo e rallenta i nemici sopra di lui. Quando decide di andarsene, rimbalzando, risucchia i nemici sopra di lui, portandoli a fare un giro."
    })
];

//creazione skills Lux
var luxSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/rIjsEvY.png",
        letter: 'Passiva',
        title: 'Illuminazione',
        description: "Gli incantesimi offensivi di Lux caricano il bersaglio di energia per 6 secondi. Il prossimo attacco di Lux incendia l'energia, infliggendo danni magici bonus."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/CrCzgTW.png",
        letter: 'Q',
        title: 'Prigione luminosa',
        description: "Lux rilascia una sfera di luce che può intrappolare e infliggere danni fino ad un massimo di due unità nemiche."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/1KngXv6.png",
        letter: 'W',
        title: 'Barriera prismatica',
        description: "Lux lancia la sua bacchetta e distorce la luce intorno a qualsiasi bersaglio amico che tocca, proteggendolo dai danni nemici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Kq2Pog1.png",
        letter: 'E',
        title: 'Singolarità lucente',
        description: "Spara in un'area un'anomalia di luce distorta, che rallenta i nemici nelle vicinanze. Lux può farla detonare per danneggiare i nemici nell'area dell'effetto."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/TgEhMAF.png",
        letter: 'R',
        title: 'Scintilla finale',
        description: "Dopo aver raccolto le energie, Lux spara un raggio di luce che infligge danni a tutti i bersagli nell'area."
    })
];

//creazione skills Zoe
var zoeSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/KOw1rm6.png",
        letter: 'Passiva',
        title: 'Più scintille',
        description: "Dopo aver lanciato un'abilità, il prossimo attacco base di Zoe infligge danni magici bonus."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/HWDlGde.png",
        letter: 'Q',
        title: 'Stella vagante',
        description: "Zoe spara un proiettile che può deviare durante il volo. Infligge più danni in base a quanto vola in linea retta."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/SVGpCiK.png",
        letter: 'W',
        title: 'Furto magico',
        description: "Zoe può raccogliere ciò che resta degli incantesimi dell'evocatore e dei lanci degli oggetti attivi e lanciarli nuovamente. Quando lancia un incantesimo dell'evocatore ottiene 3 proiettili che vengono sparati al bersaglio più vicino."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/HqvX7qT.png",
        letter: 'E',
        title: 'Bolla della nanna',
        description: "Fa diventare sonnolento il bersaglio, per poi farlo addormentare. La prima fonte di danni che interrompe il sonno è raddoppiata, ma con un limite massimo di danni."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/yqVk1Un.png",
        letter: 'R',
        title: 'Tuffo nel portale',
        description: "Zoe si teletrasporta in una posizione vicina per un secondo. Poi si riteletrasporta indietro."
    })
];

//creazione skills Rengar
var rengarSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/aY6gG3W.png",
        letter: 'Passiva',
        title: 'Predatore elusivo',
        description: "Quando si trova nell'erba alta, Rengar balza sul suo bersaglio con l'attacco base."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/3aYBEqB.png",
        letter: 'Q',
        title: 'Barbarie',
        description: "Al prossimo attacco Rengar infilza brutalmente il bersaglio infliggendogli danni bonus."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/v5Ja0Pj.png",
        letter: 'W',
        title: 'Ruggito di battaglia',
        description: "Rengar lancia un ruggito di battaglia, infliggendo danni ai nemici e guarendo parte degli ultimi danni subiti."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/FWHDWMk.png",
        letter: 'E',
        title: 'Colpo di bola',
        description: "Rengar lancia una bola, rallentando il primo bersaglio colpito per un breve periodo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/v2Cd8oa.png",
        letter: 'R',
        title: 'Brivido della caccia',
        description: "L'istinto da predatore di Rengar prende il sopravvento, mimetizzandolo e rivelando il campione nemico più vicino entro un ampio raggio intorno a lui. Durante Brivido della caccia, Rengar ottiene velocità di movimento e può balzare sul nemico individuato per un colpo critico garantito, anche se non è nell'erba alta."
    })
];

//creazione skills Nami
var namiSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/2OFES2d.png",
        letter: 'Passiva',
        title: 'Maree dirompenti',
        description: "Quando le abilità di Nami colpiscono un campione alleato, guadagna velocità di movimento per un breve periodo di tempo."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/Eu2aINM.png",
        letter: 'Q',
        title: 'Prigione acquatica',
        description: "Invia una bolla verso un'area bersaglio, infliggendo danni e stordendo i nemici all'impatto."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/mZFSn0t.png",
        letter: 'W',
        title: 'Flusso e riflusso',
        description: "Emette un getto d'acqua che rimbalza tra campioni alleati e nemici, curando gli alleati e danneggiando i nemici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/AXmhddP.png",
        letter: 'E',
        title: 'Benedizione delle maree',
        description: "Potenzia un campione alleato per una breve durata. Gli attacchi base dell'alleato infliggono danni magici bonus e rallentano il bersaglio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/rRl22c2.png",
        letter: 'R',
        title: 'Mareggiata',
        description: "Evoca un'immensa mareggiata che sbalza in aria i nemici, li rallenta e li danneggia. Gli alleati colpiti ottengono il doppio dell'effetto di Maree dirompenti."
    })
];

//creazione skills Maokai
var maokaiSkills = [
    new Skill({
        imageSrc: "https://i.imgur.com/mYH1czR.png",
        letter: 'Passiva',
        title: 'Assorbi magia',
        description: "Gli attacchi base curano Maokai con una ricarica moderata."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/ZGyl8WQ.png",
        letter: 'Q',
        title: 'Legnata',
        description: "Maokai respinge i nemici nelle vicinanze con un'onda d'urto, infliggendo danni magici e rallentando i nemici."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/6fpYnoT.png",
        letter: 'W',
        title: 'Avanzata turbinante',
        description: "Maokai si contorce in una massa di radici in movimento. Diventa non bersagliabile e scatta verso il bersaglio. All'arrivo, immobilizza il bersaglio."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/tFhISL4.png",
        letter: 'E',
        title: 'Lancio verde',
        description: "Maokai lancia un germoglio che sorveglia l'area bersaglio. Ha più effetto nell'erba alta."
    }),
    new Skill({
        imageSrc: "https://i.imgur.com/yARXlY2.png",
        letter: 'R',
        title: 'Presa della natura',
        description: "Maokai evoca un enorme muro di rovi e spine che avanza lentamente, danneggiando e immobilizzando i nemici che incontra."
    })
];

/*
//creazione skills 
var Skills = [
    new Skill({
        imageSrc: "",
        letter: 'Passiva',
        title: '',
        description: ""
    }),
    new Skill({
        imageSrc: "",
        letter: 'Q',
        title: '',
        description: ""
    }),
    new Skill({
        imageSrc: "",
        letter: 'W',
        title: '',
        description: ""
    }),
    new Skill({
        imageSrc: "",
        letter: 'E',
        title: '',
        description: ""
    }),
    new Skill({
        imageSrc: "",
        letter: 'R',
        title: '',
        description: ""
    })
];
*/


var champions = [];


Veigar = new Champion({
    imagePath: "https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/Veigar_Splash_Tile_0.jpg",
    name: 'Veigar',
    title: "Il piccolo genio del male",
    role: "Mago",
    description: "Maestro della stregoneria oscura, Veigar ha accolto poteri ai quali pochi mortali osano avvicinarsi. Uno spirito libero di Bandle City, ha superato i limiti della magia yordle rivolgendosi a testi arcani rimasti nascosti per millenni. Veigar, creatura testarda affascinata dai misteri dell'universo, viene spesso sottovalutato, ma, nonostante si consideri malvagio, possiede un codice morale che lo porta a mettere in discussione le sue profonde motivazioni.",
    price: 1350,
    skills: veigarSkills
});
champions.push(Veigar);

Katarina = new Champion({
    imagePath: "https://i.imgur.com/XCqT8gK.jpg",
    name: 'Katarina',
    title: "La lama sinistra",
    role: "Assassino",
    description: "Katarina è un'assassina noxiana di altissimo livello, veloce nel giudizio e letale in combattimento. È la figlia maggiore del leggendario generale Du Couteau e si è fatta conoscere uccidendo rapidamente i suoi ignari nemici. La sua ambizione l'ha spinta verso i bersagli più protetti, anche al costo di mettere a rischio i suoi alleati. A prescindere dalla missione, Katarina compie sempre il suo dovere in un tripudio di lame.",
    price: 3150,
    skills: katarinaSkills
});
champions.push(Katarina);


Talon = new Champion({
    imagePath: "https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/Talon_Splash_Tile_0.jpg",
    name: 'Talon',
    title: "L'ombra della lama",
    role: "Assassino",
    description: "Talon è la lama dell'oscurità, uno spietato assassino capace di colpire senza preavviso e fuggire prima che venga dato l'allarme. Si è fatto una reputazione per le violente strade di Noxus, dove per sopravvivere è stato costretto a rubare, combattere e uccidere. Adottato dalla famigerata famiglia Du Couteau, porta avanti la sua attività omicida al servizio dell'impero assassinando capi, capitani ed eroi nemici... oltre a ogni noxiano abbastanza sciocco da scatenare l'ira dei suoi padroni.",
    price: 4800,
    skills: talonSkills
});
champions.push(Talon);


MissFortune = new Champion({
    imagePath: "https://i.imgur.com/5RpBl17.jpg",
    name: 'Miss Fortune',
    title: "La cacciatrice di taglie",
    role: "Tiratore",
    description: "Sarah Fortune, una spietata capitana di Bilgewater nota per la sua bellezza e per la sua determinazione, si staglia in mezzo ai criminali che popolano la città portuale. Da bambina ha visto il re dei pirati Gangplank massacrare la sua famiglia, un atto che avrebbe vendicato anni dopo, facendo saltare la sua nave mentre lui era ancora a bordo. Chi la sottovaluta è destinato a trovarsi davanti a un nemico pericoloso e imprevedibile... e con tutta probabilità a un paio di proiettili nello stomaco.",
    price: 3150,
    skills: missfortuneSkills
});
champions.push(MissFortune);


Jhin = new Champion({
    imagePath: "https://i.imgur.com/7hAatJk.jpg",
    name: 'Jhin',
    title: "Il virtuoso",
    role: "Tiratore",
    description: "Jhin è un criminale psicopatico e meticoloso che vede la morte come un'opera d'arte. In passato fu prigioniero dal popolo di Ionia, ma fu liberato da uomini misteriosi appartenenti al consiglio decisionale di Ionia, diventando l'assassino della congrega. Usa la sua arma come pennello per creare opere artistiche dalle sfumature brutali, terrorizzando le sue vittime e gli spettatori. Avverte un perfido piacere quando sale sul palcoscenico del suo teatro degli orrori, l'occasione ideale per mandare uno dei suoi messaggi più forti: terrore.",
    price: 6300,
    skills: jhinSkills
});
champions.push(Jhin);

Jinx = new Champion({
    imagePath: "https://i.imgur.com/nqmxqR5.jpg",
    name: 'Jinx',
    title: "La mina vagante",
    role: "Tiratore",
    description: "Jinx è una criminale impulsiva e maniacale di Zaun, che vive per seminare il panico senza pensare alle conseguenze. Con un arsenale di armi letali, scatena le esplosioni più forti e spettacolari per poi lasciarsi alle spalle una scia di caos. Jinx odia la noia e porta felicemente con sé il suo pandemonio personale, ovunque vada.",
    price: 6300,
    skills: jinxSkills
});
champions.push(Jinx);


Caitlyn = new Champion({
    imagePath: "https://i.imgur.com/Ed7mh6F.jpg",
    name: 'Caitlyn',
    title: "Lo sceriffo di Piltover",
    role: "Tiratore",
    description: "Caitlyn, nota come la migliore agente di Piltover, è anche la migliore opportunità che ha la città di liberarsi dai suoi sfuggenti criminali. Spesso è in coppia con Vi, come contrappunto alla natura impetuosa della sua partner. Anche se ha un fucile hextech unico al mondo, la vera arma segreta di Caitlyn è un intelletto superiore, che le permette di tendere elaborati tranelli ai criminali così stolti da agire nella città del progresso.",
    price: 4800,
    skills: caitlynSkills
});
champions.push(Caitlyn);


Annie = new Champion({
    imagePath: "https://i.imgur.com/JbK7Svh.jpg",
    name: 'Annie',
    title: "La bambina oscura",
    role: "Mago",
    description: "Pericolosa e incredibilmente precoce, Annie è una maga bambina con immensi poteri di piromanzia. Anche nell'ombra delle montagne a nord di Noxus, è una bizzarria magica. La sua naturale affinità col fuoco si è manifestata sin dai suoi primi giorni con imprevedibili esplosioni di emozioni, che ha presto imparato a controllare sotto forma di trucchetti. Il suo trucchetto preferito è l'evocazione del suo adorato orsacchiotto, Tibbers, un protettore incendiario. Persa nell'eterna innocenza della sua infanzia, Annie vaga nelle foreste più buie, in cerca di qualcuno con cui giocare.",
    price: 450,
    skills: annieSkills
});
champions.push(Annie);


Xayah = new Champion({
    imagePath: "https://i.imgur.com/nUD2D3M.jpg",
    name: 'Xayah',
    title: "La ribelle",
    role: "Tiratore",
    description: "Volubile e affascinante, Rakan è un famigerato piantagrane vastayano, nonché il più grande danzatore guerriero mai vissuto della tribù di Lhotlan. Per gli umani dell'altopiano di Ionia, il suo nome è da tempo sinonimo di feste selvagge, musica anarchica e danze fuori controllo. Pochi sospettano che questo energico showman errante è anche il compagno della ribelle Xayah e che è dedito alla sua causa",
    price: 6300,
    skills: xayahSkills
});
champions.push(Xayah);


Rakan = new Champion({
    imagePath: "https://i.imgur.com/KH0lGJz.jpg",
    name: 'Rakan',
    title: "L'ammaliatore",
    role: "Supporto",
    description: "Letale e precisa, Xayah è una rivoluzionaria vastayana che lotta per salvare il suo popolo. Con l'astuzia, la velocità e le sue affilatissime piume, stronca chiunque cerchi di ostacolarla. Xayah lotta al fianco del suo compagno e amante, Rakan, per proteggere la sua tribù in declino e riportare la sua razza alla sua idea di antica gloria.",
    price: 6300,
    skills: rakanSkills
});
champions.push(Rakan);


Ekko = new Champion({
    imagePath: "https://i.imgur.com/bmRAISw.jpg",
    name: 'Ekko',
    title: "Il viaggiatore del tempo",
    role: "Assassino",
    description: "Ekko è un prodigio che viene dalle pericolose strade di Zaun, in grado di manipolare il tempo per volgere qualsiasi situazione a proprio vantaggio. Usando la sua invenzione, il Motore-Zero, esplora le varie possibilità della realtà per costruirsi il momento perfetto. Per quanto sia uno spirito libero, se uno dei suoi amici è in pericolo è pronto a tutto per difenderlo. A chi non conosce le sue abilità, Ekko sembra in grado di fare l'impossibile, con facilità, sempre al primo tentativo.",
    price: 6300,
    skills: ekkoSkills
});
champions.push(Ekko);

Poppy = new Champion({
    imagePath: "https://i.imgur.com/xx1FPfd.jpg",
    name: 'Poppy',
    title: "La custode del martello",
    role: "Tank",
    description: "A Runeterra non mancano i valenti campioni, ma pochi hanno la determinazione di Poppy. Con il leggendario martello di Orlon, un'arma grande il doppio di lei, questa risoluta yordle ha passato un numero enorme di anni alla ricerca segreta del favoleggiato 'Eroe di Demacia' che si dice esserne il legittimo proprietario. Fino ad allora affronta la battaglia guidata dal suo senso del dovere, respingendo con ogni colpo i nemici del regno.",
    price: 450,
    skills: poppySkills
});
champions.push(Poppy);

Galio = new Champion({
    imagePath: "https://i.imgur.com/ycRJYoe.jpg",
    name: 'Galio',
    title: "Il colosso",
    role: "Tank",
    description: "Fuori dalla scintillante città di Demacia, il colosso di pietra Galio monta una guardia costante. Costruito come protezione dai maghi nemici, è in grado di rimanere immobile per intere decadi, fino a che non si manifesta una presenza magica tale da riportarlo in vita. Quando si attiva, Galio non perde tempo e assapora il brivido del combattimento e il raro onore di difendere i suoi compatrioti. I suoi trionfi hanno sempre un retrogusto amaro, poiché la magia che distrugge è anche la fonte della sua rianimazione, e ogni vittoria lo fa tornare al suo sonno eterno.",
    price: 3150,
    skills: galioSkills
});
champions.push(Galio);

Zac = new Champion({
    imagePath: "https://i.imgur.com/RhxJTEd.jpg",
    name: 'Zac',
    title: "L'arma segreta",
    role: "Tank",
    description: "Zac è il risultato di una fuga di materiali tossici fuoriuscita da una tubatura chemtech e accumulatisi in una caverna isolata nel Sump di Zaun. Nonostante queste umili origini, Zac si è evoluto da massa informe primordiale a creatura senziente che abita nelle tubature della città. Di tanto in tanto emerge per aiutare gli indifesi o per ricostruire le infrastrutture danneggiate di Zaun.",
    price: 6300,
    skills: zacSkills
});
champions.push(Zac);

Lux = new Champion({
    imagePath: "https://i.imgur.com/uRwdRLl.jpg",
    name: 'Lux',
    title: "La signora della luce",
    role: "Mago",
    description: "Luxanna Crownguard viene da Demacia, un reame isolato dove le capacità magiche vengono viste con timore e sospetto. Capace di piegare la luce alla sua volontà, è cresciuta nel timore, costretta a tenere segreto il suo potere per mantenere la reputazione della sua famiglia. Nonostante questo, la resistenza e l'ottimismo di Lux l'hanno portata ad accettare le sue capacità e ora le utilizza in segreto al servizio della sua patria.",
    price: 3150,
    skills: luxSkills
});
champions.push(Lux);

Rengar = new Champion({
    imagePath: "https://i.imgur.com/wcWDnjC.jpg",
    name: 'Rengar',
    title: "Il cacciatore ferale",
    role: "Assassino",
    description: "Rengar è un pericoloso cacciatore vastayano che vive per il brivido di trovare e uccidere le creature più pericolose. Gira il mondo in cerca delle belve più feroci, in particolare di Kha'Zix, la creatura del Vuoto che gli ha cavato un occhio. Rengar dà la caccia alle sue prede non per il cibo o per la gloria, ma per la bellezza della caccia stessa.",
    price: 4800,
    skills: rengarSkills
});
champions.push(Rengar);

Nami = new Champion({
    imagePath: "https://i.imgur.com/aWfkz5V.jpg",
    name: 'Nami',
    title: "Lo spirito delle maree",
    role: "Supporto",
    description: "Nami, una risoluta vastaya del mare, fu la prima della tribù Marai a lasciare l'acqua per avventurarsi sulla terraferma, quando venne infranto l'antico patto con i targoniani. Costretta dagli eventi, ha deciso di completare da sola il rituale sacro per assicurare la sicurezza del suo popolo. Nel caos di questa nuova era, Nami affronta un futuro incerto con coraggio e determinazione, utilizzando la sua asta dello Spirito delle maree per evocare la forza degli oceani.",
    price: 4800,
    skills: namiSkills
});
champions.push(Nami);

Maokai = new Champion({
    imagePath: "https://i.imgur.com/0YlAjPX.jpg",
    name: 'Maokai',
    title: "Il treant demoniaco",
    role: "Tank",
    description: "Maokai è un rabbioso e imponente treant che combatte gli orrori innaturali delle Isole Ombra. Venne trasformato in una forza vendicativa dopo che un cataclisma magico distrusse la sua terra natia, sopravvivendo alla non-morte solo grazie alle acque vitali infuse nel suo legno. Maokai era un pacifico spirito della natura, ma oggi combatte con ferocia per scacciare il flagello della non-morte dalle Isole Ombra e riportarle al loro antico splendore.",
    price: 4800,
    skills: maokaiSkills
});
champions.push(Maokai);

Zoe = new Champion({
    imagePath: "https://i.imgur.com/fmeEG6z.jpg",
    name: 'Zoe',
    title: "L'incarnazione del crepuscolo",
    role: "Mago",
    description: "Incarnazione di malizia, immaginazione e cambiamento, Zoe è la messaggera cosmica di Targon. La sua comparsa è portatrice di avvenimenti in grado di plasmare mondi interi. La sua semplice presenza, infatti, a volte può distorcere gli equilibri metafisici alla base della realtà fino a causare cataclismi, senza alcuna intenzione malevola. Ciò può forse spiegare la noncuranza con la quale Zoe assolve ai suoi doveri, cosa che le permette di dedicare tempo a giocare, ingannare i mortali o più generalmente divertirsi. Incontrare Zoe può essere un'epifania di gioia vitale, ma con un significato nascosto e spesso molto pericoloso.",
    price: 6300,
    skills: zoeSkills
});
champions.push(Zoe);

/*
new Champion({
    imagePath: "",
    name: '',
    title: "",
    role: "",
    description: "",
    price: ,
    skills: 
}),
*/

Pyke = new Champion({
    imagePath: "https://i.imgur.com/QE2SBla.jpg",
    name: 'Pyke',
    title: "Lo squartatore del porto",
    role: "Supporto",
    description: "Abbandonato dal suo equipaggio ai leviatani delle profondità, Pyke è affogato, ma non è rimasto morto. Anni dopo, il famigerato revenant noto come lo squartatore del porto insanguinato si aggira per i Moli del sangue, spuntando nomi da una lista che sembra infinita. Aspetta... tu hai un'aria familiare...",
    price: 7800,
    skills: pykeSkills
});
champions.push(Pyke);

Nasus = new Champion({
    imagePath: "https://i.imgur.com/f4hHJMs.jpg",
    name: 'Nasus',
    title: "Il custode delle dune",
    role: "Combattente",
    description: "Nasus è un imponente essere Asceso con il volto da sciacallo originario dell'antica Shurima, una figura eroica che la gente del deserto considera un semidio. Estremamente intelligente, era un guardiano della conoscenza e un eccelso stratega il cui buon senso guidò per secoli l'antico impero di Shurima verso la grandezza. In seguito alla caduta dell'impero, andò in esilio per sua scelta, diventando poco più che una leggenda. Ora che l'antica città di Shurima è risorta, Nasus è tornato, determinato a impedire un'altra simile sorte.",
    price: 1350,
    skills: nasusSkills
});
champions.push(Nasus);

Kaisa = new Champion({
    imagePath: "https://i.imgur.com/KzYd5Z1.jpg",
    name: "Kai'Sa",
    title: "Figlia del Vuoto",
    role: "Tiratore",
    description: "Reclamata dal Vuoto quando era soltanto una bambina, Kai'Sa è riuscita a sopravvivere con la sua incredibile tenacia e la sua forza di volontà. L'esperienza l'ha resa una cacciatrice letale, nonché la portatrice di un destino che molte delle sue prede preferirebbero non scoprire. Essendo entrata in una difficile simbiosi con un carapace del Vuoto, dovrà presto decidere se perdonare i mortali che la considerano un mostro, per affrontare insieme l'oscurità... o se dimenticarli, mentre il Vuoto consuma tutto ciò che si è lasciata alle spalle.",
    price: 6300,
    skills: kaisaSkills
});
champions.push(Kaisa);

Tristana = new Champion({
    imagePath: "https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/Tristana_Splash_Tile_0.jpg",
    name: 'Tristana',
    title: "L'artigliere degli Yordle",
    role: "Tiratore",
    description: "Mentre molti altri yordle si dedicano alle scoperte, alle invenzioni o agli intrighi, Tristana è stata sempre affascinata dalle avventure dei grandi guerrieri. Ha sentito molto parlare di Runeterra, delle sue fazioni e delle sue guerre, e ha pensato di essere anche lei degna di divenire materia delle leggende. Dopo aver messo piede nel mondo per la prima volta, ha imbracciato il suo fidato cannone Boomer e ora si lancia in battaglia con coraggio e ottimismo.",
    price: 1350,
    skills: tristanaSkills
});
champions.push(Tristana);

Thresh = new Champion({
    imagePath: "https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/Thresh_Splash_Tile_0.jpg",
    name: 'Thresh',
    title: "Il carceriere",
    role: "Supporto",
    description: "Sadico e astuto, Thresh è uno spirito inquieto e ambizioso delle Isole Ombra. Un tempo custode di innumerevoli arcani segreti, ha cercato un potere più grande della vita e della morte e ora si alimenta tormentando e uccidendo il prossimo con spietatezza e creatività. Le sue vittime soffrono ben oltre la morte, poiché Thresh infligge l'agonia sulle loro anime, imprigionandole nella sua empia lanterna per torturarle per l'eternità.",
    price: 6300,
    skills: threshSkills
});
champions.push(Thresh);

Garen = new Champion({
    imagePath: "https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/Garen_Splash_Tile_0.jpg",
    name: 'Garen',
    title: "La potenza di Demacia",
    role: "Combattente",
    description: "Un guerriero nobile e orgoglioso, Garen combatte come membro dell'Indomita avanguardia. I suoi compagni lo stimano e i nemici lo rispettano, anche perché è il rampollo della prestigiosa famiglia Crownguard, con il compito di difendere Demacia e i suoi ideali. Protetto da un'armatura resistente alla magia e armato di una possente spada a due mani, Garen è pronto ad affrontare maghi e stregoni sul campo di battaglia, in un vero e proprio tornado d'acciaio.",
    price: 450,
    skills: garenSkills
});
champions.push(Garen);

Irelia = new Champion({
    imagePath: "https://i.imgur.com/WM2uxhI.jpg",
    name: 'Irelia',
    title: "La danzatrice delle lame",
    role: "Combattente",
    description: "L'occupazione noxiana di Ionia ha creato molti eroi, ma nessuno più improbabile della giovane Irelia di Navori. Addestrata nelle antiche danze della sua provincia, ha adattato la sua arte alla guerra, utilizzando le eleganti ed esperte movenze per far levitare una serie di letali lame. Dopo aver dimostrato il suo valore di guerriera, è stata nominata capo e simbolo della resistenza, e si dedica ancora oggi alla protezione della sua patria.",
    price: 4800,
    skills: ireliaSkills
});
champions.push(Irelia);

Yasuo = new Champion({
    imagePath: "https://i.imgur.com/3DosUt7.jpg",
    name: 'Yasuo',
    title: "Il reietto",
    role: "Combattente",
    description: "Un determinato abitante di Ionia, Yasuo è un agile spadaccino che usa l'aria come arma contro i suoi avversari. Giovane, abile e fiero, è stato accusato ingiustamente di aver ucciso il suo maestro: incapace di dimostrare la sua innocenza, è stato costretto a uccidere il suo stesso fratello per difendersi. Anche dopo la scoperta del vero assassino del suo maestro, Yasuo non è riuscito a liberarsi del senso di colpa e ora vaga per la sua terra natia con il vento a guidare la sua lama.",
    price: 6300,
    skills: yasuoSkills
});
champions.push(Yasuo);

Ashe = new Champion({
    imagePath: "https://i.imgur.com/iXo6dyK.jpg",
    name: 'Ashe',
    title: "L'arciere dei ghiacci",
    role: "Tiratore",
    description: "Ashe è la madre guerriera, figlia del gelo, della tribù degli Avarosani, che comanda l'orda più popolosa del nord. Stoica, intelligente e idealista, ma al tempo stesso inquieta nel suo ruolo di leader, sfrutta la magia arcana della sua stirpe per brandire un arco di Vero Ghiaccio. Ritenuta la reincarnazione della mitologica Avarosa dal suo popolo, Ashe spera di riunire il Freljord riconquistando le antiche terre tribali.",
    price: 450,
    skills: asheSkills
});
champions.push(Ashe);


/*
var done = 0;
for (var i = 0; i < champions.length; i++) {
    champions[i].save(function(err, result) {
        done++;
        if (done === champions.length) {
            exit();
        }
    });
}
*/
function exit() {
    mongoose.disconnect();
}