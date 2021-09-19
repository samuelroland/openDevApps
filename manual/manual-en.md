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
# openDevApps - Manual

    Manual version 1.0
    Up-to-date for openDevApps v1.0-beta1  
*Open a **PR** to improve it, add/update a translation or just fix a typo!* **Writing in Progress**.

---

When you just installed the extension for the first time, you got a interface like this:

<img alt="image" src="https://user-images.githubusercontent.com/47849646/133944442-585081e4-c16a-4151-b78e-6874ba6b897e.png">

As you can see, there is no link and no category.

As suggested, open the `Settings` by clicking on the settings icon:

<img alt="image" src="https://user-images.githubusercontent.com/47849646/133944463-1f25fec6-4090-4f16-90f4-fc96b83d6703.png">

*Okay, but before managing links and categories, how are these elements organised together ?*

You can create links (with URL, name and if it's local or not) and then add them to 0, 1 or n categories. Each category can have 0, 1, or multiple links (but not several times the same). `All` is just the view with all existing links.

### Create a link
Let's create a first link pointing on `github.com/company/greatproject`. Enter the link (in the bottom text input `New link + Enter`) and hit enter.

<img alt="image" src="https://user-images.githubusercontent.com/47849646/133944576-1d820abc-8042-439f-a079-ee98185790c8.png">

Then as suggested by the placeholder (`Set name + Enter`), set a name and hit Enter.

<img alt="image" src="https://user-images.githubusercontent.com/47849646/133944656-e7f74f59-8e7b-427a-800d-355a47323414.png">

Then check or uncheck the checkbox depending if the app is hosted/running in local ? You can presse `Space` key to check or uncheck (or use the mouse obviously) then hit Enter. Then the link appear (you see the name and on hover you can see the link as popup title).

<img alt="image" src="https://user-images.githubusercontent.com/47849646/133944731-f9da233c-95a2-47b7-ad72-6a7348d334c8.png">

Our link has been created ! We can click on its name to open a new tab to the website set.

**Mention**: Currently there is a maximum limit of 15 links.

## Create a category
After having created several links, it's the time to organise them inside categories. So let's create a first category:

Enter a name in the top input (`New category + Enter`) and hit `Enter`. We are going to create a category for `Job apps`:

<img alt="image" src="https://user-images.githubusercontent.com/47849646/133944804-4ca26854-d622-42e6-96fa-da472d24db33.png">

The new category is directly selected and a new zone to add a link has appeared.

<img alt="image" src="https://user-images.githubusercontent.com/47849646/133944851-54c0d35d-9154-4c9c-a765-0ce5126933ca.png">

*No idea about naming categories ? Think about separating links by projects, domains, by pro/perso, by activities, or anything else you want.*

## Add/Remove links to a category

Here, in addition to `Great Project at Company`, we would like to add the link `Alina Repository` (that is an app made by our company) to the `Job apps` category (choose and click `Add`):

![image](https://user-images.githubusercontent.com/47849646/133944978-a908d2a8-46db-43d2-b7a7-f3631c32542e.png)

**To remove a link** from a category, just click on the "unlink" icon.

## Basic usage
When link or category are created, deleted, added, or removed, this is saved in local memory (synced across your browsers if you use Firefox Sync).

When closing preferences or closing/reopening the extension, the links are displayed and you click on them to open URLs.
![image](https://user-images.githubusercontent.com/47849646/133945260-66cdcb05-3624-44f9-a2e5-0a8b07b352bb.png)
**Bottom icons**:
- Repository to find source code
- Link to this manual, in case you need it later
- Settings icon to open/close settings

**Top tricks**:
You can always hover option to see the purpose with the title info displayed after 1 second. Version number hover displays release date of the installed version.

## Deletion
- To delete links: click on the little trash 2 times
- To delete categories: click on the little trash 3 times (relations to links are deleted, but links themself are not).

## Links validation
A basic validation of each link is made with a Regex at the link creation. This is not perfect, especially for IP addresses and port range. I preferred to keep it not to restrictive finally. You can test and edit the Regex on [regexr.com](https://regexr.com/5pus0). The Regex is currently:
```
^(((https?:\/\/)|(www\.)|())((([A-Z\d_-]+\.)+)([A-Z\d]+)|(localhost))((:\d{1,4})?))(([\/\?].*)?)$
```
