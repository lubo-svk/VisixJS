const Input = require('./Input.js');
const Output = require('./Output.js');
const Connection = require('./Connection.js');

class Element {

    #name = 'element';
    #inputs = [];
    #outputs = [];

    setName(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    addInput(input) {
        if(input instanceof Input) {
            this.#inputs.push(input);
        }
    }

    getInputAt(index) {
        return this.#inputs[index];
    }

    removeInputAt(index) {
        this.#inputs.splice(index, 1);
    }

    getInputsCount() {
        return this.#inputs.length;
    }

    addOutput(output) {
        if(output instanceof Output) {
            this.#outputs.push(output);
        }
    }

    getOutputAt(index) {
        return this.#outputs[index];
    }

    removeOutputAt(index) {
        this.#outputs.splice(index, 1);
    }

    getOutputsCount() {
        return this.#outputs.length;
    }
}

module.exports = Element;
