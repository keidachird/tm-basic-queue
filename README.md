# Basic Queue

This repository contains a visualisation of a basic queue data structure. It was made as a homework for [Techmagic Academy](https://www.techmagic.co/techmagic-academy).

## Demo

You can see a live demo of this project [here](https://keidachird.github.io/tm-basic-queue/).

## Instalation

- Clone this repository with `git clone https://github.com/keidachird/tm-basic-queue.git`.
- Run `npm i` to install all dependencies.
- Run `npm run dev` to launch a server. It will open a browser and you can use the application.

## Usage

Page has an input field, two buttons for adding and removing element and the area where entered element wil be added. After entering a value into the input field press `Enqueue` to add the element to a queue. Press `Dequeue` button to remove the oldest element from a queue.

Here is a demostration how to use this application:

![Application usage example](https://i.ibb.co/NmDbRb6/basic-queue-demo.gif)

## Notes

- I decided to keep all functionality in one JS file because of simplicity of this project.
- Maximum elements of the queue equals `22` due to a task requirements.
- Instead of notifying user about impossible actions application just prohibits to do them by making needed button disabled.
- State of the queue is saved through page reloads.
