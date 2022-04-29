<h1 align="center"><img src="https://cdn.iconscout.com/icon/free/png-32/typescript-1174965.png" /> Countdown</h1>
<h6 align="center"><a href="https://www.npmjs.com/package/react-countdown-typescript"><img src="https://img.shields.io/npm/v/react-countdown-typescript.svg?style=flat-square" /></a></h6>

> A ReactJS library where contains useful utilities related to countdowns.

## 🔖 Description
The following library allows us to use the countdown hooks to control the countdowns more effectively. This library was not made by me, but by [Alex Khismatulin](https://github.com/alexkhismatulin), this is just maintenance and improvements of the [library](https://github.com/alexkhismatulin/react-use-count-down).

## 💾 Installation
```bash
# NPM
npm install react-countdown-typescript

# Yarn
yarn add react-countdown-typescript
```

## ⌨️ Code example
```typescript jsx
import { useCallback, useEffect } from 'react';
import { useCountdown } from 'react-countdown-typescript';

const initialTime = 60 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000

const App = () => {
  const [timeLeft, { start }] = useCountdown(initialTime, interval);

  // start the timer during the first render
  useEffect(start, []);

  const restart = useCallback(() => {
    // you can start existing timer with an arbitrary value
    // if new value is not passed timer will start with initial value
    const newTime = 42 * 1000;
    start(newTime);
  }, []);
 
  return (
    <div>
      <p>Time left: {timeLeft}</p>
      <button onClick={restart}>Restart counter with 42 seconds</button>
    </div>
  );
}
```

## 🤝 Contributing
This project will always remain open source and any kind of contribution is welcome. By participating in this project, you agree to keep common sense and contribute in a positive way.

## 📰 Credits
A special thanks to [Alex Khismatulin](https://github.com/alexkhismatulin) who had the idea to start this project and to their contributors who also invested the time in making the improvements and bugfixes.

## 📝 License
Copyright © 2022 [João Fernandes](https://github.com/0rangeFox). <br/>
This project is [MIT](https://github.com/0rangeFox/react-countdown-typescript/blob/master/LICENSE) licensed.
