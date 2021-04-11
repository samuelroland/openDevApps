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
The goal of this little notice is to inform you about the data used by the extension to be fully transparent (it's opensource and you can inspect stored data). Your data belongs to you and none of them are shared with the author of the extension. They are stored locally and syncronised between your devices if you have a Firefox Sync account and that you have ticked the box "Extensions" in the list of synced information.

## Complete list
The data stored are the ones you have provided (they contain some default values and the generated identifiers called `id`):
- **links** (id, link, name, local)
- **categories** (id, name, list id of links included)
- **config** (default language, last id inserted for categories and links).

As you can see, there is no analytics data, and there will never have. There is only what the extension really need to work. As the extension can evolve and grow in term of functionnalities, the number of functionnal data will logically increase. This notice will always be up-to-date with the exact list of data are stored and the release notes will mentions changes of this notice.

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
- Type `browser.storage.sync.clear()`
- Type Enter