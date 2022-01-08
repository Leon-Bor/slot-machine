# 🚀 PixiJS slot machine written in typescript

 
<img src="https://raw.githubusercontent.com/Leon-Bor/slot-machine/main/src/assets/screenshot.png" width=70% height=70%>

## Demo
https://slotmachine.blh.app

## Run the machine

To start the slot machine run the following commands and go to `localhost:8080`

```
npm i
npm start
```

To run unit tests

```
npm run test:unit
```

To run functional tests

```
npm run test:func
```

You can also use the latest docker image to run the slot maschine

```
docker run -d -p 8080:80 ghcr.io/leon-bor/slot-machine:latest
```

## Config

There are a couple of possible configurations you can make in `src/container/game.ts`



| const                     | Description                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `SLOT_WIDTH`                | Width of the slot machine.                                                              |
| `SLOT_HEIGHT`               | Height of the slot machine.                                                             |
| `SLOT_MARGIN_TOP_BOTTOM`    | Margin added to the top and bottom on the slot machine.                                 |
| `SLOT_MARGIN_LEFT_RIGHT`    | Margin added to the left and right on the slot machine.                                 |
| `SLOT_ROLL_TIME`            | Time each reel spins in `ms`.                                                           |
| `SLOT_ROLL_DELAY`           | Delay between each reel stops spinning in `ms `.                                        |
| `SLOT_ROLL_DELAY_VARIANCE`  | Some random variance for the delay in `ms`.                                             |
| `SLOT_SPIN_SPEED`           | How fast each reel spin. Higher values let more icons pass. Basically pixels per frame. |
| `SLOT_REEL_COUNT`           | Number of reels in the slot machine.                                                    |
| `SLOT_ICONS_PER_REEL_COUNT` | Number of vertical icons shown in each reel.                                            |
| `SLOT_ICON_COUNT`           | Number of diffrent icons in the slot machine. Starts at `1`. You need to provide the images in `src/assets` folder                          |



## How to win

<img src="https://raw.githubusercontent.com/Leon-Bor/slot-machine/main/src/assets/screenshot2.png" width=70% height=70%>
