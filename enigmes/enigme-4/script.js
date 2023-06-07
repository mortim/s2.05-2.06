let printCharsWithDelay = (html_tag, text) => {
    textArr = text.split('');
    let id = setInterval(() => {
        if(textArr.length == 0) {
            clearInterval(id);
        } else {
            html_tag.innerHTML += textArr[0];
            textArr = textArr.slice(1);
        }
    }, 40);
}

let executeWithDelay = (func, delay) => {
    let id = setInterval(() => {
        func();
        clearInterval(id);
    }, delay);
}

let delay = 2300;

let bootText = document.querySelector("#boot-text");

printCharsWithDelay(bootText, "Démarrage du système d'exploitation Debian GNU/Linux...");

executeWithDelay(() => {
    bootText.appendChild(document.createElement("br"));
}, delay);

let neofetch = document.querySelector("#neofetch");
let debian_ascii_arr = [
    "       _,met$$$$$gg.  visiteur@debian",
    "   ,g$$$$$$$$$$$$$$$P.           ------------",
    " ,g$$P\"     \"\"\"Y$$.\".            OS : Debian GNU/Linux 11 (bullseye) x86_64",
    ",$$P'              `$$$.         Kernel: 5.10.0-21-amd64",
    ",$$P       ,ggs.     `$$b:       Uptime: 2 secs",
    "`d$$'     ,$P\"'   .    $$$       Shell: bash 5.1.40",
    " $$P      d$'     ,    $$P",
    " $$:      $$.   -    ,d$$",
    " $$;      Y$b._   _,d$P",
    " Y$$.    `.`\"Y$$$$P\"'",
    " `$$b      \"-.__         ",
    "  `Y$$ ",
    "   `Y$$. ",
    "     `$$b. ",
    "       `Y$$b. ",
    "          `\"Y$b._",
    "              `\"\"\" "
]

for(let i = 0; i < 17; i++) {
    delay = delay+100;

    executeWithDelay(() => {
        neofetch.innerHTML += debian_ascii_arr[i];
    }, delay);

    executeWithDelay(() => {
        neofetch.appendChild(document.createElement("br"));
    }, delay+100);
}

let shell = document.querySelector("#shell");
let previousOut = document.querySelector("#previousOutput");
let nextOut = document.querySelector("#nextOutput");

let userinfo = document.createElement("label");
userinfo.innerHTML = 'visiteur@debian:~ ';
userinfo.setAttribute("class", "green-color");

let prompt = document.createElement("input");
prompt.setAttribute("type", "text");
prompt.setAttribute("class", "prompt-style");

shell.appendChild(userinfo);
shell.appendChild(prompt);

delay = delay+100;
executeWithDelay(() => {
    printCharsWithDelay(previousOut, "Grâce aux commandes shell docummentés via la commande 'help', tentez de résoudre cette éngime..");
}, delay);

delay = delay+4000;
executeWithDelay(() => {
    previousOut.appendChild(document.createElement("br"));
}, delay);

const r = new RegExp("unzip --password ([a-z]*) unzip_me\.zip");
const r2 = new RegExp("ssh --password ([a-zA-Z0-9]*) michel@98.156.250.12");
let unzipped = false;
let is_michel_machine = false;

prompt.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') {
        let unzip_password;
        let ssh_password;
        if(prompt.value.match(r) != null) {
            unzip_password = prompt.value.match(r)[1];
        } else if(prompt.value.match(r2) != null) {
            ssh_password = prompt.value.match(r2)[1];
        }

        switch(prompt.value.trim()) {
            case 'help':
                nextOut.innerHTML = `
- cat FILE : Affiche le contenu d'un fichier.
- ls : Liste les fichiers/répértoires du répertoire courant.
- ssh --password PASSWORD userinfo@host : Se connecter à une machine distante via le tunnel sécurisé SSH (avec un mot de passe à renseigner).
        - Pour se déconnecter de la session ssh, tapez la commande exit.
- unzip --password PASSWORD FILE : Décompresser une fichier zip (avec un mot de passe à renseigner).
- clear : Efface les précédentes sorties.
`;
                break;
            case 'clear':
                nextOut.innerHTML = '';
                previousOut.innerHTML = '';
                break
            case 'ls':
                if(is_michel_machine) {
                    nextOut.innerHTML = '<pre>reponse.txt';
                } else {
                    if(unzipped)
                    nextOut.innerHTML = '<pre>notes.txt  unzip_me.zip bruteforce<pre>';
                    else
                        nextOut.innerHTML = '<pre>notes.txt  unzip_me.zip<pre>';
                }
                
                break;
            case 'cat notes.txt':
                if(is_michel_machine) {
                    nextOut.innerHTML = "<pre>Le fichier n'existe pas...</pre>";
                } else {
                    nextOut.innerHTML = `<pre>
Je vous ait laissé le userinfo et l'hôte juste ici pour vous connecter à distance par ssh: michel@98.156.250.12

Cependant, le mot de passe a été perdu à jamais... Vous devez déchiffrez
le fichier decompressé, à l'intérieur il y a un programme de bruteforce de mot de passe concocté
par mes soins, vous pourrez ainsi cracker le mot de passe de la machine distante ;)

Son mode d'emploi est simple: bruteforce userinfo@host

Indice: Le mot de passe pour décompresser ce fichier zip est la réponse d'une autre énigme (EN MINUSCULE)...
<pre>
                `
                }
                break;

            case 'cat reponse.txt':
                if(is_michel_machine) {
                    nextOut.innerHTML = "<pre>Reponse de l'enigme: fsociety</pre>";
                } else {
                    nextOut.innerHTML = "<pre>Le fichier n'existe pas</pre>";
                }
                break;

            case 'exit':
                if(is_michel_machine) {
                    is_michel_machine = false;
                } else {
                    nextOut.innerHTML = "<pre>Vous ne pouvez pas quitter cette session...</pre>";
                }
                break;

            case 'unzip --password ' + unzip_password + ' unzip_me.zip':
                if(is_michel_machine) {
                    nextOut.innerHTML = "<pre>Le fichier n'existe pas...</pre>";
                } else {
                    if(unzip_password != 'ual') {
                        nextOut.innerHTML = "<pre>Le mot de passe est incorrect :/</pre>";
                    } else {
                        nextOut.innerHTML = "<pre>Mot de passe correct !</pre>";
                        executeWithDelay(() => {
                            printCharsWithDelay(previousOut, 'Décompression du fichier zip...');
                        }, 50);
                        executeWithDelay(() => {
                            previousOut.appendChild(document.createElement("br"));
                        }, 1350);
                        unzipped = true;
                    }
                }
                break;
            case 'bruteforce michel@98.156.250.12':
                if(is_michel_machine) {
                    nextOut.innerHTML = "<pre>Vous êtes déjà dans la machine de michel</pre>";
                } else {
                    if(unzipped) {
                        executeWithDelay(() => {
                            printCharsWithDelay(previousOut, 'Craquage du mot de passe...');
                        }, 50);
                        executeWithDelay(() => {
                            previousOut.appendChild(document.createElement("br"));
                        }, 3000);
                        executeWithDelay(() => {
                            printCharsWithDelay(previousOut, 'Le mot de passe est: HfJRkaDEQ4yhaH');
                        }, 3100);
                    } else {
                        nextOut.innerHTML = "<pre>La commande que avez tapé n'existe pas</pre>";
                    }
                }
                break;
            case 'ssh --password ' + ssh_password + ' michel@98.156.250.12':
                if(is_michel_machine) {
                    nextOut.innerHTML = "<pre>La commande ssh est interdite dans cette session...</pre>";
                } else {
                    if(ssh_password != 'HfJRkaDEQ4yhaH') {
                        nextOut.innerHTML = "<pre>Le mot de passe est incorrect :/</pre>";
                    } else {
                        executeWithDelay(() => {
                            printCharsWithDelay(previousOut, 'Connexion établie !');
                        }, 50);
                        executeWithDelay(() => {
                            previousOut.appendChild(document.createElement("br"));
                        }, 3000);
                        userinfo.innerHTML = 'michel@ubuntu:$ ';
                        is_michel_machine = true;
                    }
                }
                break;
            default:
                nextOut.innerHTML = "<pre>La commande que avez tapé n'existe pas ou comporte/manque des arguments inexistants/incorrects...</pre>";
                break;
        }
        previousOut.innerHTML += "<br>" + userinfo.innerHTML + prompt.value;
        if(!is_michel_machine) {
            userinfo.innerHTML = 'visiteur@debian:~ ';
        }
        previousOut.innerHTML += "<br>" + nextOut.innerHTML;
        nextOut.innerHTML = '';
        prompt.value = '';
    }
});

let body = document.querySelector('body');

let domWatch = new MutationObserver(e => {
    window.scrollTo(0, document.body.scrollHeight);
})

domWatch.observe(body, {childList: true, subtree: true});