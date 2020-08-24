const Input = require('./Input.js');
const Output = require('./Output.js');
const Connection = require('./Connection.js');

const INPUT_ID_PREFIX = "in_";
const OUTPUT_ID_PREFIX = "out_";

class Element {

    constructor() {
        this.elements = [];
        this.parameters = {};

        this.outputs = [];
        this.inputs = [];

        this.elementsToInvoke = [];
    }

    postConstruct() {
        this.refreshIOID();
    }

    setX(x) { this.x = x; }
    setY(y) { this.y = y; }
    setWidth(width) { this.width = width; }
    setHeight(height) { this.height = height; }

    refreshIOID() {
        for(inputNumber = 0; inputNumber < this.inputs.length; inputNumber++) {
            this.inputs[inputNumber].setId(INPUT_ID_PREFIX + inputNumber);
        }

        for(outputNumber = 0; outputNumber < this.outputs.length; outputNumber++) {
            this.outputs[outputNumber].setId(INPUT_ID_PREFIX + outputNumber);
        }
    }

    compile(codeStruct) {
        let orderedElements = determineInvocationOrder();

        if (orderedElements.length > 0) {
            for (const element of orderedElements) {
                if (element.invokeOutputBeforeInput()) {
                    element.onElementExit(codeStruct);
                } else {
                    element.onElementEnter(codeStruct);
                }

                //compile all child elements
                if (element.getElements().size() > 0) {
                    element.compile(codeStruct);
                }

                if (element.invokeOutputBeforeInput()) {
                    element.onElementEnter(codeStruct);
                } else {
                    element.onElementExit(codeStruct);
                }
            }
        }
    }

    deterineInvocationOrder() {
        // reset all activated connections
        for (const element of this.elements) {
            element.reset();
            for (const input of element.getInputs()) {
                if (input.getConnection() !== null) {
                    input.getConnection().setActivated(false);
                }
            }
        }

        let orderedElements = [];
        let elementsToInvoke = [...this.elements];
        
        // blocks with output first will be invoked
        for (const element of this.elements) {
            if (element.invokeOutputBeforeInput()) {
                this.activateOutputs(element);
                orderedElements.push(element); // don't remove the element this element is invoked twice
            }
        }

        orderElementsAccordingPosition(elementsToInvoke);

        while (elementsToInvoke.length > 0) {
            let nextElementFound = false;

            for (const element of elementsToInvoke) {
                if (this.hasAllInputsActivated(element)) {
                    this.activateOutputs(element);
                    orderedEleents.push(element);
                    elementsToInvoke.splice(elementsToInvoke.indexOf(element), 1);
                    nextElementFound = true;
                    break;
                }
            }

            if ( (!nextElementFound) && (elementsToInvoke.length > 0) ) {
                // we can invoke any of the remaining elements (the invocation order can't be determined)
                throw new IllegalStateException("Can't determine invocation order! The model contains loops between blocks.");
            }
        }
    }

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
