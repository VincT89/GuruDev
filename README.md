### GuruDev

GuruDev è una piattaforma social full-stack ispirata a Medium (contenuti editoriali) e Instagram (interazioni social e chat realtime).

Gli utenti possono:

- scrivere post
- seguire altri utenti
- mettere like e commentare i post
- ricevere notifiche
- chattare in tempo reale (Socket.IO)
- esplorare contenuti tramite feed, ricerca e trend

## Stack Tecnologico

# Backend

1. Node.js
2. Express
3. MongoDB + Mongoose   
4. JWT Authentication
5. Socket.IO (chat realtime)
6. Cloudinary (upload immagini) 
7. Multer (upload files)    
8.  Joi (validazione)
9. Helmet & CORS

# Frontend

1. React + Vite
2. Redux Toolkit
3. React Router
4. Socket.IO Client
5. TailwindCSS
6. Phosphor Icons
7. Axios
8. React Hot Toast


## Autenticazione

- JWT salvato lato client
- Middleware requireAuth per rotte protette
- Socket.IO autenticato tramite token JWT
- Profilo personale /profile/me
- Profilo pubblico /profile/:id

## Post & Feed

- CRUD post
- upload cover image
- feed paginato
- ricerca live nei post
- feed per autore
- pagina post singolo

## Like & Commenti

- like realtime ottimizzato
- conteggio like e commenti
- commenti inline per post
- sincronizzazione feed + post page

## Notifiche

notifiche per:

- like
- commenti
- contatore unread persistente
- mark as read (singolo / bulk)
- dropdown notifiche

### Chat Realtime (Socket.IO)

## Funzionalità

- chat 1-to-1 stile Instagram
- creazione automatica conversazione
- ricerca utenti nella chat
- messaggi realtime
- join stanza per conversazione
- unread messages counter
- bubble chat floating (bottom-right)

## UI

ChatBubble (icona)
ChatPanel
ChatSearch
ChatConversationList
ChatWindow

La chat non si apre automaticamente alla ricezione di messaggi:
viene aggiornato solo il contatore.

## Socket.IO

- server Socket inizializzato su HTTP server
- autenticazione JWT nel handshake
- stanza per userId

## eventi:

- joinConversation
- sendMessage
- newMessage

## Upload immagini

- avatar utente
- cover post
- Cloudinary con resize automatico
- gestione sicura con Multer

## Filosofia

GuruDev è pensato come:
una piattaforma per sviluppatori, creator e tech writer

Focus su:

UX pulita
performance
stato globale coerente
codice leggibile e scalabile

## Autore

Sviluppato da: Vincenzo Tito
Full-Stack Developer