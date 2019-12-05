<h1 align="center">Gomoku Game</h1>
<p align="center"><em>No description yet</em></p>
<div align="center">
   <img width="30%" src="https://upload.wikimedia.org/wikipedia/commons/c/cf/CaroVN.jpg">
</div>

## Authors

1. Lê Duy Khánh
2. Nguyễn Trung Nam

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Install Docker Desktop on Windows

#### System Requirements

* Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later).
* Hyper-V and Containers Windows features must be enabled.
* The following hardware prerequisites are required to successfully run Client Hyper-V on Windows 10:
    * 64 bit processor with [Second Level Address Translation (SLAT)](https://en.wikipedia.org/wiki/Second_Level_Address_Translation)
    * 4GB system RAM
    * BIOS-level hardware virtualization support must be enabled in the BIOS settings. For more information, see [Virtualization](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization-must-be-enabled).
    
#### Download Docker Desktop Windows

Click [here](https://hub.docker.com/?overlay=onboarding) to download Docker from Docker Hub.

> **Note: You need to register an account Docker (or sign up if you already have one) to download it.**

After downloaded and installed, if the Docker Desktop Windows installer required to enable Hyper-V, you should restart your machine.

> *Visit [Docker Documentation](https://docs.docker.com) for more detailed guide.*

### Install MetaMask

Go to [MetaMask](https://metamask.io/) and select the appropriate version for your web browser and install it.

Then register an account and log in to MetaMask add-on.

## Run this project


In the project directory, install the dependencies in the local node_modules folder:

```sh
npm install
```

Then, run:

```sh
docker build -t gomoku-game-app .
```

After build a `gomoku-game-app` image, run:

```sh
docker run -it -p 3000:3000 gomoku-game-app
```

Open [http://localhost:3000](http://localhost:3000) and allow MetaMask to connected to your app and choose **Rinkeby Test Network** to view it in the browser.

To stop the running container, hit <kbd>Ctrl + C</kbd>.
