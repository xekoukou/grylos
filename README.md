# A reactive metaprogramming framework

Grylos/Γρύλος/Grillo/Grillon/Cricket is a reactive metaprogramming framework based on XML and visual graph representations.

The most current branch is the gh-pages one. Master will lag behind.

## Documentation

Check the [website](https://xekoukou.github.io/grylos)

or 

Check index.html with a simple http server.

If you have python installed, then execute this inside the git directory:

```
python -m simpleHTTPServer 8000
```

Then check *http://127.0.0.1:8000* from your browser.

## Requirements

This repository uses:

1.  [litprog](https://github.com/xekoukou/litprog)
2.  [protein](https://github.com/xekoukou/protein)
3.  xmllint
4.  ..

## Testing

Execute this:

```
node test_server.js
```

## Developing 

The code currently is in 2 places. I am moving the code from react.js into sindex.html.
When the project finishes, I intend to split the code into small files and have grylos compile itself.
Another option is to leave the code at one place and have protein transfer the necessary parts into the files in each compilation process.



