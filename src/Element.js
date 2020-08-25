const Input = require('./Input.js');
const Output = require('./Output.js');
const Connection = require('./Connection.js');

const INPUT_ID_PREFIX = "in_";
const OUTPUT_ID_PREFIX = "out_";

class Element {
    static const TYPE_GENERAL = 1;
    static const TYPE_META = 2;

    constructor() {
        this.elements = [];
        this.parameters = {};

        this.outputs = [];
        this.inputs = [];

        this.parent = null;

        this.elementsToInvoke = [];
        this.type = TYPE_GENERAL;
    }

    postConstruct() {
        this.refreshIOID();
    }

    setX(x) { this.x = x; }
    getX() { return this.x; }
    setY(y) { this.y = y; }
    getY() { return this.y; }
    setWidth(width) { this.width = width; }
    getWidth() { return this.width; }
    setHeight(height) { this.height = height; }
    getheight() { return this.height; }

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

        // don't count meta elements into the invocation order
        for (let i = 0; i < elementsToInvoke.length; i++)
        {
            if(elementsToInvoke[i].getElementType == Element.TYPE_META)
            {
                elementsToInvoke.splice(i, 1);
                i--;
            }
        }

        return orderedElements;
    }



    orderElementsAccordingPosition(elementsToOrder) {
        elementsToOrder.sort(
            function(e0, e1) {
                const result = e0.getY() - e1.getY();
                return (result == 0) ? (e0.getX() - e1.getX()) : result;
            }
        );
    }

    activateOutputs(element) {
        for (const output of element.getOutputs()) {
            for (const connection of output.getConnections()) {
                connection.setActivated(true);
            }
        }
    }

    hasAllInputsActivated(element) {
        for (const input of element.getInputs()) {
            if (input.getConnection() !== null) {
                if (!input.getConnection().isActivated())
                    return false;
            }
        }
        return true;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setElements(elements) {
        this.elements = elements;
    }

    getElements() {
        return this.elements;
    }

    setParameters(parameters) {
        this.parameters = parameters;
    }

    getParameters() {
        return this.parameters;
    }

    setOutputs(outpus) {
        this.outputs = outputs;
    }

    getOutputs() {
        return this.outputs;
    }

    setInputs(inputs) {
        this.inputs = inputs;
    }

    getInputs() {
        return this.inputs;
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    inputCreated(input) {
        this.refreshIOID();
    }

    inputRemoved(input) {
        this.refreshIOID();
    }

    inputUpdated(input) {
        this.refreshIOID();
    }

    outputCreated(output) {
        this.refreshIOID();
    }
        
    outputRemoved(output) {
        this.refreshIOID();
    }

    outputUpdated(output) {
        this.refreshIOID();
    }


    /**
     * Override this function if you want to handle
     * changes in IO (connection created/removed and VarType change)
     */
    ioUpdated() {}

    /**
     * Call this function to inform adjacent elements about
     * IO change
     */
    updateIO() {
        for (const input of this.inputs) {
            if (input.getConnection() !== null) {
                input.getConnection().getOutput().getElement().ioUpdated();
            }
        }

        for (const output of this.outputs) {
            for (const connection: output.getConnections()) {
                connection.getInput().getElemment().ioUpdated();
            }
        }
    }

    invokeBeforeInput() {
        return false;
    }

    /**
     * This function is called before compilation.
     * Override it to reset element in new state.
     */
    reset() {}
}

module.exports = Element;
