# Datingapp_Team

This project was created for the course(s): Backend and Project Tech.

## Table of Contents 🗂

1. [Prerequisites](#Prerequisites)
2. [Installation Guide](#installation-guide-)
3. [Job Story & Feature](#job-story-&-feature-)
4. [Goals](#goals-)
5. [Process](#process-)
6. [How it Works](#how-it-works-)
7. [License](#license-)

---
## Prerequisites

- Prettier is installed on VsCode

---

## Installation Guide ⚙️
```
1. git clone https://github.com/Falicer/Datingapp_Team.git

2. cd Datingapp_Team

3. npm install
```

You'll need to setup a `.env` file with these values:

```env
DB_CONNECT=[MONGO DATABASE URL]
GIPHY_API_KEY=[API KEY FROM GIPHY.COM]
```

And to run the project
```npm start```

---

## Job Story & Features ✍️

**The Job Story**
For this project we created the following job stories:

> **"When I'm on the subway with my phone in one hand, I want to be able to send GIF's or images so I can continue chatting with one hand"**

> **"When I'm signing up, I want to have my own account, so I have my own personal 'identification/passport'"**

> **"When I have an account, I want my password to be secured, so I don't have to be worried about my account getting hacked or stolen"**

**The Feature**
Simple put, the features we have are:

* A chat with the possibility to send GIF's, which you can look up using a search bar. A dating app that has this feature is [Tinder](https://tinder.com/). To make this I will use the [Giphy](https://giphy.com/) API.  
* A Login/register option.  
* Hashing of the user password

---

## Goals 💥

Before we started we wanted to make the app accessible. This means that the features can be used without javascript, once that was done correctly we could progressively enhance the code.

---

## Process 📈

When we started we first wanted to combine what we already had made into a working product, after we succeeded in that we wanted to keep adding on new features and topics.

By starting with the basic HTML for every page & feature we managed to test the accessibility. After doing that we added styling to make the app look nicer.

---

## How it Works ⚙️
When you get on the website you will be limited to the login and register page. You need to login, either with a test account, or your own. The register and login are not save at all, the login wasn't my main priority. To prevent people from using actual passwords I made the default password: `123`. 

There are currently three accounts on the database with which you can test (they all have the same password `123`):
- `piet@live.nl`
- `anna@live.nl`
- `sam@live.nl`

When you created an account you can like other people, they will need to like you back for it to become a match. But you can easily log into one of the test accounts and do this yourself.


### Handy Package(s) Used
- **express-ejs-layouts**
> Express ejs layouts is a way to create actual templates with ejs. You can inject a page into a layout. For example:
```html
<body>
  <!-- THe <%- body %> will be replaced by the actual page you want to render in express -->
  <main id="container"><%- body %></main>
</body>
```
---

## Dependencies ⚙️
You can find our dependencies on our wiki page: [Dependencies](https://github.com/Falicer/Datingapp_Team/wiki/NPM-Packages)

---

## License
MIT © [Jesse Dijkman](https://github.com/jesseDijkman1) & [Raekwon Gerold](https://github.com/Falicer)
