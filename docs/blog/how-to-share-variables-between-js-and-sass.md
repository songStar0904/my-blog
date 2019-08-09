---
link: https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
title: How to Share Variables Between Javascript and Sass
description: Sharing variables between environments is the holy grail of programming. Here’s how to share variables between Javascript and Sass (or CSS!).
keywords: null
author: Mark Siebert
date: null
publisher: Blue Matador
stats: paragraph=22 sentences=41, words=400
---
#### ![](https://www.bluematador.com/hs-fs/hubfs/old-assets/old-theme/Images/sass-webpack-js-hero.png?width=1280&name=sass-webpack-js-hero.png)

Sharing variables between environments is the holy grail of programming. Here's how to share variables between Javascript and Sass (or CSS!).

With the rise of large single page applications, Javascript and CSS have become increasingly intertwined. It's often the case that values are copied between the two (for example, animation durations for use with React's [CSSTransitionGroup](https://github.com/reactjs/react-transition-group) or passing brand colors into a graphing library). However, maintaining two copies of the same value inevitably leads to updating only one and ending up with a frustrating bug. Luckily, with [webpack](https://webpack.js.org/) and [CSS modules](https://github.com/css-modules/css-modules), there is a better way. In this blog post, we'll explore how to share a variable between your scripts and your styles with the aforementioned example of sharing an animation duration for a `CSSTransitionGroup`.

The first step is to install our dependencies:

```bash
npm install sass-loader node-sass webpack --save-dev
```

Next, we need to configure webpack to use `sass-loader` so we can access our Sass code from Javascript.

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```

Now for the interesting part. We define the actual variable value in Sass and export it to Javascript. CSS Modules have a neat utility called `:export`. The `:export` directive works basically like ES6's `export` keyword. Your Sass code will export an object containing the variable name to use in Javascript and its associated value. These values are all exported as strings.

```scss
// styles/animation.scss
$animation-length: 250;
$animation-length-ms: $animation-length + 0ms;

:export {
  animationMillis: $animation-length-ms;
}

.component-enter {
  ...

  transition: all $animation-length-ms ease-in;
}
```

You'll notice that we first declare the integer value in one variable, and then add `0ms` to it in other. This allows us to export only `"250"` rather than `"250ms"` which is a little easier to parse on the Javascript side (adding `0ms` to the number coerces its "type" into `ms`).

Now, in Javascript, we just need to import the styles from the stylesheet, and parse an int out of the variable we exported!

```js
// js/animation.js
import styles from '../styles/animation.scss'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const millis = parseInt(styles.animationMillis)

...

<CSSTransitionGroup
  transitionName="component"
  transitionEnterTimeout={millis}
  transitionLeaveTimeout={millis}
/>

...

```

This method is incredibly easy, but it will pay off in spades when you avoid the headache of syncing changes between Javascript and Sass.

Watch how Blue Matador has helped Canopy Tax monitor their AWS and Kubernetes infrastructure.
