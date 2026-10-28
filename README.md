# DarkPurpleNote (NodePlus)
>This app is being restructured

Developed by [OrangeJuicy69](https://github.com/OrangeJuicy69)

A dedicated note-taking app for documenting the achievements of a completed project. The notes are represented as nodes, which are connected to one another by lines.

## Introduction to the app

![Screenshot of the current Node UI](/public/node_ui.png)

When you press the "+" on the Node, it will open the node so you can see all the infos form the note

![Screenshot of the open Node](/public/opennode.png)

Also you can click on the node (open or not) to access the sidepanel

![Screenshot of the open Node](/public/sidepanel-node.png)

You can also import and export the data form the Nodes (Only Json see section)
- [Import and Export](#import-and-export)

![Screenshot of the current Node UI](/public/import.png)
![Screenshot of the current Node UI](/public/export.png)


> [!NOTE]
> This Webapp is still under development . Errors and bugs are to be expected.

> [!TIP]
> Read the installation instructions carefully to avoid errors.

> [!IMPORTANT]
> This Project can be used for a privat project .

> [!WARNING]
> When you using it please link **OrangeJuicy69**.


## Content

- [Introduction to the app](#introduction-to-the-app)
- [Content](#content)
- [Prerequisites](#content)
- [Installation and App Start (3 steps)](#prerequisites)
- [App start](#app-start-explanation-of-everything-it-does-)
- [Use](#use)
- [Import and Export](#import-und-export)
- [Project structure](#project-structure)
- [Upcomming Updates](#upcomming-updates)
- [Ideas for the future](#ideas-for-the-future)
- [Links](#links)

## Prerequisites

- [Node.js](https://nodejs.org/en/download) (LTS-Version)
- [pnpm](https://pnpm.io/installation) (recommended, the project includes a `pnpm-lock.yaml`)

## Installation and App Start (3 steps)
> Only the setup of the webapp without git pull and so on

```bash
cd NodePlus
pnpm install
```
>starts a local server
```
pnpm run start
```


## App start (Explanation of everything it does )
>for basic setup and start go to `Installation and App Start (3 steps)`

Start the local development server with:

> Development mode
> Use it locally while developing and testing. Never use it in production
```bash
pnpm run dev 
```
> or use it on servers, in deployments and to test the final production behavior locally
```bash
pnpm run start 
```
The Webapp can now be enternd in the browser  (by default its`http://localhost:5173`).

## Use

All the data for the Nodes can be found an changed in the following file `src/data.json`.

- Every Text,  that is displayed in the Node, can be found in the `data.json file`.
- For a new Node, you can add a new section in the `data.json`.
- You enter the position, requirements, and status manually into the `data.json`.

If you dont know how the `data.json` structure works, you can go to this file for more infos  [JSONSetup/JsonSetup.md](JSONSetup/JsonSetup.md).

## Import und Export

- **Export:** With the **Export JSON** you can dowload a copy of the `data.json`. The file contains a copy of the data used in the project.
- **Import:** With the **Import JSON** you can import a `json` which will still be there and will be loaded even after reloading of the website. Please pay attention to the requirements for the `data.json` (see here [JSONSetup/JsonSetup.md](JSONSetup/JsonSetup.md)).

> [!NOTE]

##Troubleshooting

> If you dont see any changes after the import , open the browser-console (key `F12`) and check the error message and logs there.

There are right now 5 console alerts
#console error
 > console.error `console.error("JSON-Parse-missing:", err);`
 > console.error `console.error("check *import-json.jsx* if the JSON dont work")`
 > console.error `console.error("ImportJSON: Prop onImport missing.");`

 #console alert
 > alert `alert("Invalid format: The file must contain an array of nodes.");`
 > alert  `alert("The file is not valid JSON.");`




## Project structure

```text
├── eslint.config.js
├── .gitignore
├── index.html                  # Landing page of the web app
├── JsonSetup
│   └── JsonSetup.md            # Structure of the JSON and where everything goes
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── export.png              # Readme node picture for export button
│   ├── favicon.svg
│   ├── icons.svg
│   ├── import.png              # Readme node picture for import button
│   ├── node_ui.png             # Readme node picture
│   ├── opennode.png            # Readme node picture for opennode
│   └── sidepanel-node.png      # Readme node picture for sidepanel
├── README.md
├── src
│   ├── assets
│   │   └── vite.svg
│   ├── css
│   │   └── csscolor
│   │       ├── basicnode.css   # Styling des Node-Systems
│   │       └── colorspalett.css
│   ├── data.json               # Values of the Nodes
│   ├── index.css               # Global Styling
│   ├── in-export
│   │   ├── export-json.jsx     # Exports the Nodes into a JSON
│   │   └── import-json.jsx     # Import  Nodes from JSON
│   ├── main.jsx                # Combines all components and renders them into #root 
│   └── node
│       ├── connections.jsx     # Connecting lines between the nodes
│       ├── newnode.jsx         # Add new Node (experimentell (does not work rn))
│       ├── node.jsx            # Functions of the nodes
│       └── sidepanel.jsx       # Sitenpanel for Nodes infos
├── struktur.txt                # struktur of the project
└── vite.config.js
```
>in the file struktur.txt you can find the Project structure without any description


## Upcomming Updates

- [x] Export-function
- [x] Import-function
- [x] New Node-UI
- [x] New Connecting lines
- [x] Makeover project structure
- [x] Changing everything to english (ui, readme, commits and comments)
- [ ] General UI of the web app


## Ideas for the future

- [ ] Checkiste/To-Do Liste
- [ ] Hyperlinks inside of node
- [ ] Rebuild of the sidepanel 
- [ ] Dark Mode/ Light Mode
- [ ] Various nodes to choose from
- [ ] Choose Your Own UI Color
- [ ] Backend 
- [ ] Categorize
- [ ] Attaching files in nodes
- [ ] Workspace
- [ ] Change nodes size
- [ ] Zooming in and out in the workspace
- [ ] Login page 

## Links

- [OrangeJuicy69 auf GitHub](https://github.com/OrangeJuicy69)
- [Projekt-Repository](https://github.com/OrangeJuicy69/DarkPurpleNote/)
- [pnpm: Installation](https://pnpm.io/installation) and [pnpm: FAQ](https://pnpm.io/faq)
