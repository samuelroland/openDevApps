<!-- 
    openDevApps - Open quickly local or remote development-related apps, through a small list of links.
    Copyright (C) 2021 Samuel Roland

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

# openDevApps
![icon](icon.png)
[Available HERE]

### Open quickly local or remote development-related apps, through a small list of links.
This is an opensource **experimental web extension** licensed under **[GNU GPLv3 or later](/LICENSE.txt)**. It use VueJS and TailwindCSS and Jetbrains Mono.

![example img](img/category-jobs-link.png) | ![example img](img/category-perso-ip.png)

## Features
- Access quickly to local or remote apps. Actually all HTTP links are valid. (`localhost:8056`, `127.0.0.1`, `192.168.11.45`, `app.local`, `remote.com`). Before using, the list of links must be entered.
- Manage the links and categories (creation and deletion) and add or remove links from categories
- Separate links by categories (categories can be project, life domains, ...) to keep the list short and not off-topic and to find easier the wanted app.

## Planned features
- Translations support (first to do a french translation)
- Open all links in the current categories
- Add the current tab link to the current category (fill the link and propose the name with the tab title)

## Contributions
If you found a bug, have an idea for an enhancement or a new feature, or you just want to give a feedback, just open an issue and describe it and why you think it will be valuable ! (Write only in English please).

## Build
If you want to build the extension from the source, you need:
- Windows 10 (other OS have not been tested but will work probably)
- NPM v6.13.4^

### Process
- Clone the repos, open a shell
- `cd openDevApps`
- `cd extension`
- `npm install`
- `npm run build`

The build is now available in the `dist` or as `.zip` file under `artifacts` (name like `opendevapps-v1.0.1-production.zip`). You can now install it.

## Install beta versions
### Install from `.xpi` or as `.zip` downloaded
1. Go to `about:addons`
1. Click on the settings icon
1. Install Add-on from file
1. Select the extension file
1. Click `Add`

--> The extension is correctly installed if you can open it as popup at the top right of your browser (you should the see the extension icon and click on it).

### Install from `.xpi` under a download link
1. Click on the download link
1. Follow step 5 in the precedent procedure

## Versions
All versions are published on GitHub under the [releases panel](https://github.com/samuelroland/openDevApps/releases), including the `.xpi` file and the source code. When browsing with Firefox, a simple click on the `.xpi` file is enough to launch the installation setup. The version names are the same in `package.json` and `manifest.json`.

- **Production** versions are available on GitHub et on addons.mozilla.org.  
Names are built like that **MAJOR.MINOR** (for example `1.2` stand for v1.2).
- **Beta** versions are only available on GitHub, and don't have automatic updates (at the moment). Suscribe to releases notifications to keep informed.  
Names are built like that **MAJOR.MINOR.BETA-NUMBER** (for example `1.2.2` stand for v1.2 beta 2).

## Credits
### Librairies
- TailwindCSS - [MIT](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE)  
Copyright (c) Adam Wathan <adam.wathan@gmail.com>  
Copyright (c) Jonathan Reinink <jonathan@reinink.ca>  
- VueJS - [MIT](https://github.com/vuejs/vue/blob/dev/LICENSE)  
Copyright (c) 2013-present, Yuxi (Evan) You
### Fonts
- Jetbrains Mono - [OFL](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt)  
Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)
### Icons
Found with [iconduck.com](https://iconduck.com).
- Fluent UI System Icons  [MIT](https://github.com/microsoft/fluentui-system-icons/blob/master/LICENSE)  
Copyright (c) 2020 Microsoft Corporation
- Material Design Icons - [Apache License 2.0](https://github.com/Templarian/MaterialDesign/blob/master/LICENSE)
- Majesticons Icons Set - [MIT](https://github.com/halfmage/majesticons/blob/main/LICENSE)  
Copyright (c) 2021 Gerrit Halfmann
