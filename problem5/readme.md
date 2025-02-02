<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Problem 5 : A crude server</h3>

  <p align="center">
    My take on 99 Tech Coding Challenges - Problem 5: A crude server
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#environment-variable">Environment Variable</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#api-document">API Document</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
This is my solution on 99 Team Coding Challenge problem 5, combining my understanding and experience in back-end development and JavaScript with creativity, overthinking and overengineering thanks to the openness and the lack of mandate requirements for the software as long as it is not painful for reviewer to examine and grade the solution.


While it is somewhat completed, there are still points of improvement as well as the lacking support for more conventional database engine such as MySQL or MongoDB but the challenge did not list the available database engines so I opted for LokiJS so that neither I nor the judges need to bother about installing and config the database connection while ensure the compatibility with other engine through an adapter `DatabaseInterface`.

<!-- GETTING STARTED -->
## Getting Started
 
### Prerequisites

The program is required [Node.js](https://nodejs.org/en/) 18.0 or higher, the detailed guide is available at the homepage 

A simple command for Linux and MacOS users through [Homebrew](https://brew.sh):
``` sh
# Download and install Homebrew
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash
# Download and install Node.js:
brew install node
```

Using the following command to ensure that you have the correct Node version:
``` sh
node -v
```

Remember to clone the github repo to your local computer or server and have a terminal opened at project directory.

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/Nghviet/NguyenHoangViet.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Creating .env for environment config and update variables ( Optional )

4. Run the server on dev mode:
    ``` sh
    npm run dev
    ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Environment Variable
* SERVER_PORT : Number : Define the port value that the server will be mounted to
* DB_ENGINE : String : Specify the database the server will use, defaulted to LokiJS, will throw Error and rejecting all request if not set correctly
* LOKI_DB_NAME: String : path name for storing all data in LokiJS, defaulted to "dev_mode.json"
* LOKI_COLLECTION_NAME : String : collection name for storing data, defaulted to "dev_mode"
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments
Many thanks to users and guidance of the community

* [README.md template](https://github.com/othneildrew/Best-README-Template)
* [Setting up Typescript and ExpressJS](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln)

## API Document

<details> <summary> <b>QueryObject</b> </summary> 

> | field              | value-type      | meaning                                                             |
> |--------------------|-----------------|---------------------------------------------------------------------|
> | variable_name      | `string`        | field for comparing                                                 |
> | query_value        | `string`        | value to compare with                                               |
> | query_value_type   | `string`        | comparing as a STRING or NUMBER ( having different comparision type)|
> | comparision_type   | `string`        | Comparing function (checking code for furthur information)          |

</details>

#### GET methods

<details>
 <summary><code>GET</code> <code><b>/api/resource/</b></code> </summary>

##### Request Body

> | field              | value-type           | meaning                                                             |
> |--------------------|----------------------|---------------------------------------------------------------------|
> | queries            | List<QueryObject>    | list of quries given by the user                                    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/json;charset=UTF-8`         | JSON object                                                         |
> | `400`         | `text/plain;charset=UTF-8`        | None (Invalid request)                                              |

</details>
<details>
 <summary><code>GET</code> <code><b>/api/resource/{document_id}</b></code> </summary>

##### Parameters

> | field              | value-type           | meaning                                                             |
> |--------------------|----------------------|---------------------------------------------------------------------|
> | document_id        | number               | id of the document for retrieval                                    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/json;charset=UTF-8`         | JSON object                                                         |
> | `400`         | `text/plain;charset=UTF-8`        | None (Invalid request)                                              |
> | `404`         | `text/plain;charset=UTF-8`        | Document_id not found                                               |

</details>

#### POST methods
<details>
 <summary><code>POST</code> <code><b>/api/resource/</b></code> </summary>

##### Request Body

> | field              | value-type           | meaning                                                             |
> |--------------------|----------------------|---------------------------------------------------------------------|
> | user_name          | string               | Reviewer name                                                       |
> | email              | string               | Reviewer email                                                      |
> | rating             | Number [0.0, 10.0]   | Reviewer rating                                                     |
> | detail_review      | string               | Detail review                                                       |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `text/json;charset=UTF-8`         | JSON object                                                         |
> | `400`         | `text/plain;charset=UTF-8`        | None (Invalid request)                                              |
</details>

#### PUT methods
<details>
 <summary><code>PUT</code> <code><b>/api/resource/{document_id}</b></code> </summary>

##### Parameters

> | field              | value-type           | meaning                                                             |
> |--------------------|----------------------|---------------------------------------------------------------------|
> | document_id        | number               | id of the document for update                                       |

##### Request Body

> | field              | value-type           | meaning                                                             |
> |--------------------|----------------------|---------------------------------------------------------------------|
> | user_name          | string               | Reviewer name                                                       |
> | email              | string               | Reviewer email                                                      |
> | rating             | Number [0.0, 10.0]   | Reviewer rating                                                     |
> | detail_review      | string               | Detail review                                                       |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `text/json;charset=UTF-8`         | JSON object                                                         |
> | `400`         | `text/plain;charset=UTF-8`        | None (Invalid request)                                              |
> | `404`         | `text/plain;charset=UTF-8`        | No matching document                                                |
</details>

#### DELETE methods
<details>
 <summary><code>DELETE</code> <code><b>/api/resource/{document_id}</b></code> </summary>

##### Parameters

> | field              | value-type           | meaning                                                             |
> |--------------------|----------------------|---------------------------------------------------------------------|
> | document_id        | number               | id of the document for remove                                       |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `text/json;charset=UTF-8`         | JSON object                                                         |
> | `400`         | `text/plain;charset=UTF-8`        | None (Invalid request)                                              |
</details>
<p align="right">(<a href="#readme-top">back to top</a>)</p>