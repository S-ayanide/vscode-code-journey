# Code Journey

[![renovate badge](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

This VSCode Extension takes you on a journey of the developer/organization's code of the Project from the first ever commit written to the latest based on your choices. It helps you understand how a developer through in each step of the project.

> "Talk is cheap. Show me the code" - Linus Torvalds

## Features

Currently it is possible to do the following:

- Initialize a git repository
- Copy the commit history of the project and start your journey into the code
- Move to the next commit of the project from where you are currently at
- Move to the previous commit of the project from where you are currently at
- Jump to a specific commit of the project
- Pull current branch from the origin
- Add an origin to git
- Add a remote repository to git
- Show all the logs of the repository
- Show all the commit history of a specific file
- See the difference between the last and the current file in a .diff file

## Start your journey

To use this extension one needs to navigate to the project folder in their VSCode Workspace and execute 'Code Journey: Start Journey' command.

To execute the 'Code Journey: Start Journey' command type Ctrl/Cmd+Shift+p in VSCode to open the command palette and type 'Code Journey: Start Journey'. You will then be reverted to the very earliest commit of the project from where you can traverse and look at how the code progressed.

Additionally, by default this extension assumes the git binary is already available in your machine and a git repository is already initialized for the project. If you wish to initialize a git repository, you can do this by executing 'Code Journey: Init'.

There are additional settings for this extension as well, enter `Code Journey` in the Command Palette of
VS Code to see them all.

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://about.me/knisterpeter"><img src="https://avatars.githubusercontent.com/u/327445?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Markus Wolf</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=KnisterPeter" title="Code">💻</a></td>
    <td align="center"><a href="https://valler.dev/"><img src="https://avatars.githubusercontent.com/u/3588000?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ross Valler</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=RossValler" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jeveleth"><img src="https://avatars.githubusercontent.com/u/305137?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josh Eveleth</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=jeveleth" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/sasial-dev"><img src="https://avatars.githubusercontent.com/u/44125644?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sasial</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=sasial-dev" title="Code">💻</a></td>
    <td align="center"><a href="https://www.timhaintz.com.au/"><img src="https://avatars.githubusercontent.com/u/19178488?v=4?s=100" width="100px;" alt=""/><br /><sub><b>timhaintz</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=timhaintz" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.codependentcodr.com/"><img src="https://avatars.githubusercontent.com/u/414933?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Parkin</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=pzelnip" title="Documentation">📖</a></td>
    <td align="center"><a href="http://duk.im/"><img src="https://avatars.githubusercontent.com/u/3122655?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andreas Holley</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=dukky" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://stanislas.blog/"><img src="https://avatars.githubusercontent.com/u/11699655?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stanislas</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=angristan" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Drarig29"><img src="https://avatars.githubusercontent.com/u/9317502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Corentin Girard</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=Drarig29" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mmorhun"><img src="https://avatars.githubusercontent.com/u/15607393?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mykola Morhun</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=mmorhun" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/NicholasMata"><img src="https://avatars.githubusercontent.com/u/8304095?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicholas Mata</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=NicholasMata" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ishitatsuyuki"><img src="https://avatars.githubusercontent.com/u/12389383?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tatsuyuki Ishi</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=ishitatsuyuki" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vincentvanderweele"><img src="https://avatars.githubusercontent.com/u/9002093?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vincent van der Weele</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=vincentvanderweele" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ivanmilov"><img src="https://avatars.githubusercontent.com/u/522518?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ivanmilov</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=ivanmilov" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://stackoverflow.com/users/1366033"><img src="https://avatars.githubusercontent.com/u/4307307?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kyle</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=KyleMit" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/lihuanshuai"><img src="https://avatars.githubusercontent.com/u/4586647?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Li Huanshuai</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=lihuanshuai" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shaikathaque"><img src="https://avatars.githubusercontent.com/u/9042881?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shaikat Haque</b></sub></a><br /><a href="https://github.com/KnisterPeter/vscode-github/commits?author=shaikathaque" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
