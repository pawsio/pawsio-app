# pawsio-app
An IOT pet monitoring single page app front end
[https://pawsio.herokuapp.com](https://pawsio.herokuapp.com)

<div align="center">
  <img src="https://s-media-cache-ak0.pinimg.com/564x/06/90/1d/06901d858bc68e61f0b23b123ee0db35.jpg">
</div>

### Built with

* MONGO
* Express
* AngularJS
* NodeJS
* Deployed with Heroku

### Authors

[Caitlin Araldi](https://github.com/caraldi),
[Chris Bruner](https://github.com/QuantumArchive),
[Nathan Hugon](https://github.com/nthugon),
[Michelle Srikhundonr](https://github.com/michellesri)

### Version 1.0.0 

Fully integrated front-end single page web application with RESTful API backend and a Mongo DB for data persistence

* Front end will allow new users signup with a new account or returning users to signin instead
* Users may then register a new pet to their account ( just dogs for now, sorry :/ )
* You may then register your IOT device with your pets name using our [IOT app source code](https://github.com/pawsio/pawsio-iot)
* As soon as the pet and IOT device has been registered, it will begin transmitting data using your local WIFI source

### Application Structure

This repo contains all the main AngularJS code needed to build the front end of [PawsIO](https://pawsio.heokuapp.com) which
will be served via the [server](https://github.com/pawsio/pawsio-server).

This code utilizes [WebPack](https://webpack.github.io/) to take all the base code and convert it into HTML, JS, and CSS. To have it build the code, enter the following in your console:

```
$ npm run build
```

The files will then be dumped using the following path:

```
$ ../pawsio-server/public
```

To run the app locally, run the following command in your command line:

```
$ npm run start
```

When it's finished, go ahead and open up http://localhost:8080 in your favorite web browser.

### Testing

E2E testing is performed using Angular Protractor 

```
$ npm run e2e
```

### Issues

Please feel free to submit issues on our [Github Account!](https://github.com/pawsio/pawsio-app/issues)

### License

MIT