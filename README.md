# Basic ES5 implementation of MVC

[![Build Status](https://travis-ci.org/ludder/tomvc.svg?branch=master)](https://travis-ci.org/ludder/tomvc)

## ToMvc is MVC

ToMvc provides a basic implementation of the MVC pattern in JavaScript (ES5). While views communicate with the DOM, and models interact with data objects, the controller glues them together. Views and models don't know each other. They communicate via events, controlled by the Controller class.

## Controller

A controller instance controls:

- views
- models
- events

Instantiation:

```
var controller =  new ToMvc.Controller;
```

## View

A view is connected with a part of the DOM.

At instantation a `controller` instance and a DOM element `el` are required:

```
var controller =  new ToMvc.Controller;
var myView = new ToMvc.View({
    controller: controller,
    el        : 'body'
});
```


## Model

A model is connected with data objects.

At instantation a `controller` instance is required:

```
var controller =  new ToMvc.Controller;
var myModel = new ToMvc.Model({
    controller: controller
});
```

## Subclassing

An `extend` method is provided by Controllers, Views and Models to make subclassing easy.

Example:

```
var SubView = ToMvc.View.extend();
var mySubview = new SubView( {
    controller: new ToMvc.Controller,
    el: 'body'
} );
```


## Development

- Repo: [https://github.com/ludder/tomvc](https://github.com/ludder/tomvc)
- Development dependencies: 
  - [Testem](https://github.com/airportyh/testem)
  - See: package.json
- Unit tests: `testem`
- Grunt web server: `grunt`
- Package build: TODO


## License

BSD
