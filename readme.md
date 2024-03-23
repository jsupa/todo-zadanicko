# TODO <img src="https://wakatime.com/badge/user/698e3ae2-2e7a-4cf6-a9e7-192f2b7d1525/project/018e6bed-a83c-4a42-8dc0-634c727c48b6.svg">

Time spent: [![wakatime](https://wakatime.com/badge/user/698e3ae2-2e7a-4cf6-a9e7-192f2b7d1525/project/018e6bed-a83c-4a42-8dc0-634c727c48b6.svg)](https://wakatime.com/@jsupa/projects/fhawzgrcnf?start=2024-03-17&end=2024-03-23)

Projekt bol vytvorený s ESM modulmi, pretože som sa chcel naučiť novú technológiu. + je to nový štandard pre node.
Takže to bol freestile projekt, kde som si vyskúšal nové veci ako sú:

- [vinejs](https://vinejs.dev/)
- [tsx](https://github.com/privatenumber/tsx)

Na projekte je swagger dokumentácia, ktorá je dostupná na http://localhost:3001/api-docs

## API:

- 1. krok bude vytvorenie účtu: POST /login/register > vytvorí účet a vráti jwt token
- 2. krok bude zadanie tokenu do swagger Authorized buttonu (vid obrazok)
- 3. krok bude vytvorenie todo listu: POST /list
- 4. krok bude vytvorenie a pridanie todo tasku: POST /task

(Routes bez zámku sú public)

![image](swagger.png)

## Installation & Start (pnpm)

```sh
#1st terminal tab
$ docker-compose up
```

```sh
#2nd terminal tab
$ pnpm i
$ pnpm dev
```

Server will be running on http://localhost:3001/api-docs
