# [3Djs](https://eg-julien.github.io/3Djs/)
A simple way to render 3D graphics using plotly. Version Canary.



## Please open an issue if you find some problems !

# How to use ?

You just have to download this repo/ and start a web server with Apache / Nginx / Php (You don't need php for this project).

## What else ?

You can create 3D graphics with a json file. For this you need to format it like this :
```json

{
  "title" : "I'm a super title",
  "arrays" : {
    "data" : [[[1, 1, 2], [1, 8, 4]], [[5, 1, 2], [2, 2, 3]]]
  }
}

```

For more information check [plotly.js](https://plot.ly/javascript/2D-Histogram/) documentation to know how format your file. Data array's is just an assambly of several plotly.js 2D-Histogram arrays.

Example :

```json
{
  "title" : "I'm a super title",
  "arrays" : {
    "data" : [["first plotly.js array"], ["second plotly.js array"], ["third"], ["..."]]
  }
}
```

Then we can study a block formed of 2D histogram that looks like 3D histogram.
