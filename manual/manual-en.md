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

<img width="352" alt="image" src="https://user-images.githubusercontent.com/47849646/111702249-414e5500-883c-11eb-820f-a41abac89033.png">

As you can see, there is no link and no category (`All` is not a category, it just the view with all existing links).

As suggested, open the `Settings` by clicking on the settings icon:

<img width="341" alt="image" src="https://user-images.githubusercontent.com/47849646/111702963-495ac480-883d-11eb-9cac-4b7a5b08bffc.png">

    Okay, but before managing links and categories, how are these elements organised together ?

There is an independant list of links that you will create. They don't depend on the categories. Each link contains a link string, a name and if it's local or not. These 3 information are entered at the link creation.

### Create a link
Let's create a first link pointing on `github.com`. On the bottom text input, as suggested by the placeholder (`New link + Enter`), let's enter the link and hit enter.

<img width="355" alt="image" src="https://user-images.githubusercontent.com/47849646/111703131-832bcb00-883d-11eb-9796-2799b9bb2352.png">

Then as suggested by the placeholder (`Set name + Enter`), let's enter the a name and hit Enter.

<img width="356" alt="image" src="https://user-images.githubusercontent.com/47849646/111703421-e584cb80-883d-11eb-992c-c68ee3507c94.png">

Then check or uncheck the checkbox. The checkbox answers to the question `Is the app hosted/running in local ?`. You can presse `Space` key to check or uncheck (or use the mouse obviously) then hit Enter. Then the link appear (you see the name and on hover you can see the link as popup).

<img width="339" alt="image" src="https://user-images.githubusercontent.com/47849646/111823119-dad14180-88e4-11eb-8635-3ddd81e72c0b.png">

Our link has been created ! We can click on its name to open a new tab to the website set.

## Create a category
After having created several links, it's maybe the time to organise them inside categories to have only one part of the links that have something in common. So let's create a first category:

On the first input at the top, as suggested by the placeholder (`New category + Enter`) we only need to enter a name. Here our 3 links are the apps that we use in our job, so we name it `Job apps`:

<img width="350" alt="image" src="https://user-images.githubusercontent.com/47849646/111823672-824e7400-88e5-11eb-9337-05f5ade6bc60.png">

When the category exists, it is directly selected and a new zone to add a link has appeared.

<img width="335" alt="image" src="https://user-images.githubusercontent.com/47849646/111823966-e1ac8400-88e5-11eb-9301-aed69e0ea64b.png">

*You have no idea about naming categories ? Think about separating links by projects, by pro/perso, by activities, or anything else you want.*

## Add links to a category
When you have categories created, you can add links to them. As links are independant of any categories, they can be added from 0 to several categories.

Here we add the link `E-commerce Alina` (e-commerce that we are working at our job office) to the `Job apps` category:
![image](https://user-images.githubusercontent.com/47849646/111880304-0b7bae80-89ab-11eb-8edc-ea8db4c1a413.png)

## Links validation
A basic validation of each link is made with a Regex at the link creation. This is not perfect, especially for IP addresses and port range. I preferred to keep it not to restrictive finally. You can test and edit the Regex on [regexr.com](https://regexr.com/5pus0). The Regex is currently:
```
^(((https?:\/\/)|(www\.)|())((([A-Z\d_-]+\.)+)([A-Z\d]+)|(localhost))((:\d{1,4})?))(([\/\?].*)?)$
```
