# fido

A UI library for WeChat Mini Programs, wrapped inside a handy CLI.
Scaffold pre-styled components & pages into your Mini Program working directory right from the command line.



## Getting started

First, install fido ui globally

```bash
npm install fido-ui -g
```

After creating your mini program, move into your working directory and initialize fido.

```bash
fido init
```

After entering a primary and secondary color for your project, this init command will create a fidofile.json and overwrite anything you have in your app.wxss with fido base styles.

## Editing base styles

If you want to change these colors, just run:
```bash
fido edit
```
...upon which your theme colors will be swapped out(hopefully).
THIS IS NOT DONE YET Need to recursively recompile all stylesheets in the working directory, swapping out the primary and secondary colors.

## Adding a component

To add a component from the UI library, run this command with the name you want to give to your component:

```bash
fido component <name of your component>
```

...upon which you will be asked to choose from a fido component. The component will be added to your working directory /components directory. You can now edit the wxss, wxml, and JS of the component any way you feel so inclined.


## Adding a page

NOT DONE YET. DO NOT RUN THIS COMMAND OTHERWISE YOUR MINI PROGRAM MIGHT BREAK AND CAUSE YOUR COMPUTER TO CATCH FIRE, YOU LOSE YOUR JOB, ETC.

```bash
fido page <name of your page>
```
