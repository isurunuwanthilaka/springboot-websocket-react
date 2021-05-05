#### Step 1 : Run SpringBoot app

Run `BoilerplateApplication.main()`

#### Step 2 : Run React app

Find the `client` folder in the top and run it with `npm start` (initially run `npm install`). App will open at `http://localhost:3000/`

#### Step 3 : Test

* Observe the incoming messages.

* Send message to the web-socket topic using top card and observe the message appear in the bottom card. This message is sent over ws.

* Run `curl --location --request POST http://localhost:8080/send --header "Content-Type: application/json" --data-raw "{"""message""":"""Test"""}"` in cmd (on Windows) to send message to topic as `REST`