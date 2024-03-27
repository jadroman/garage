Short overview:
===============




What is this?
-------------

Very simple Mechanic Workshop Angular web application I created for the purpose of exercise. 
This Angular app fetches data from the .NET Web API located inside the repo, but <strong>this API serves only as a backend mock</strong>, there is no DB (just in memory data), no authorization/authentication....




What is utilized?
-------------------

* Angular 17.
* Angular Bootstrap.
* Angular Component Store.
* Reusable Components using @Input/@Output attributes to communicate between parent and child.
* Using "StandAlone" type of components instead of Angular modules.
* Using lazy loaded Angular components.
* I wrote few tests for experimental purpose:
  * Few unit test using Jasmine and Karma:
    * "car.store.spec.ts", "car-history.utils.spec.ts"
  * Few e2e tests using cypress:
    * "spec.cy.ts"
* I dockerized .NET Web API and Angular app so the whole app could be run without installing dependencies such as: .NET runtime, Angular....


How to run the app?
-----------
* Using Docker
  * Clone or download code.   
  * Navigate to "Garage" folder and run "docker compose up --build" from console.
  * When two containers are started, open front-end url "http://localhost:4200/".
 
* Without Docker
  * Clone or download code.
  * Open backend solution (Visual studio 2022 or later) and run it.
  * Go to "AngularClient" folder and run "npm i" from console.
  * Run "npm start" from console.


How to run tests?
-----------
* Unit tests:
  * Clone or download code.
  * Go to "AngularClient" folder and run "npm i" from console.
  * Run "npm test"

* e2e tests:
  * Clone or download code.
  * Go to "AngularClient" folder and run "npm i" from console.
  * run "npm run e2e"
  * Cypress UI opens => choose your favorit browser and click "Start e2e testing..." => click "spec.cy.ts"
    
Data model
-----------
![screenshot](doc/dataModel.png "dataModel")

Some app screenshots
-----------
![screenshot](doc/carServiceHistory.png "carServiceHistory")
![screenshot](doc/carAtServiceList.png "carAtServiceList")
![screenshot](doc/carAtService.png "carAtService")
