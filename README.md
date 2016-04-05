# Stakhanov

```bash
#      _        _    _
#  ___| |_ __ _| | _| |__   __ _ _ __   _____   __
# / __| __/ _` | |/ / '_ \ / _` | '_ \ / _ \ \ / /
# \__ \ || (_| |   <| | | | (_| | | | | (_) \ V /
# |___/\__\__,_|_|\_\_| |_|\__,_|_| |_|\___/ \_/
#                  ___
#                ."   ".
#                |  ___(
#                ).' -(
#                 )  _/
#               .'_`(
#              / ( ,/;
#             /   \ ) \\.
#            /'-./ \ '.\\)
#            \   \  '---;\
#            |`\  \      \\
#           / / \  \      \\
#         _/ /   / /      _\\/
#        ( \/   /_/       \   |
#         \_)  (___)       '._/


```
## Development

### Install dependencies

```bash
npm install
# or
make build
```
### npm scripts

```bash
npm run dev:start     - Run kremlin(nodemon), kadievka(webpack-dev-server) & syncForms(nodemon) in development
npm run test:backend  - Run jasmine testing backend
npm run test:frontend - Run karma(and webpack) testing frontend
npm run prod:compile  - Run webpack creating for create the compiled version
npm run kadievka      - Run kadievka(webpack-dev-server) and syncForms(node) in production
npm run kremlin       - Run kremlin(node) in production
```

### Webpack config
[config/webpack/README.md](config/webpack/README.md)

## Installation

```bash
$ npm install git+ssh://git@github.com:Typeform/stakhanov.git
```

You can also specify a version (tag) or a branch:

```bash
$ npm install git@github.com:Typeform/stakhanov.git#production
$ npm install git@github.com:Typeform/stakhanov.git#v0.1.0
```

## Kremlin endpoints

* `POST` `/render`: Renders a form from a JSON given as request body.
* `GET` `/render`: Renders a form from a JSON given as the `data` QA parameter.
This exists for testing purposes.
* `GET` `/renderbox`: Renders a text box that submits to the `/render` endpoint
above.

## Usage

```javascript
// NOTE: this is the temporary interface
import RendererInterface from './../../src/RendererInterface.js';

// instatiate new form window
const form = new RendererInterface(domNode);

// update content of the form panel
form.updateJson(json);          // complete replacement JSON

// scroll interface
form.scrollToField(fieldIndex); // scrolls the form to the relevant field. fieldIndex is the 0-based index of the array of fields passed using the formJson
```

### Mobile development

You can render the same JSON on multiple devices, as long as the devices are connected to the same network.

1. give Kadievka a `window.location.search` string: `http://0.0.0.0:8080/?anthony`
2. open your IP on the network from another device: `http://192.168.5.246:8080/?anthony`
3. edit JSON (on either client)
4. click save

Now all updates made are propagated across devices when you click Save.

## Run Kadievka with Docker

```bash
make kadievka-build
```

## Run Kremlin with Docker

```bash
make kremlin-build
```
## New folder structure

- src
  - renderer
    - assets
      - css
      - svg
      - img
    - auditing
    - design
    - intl
    - form
      - footer
      - submit
      - header
      - headerLevelTwo
    - field
      - longText
      - shortText
      - common
        - fieldSubmitButton
        - attachment
    - streams
    - adapters
      - kremlin
        - clientEntryPoints
        - server
      - kadievka
        - clientEntryPoints
        - server
  - submit
  - common

