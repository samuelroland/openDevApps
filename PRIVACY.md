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
# openDevApps - Privacy policy
    V1.0 - Concern openDevApps v1.0 and higher (until another version of this policy is created).
Your data belong to you, you have control over them and none of them are shared/sold/rented with the author of openDevApps. They are stored locally and on your Firefox Sync account (if you have one and have chosen to sync extensions information with your account). If your Firefox account is logged to different devices, the data are synchronized between these devices.

## Data list
The extension has the `storage` permission that is necessary to store data in the browser. The list contains the information you have provided, some default values and some generated identifiers `id`:
- a list of **links** (id, link, name, local)
- a list of **categories** (id, name, list of id of included links) with the current category id
- **config** (default language, last id inserted for categories and links).

As you can see, there is no analytic data, and there will never be any. There is only what the extension really needs to work. As openDevApps can evolve and grow in terms of functionalities, the number of functional data will logically increase (e.g. new parameter in configuration). This policy will always be kept up to date at each release with the list of data stored. The release notes will mention changes in this policy.

## How to inspect or delete my data:
You can inspect and/or delete your data at any moment. First, you need to go in the debugging console for this extension:
1. Type `about:debugging` in your browser
1. Scroll to find openDevApps in the list
1. Click on `Inspect`
1. Go under `Console`
1. Click on `...` and `Disable Popup Auto-Hide`
1. Click on the extension to open it (leave it open during the inspection or deletion, else commands will not work).

### Show the current data
- Copy paste this code in the Console:
```javascript
browser.storage.sync.get().then((data) => {
  console.log("Your data: ");
  console.log(data);
});
```
- Type Enter
- The data appear in a JSON format (something like `Object { config: {…}, links: (6) […], categories: {…} }`)
- Click on it and you will see the complete data structure with your data.

### Delete all extension data
**Warning!** This action is irreversible and deletes all data created by the extension.
- Type `browser.storage.sync.clear()`
- Type Enter
- Then if you inspect, you can see that your data have been deleted.

#### All versions of this policy:
[v1.0](https://github.com/samuelroland/openDevApps/blob/v1.0/PRIVACY.md)