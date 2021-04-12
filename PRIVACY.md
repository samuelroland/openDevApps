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
# openDevApps - Privacy notice
    V1.0 Work In Progress - Concern openDevApps v1.0 and higher (until another version of this notice is created).
Your data belongs to you and none of them are shared/sold/rent with the author of openDevApps. They are stored locally and on your Firefox Sync account (if you have one and have choosed to sync extensions information with your account). If your Firefox account is logged to different devices, the data arre syncronised between your devices.

## Data list
It contains the information you have provided, some default values and some generated identifiers `id`:
- **links** (id, link, name, local)
- **categories** (id, name, list of id of included links)
- **config** (default language, last id inserted for categories and links).

As you can see, there is no analytics data, and there will never be any. There is only what the extension really need to work. As openDevApps can evolve and grow in term of functionnalities, the number of functionnal data will logically increase (e.g. new parameter in configuration). This notice will always keep up-to-date the exact list of data stored. The release notes will mentions changes of this notice.

## How to inspect or delete my data:
You can inspect and/or delete your data at any moment. First you need to go in the debugging console for this extension:
1. Type `about:debugging` in your browser
1. Scroll to find openDevApps in the list
1. Click on `Inspect`
1. Go under `Console`

### Show the current data
- Type `browser.storage.sync`
- Type Enter
- The data appear in a JSON format

### Delete all extension data
**Warning!** This action is irreversible and deletes all data created by the extension.
- Type `browser.storage.sync.clear()`
- Type Enter