const Input = require('./Input.js');
const Output = require('./Output.js');

class Connection {

    constructor() {
        this.id = "";
        this.activated = false;
        this.output = null;
        this.input = null;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setActivated(activated) {
        this.activated = activated;
    }

    isActivated() {
        return this.activated;
    }

    setOutput(output) {
        this.output = output;
    }

    getOutput() {
        return this.output;
    }
    
    setInput(input) {
        this.input = input;
    }

    getInput() {
        return this.input;
    }
}

module.exports = Connection;
