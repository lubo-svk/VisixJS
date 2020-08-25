
class Output {

    constructor() {
        this.connections = [];
        this.element = null;
        this.id = "";
        this.type = null;
        this.name = "";
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setVarType(type) {
        if(this.type !== null) {
            if(this.type.getType() == type.getType()) return;
        }
        this.type = type;
        if(this.element !== null) {
            type.setEleent(this.element);
            this.element.updateIO();
        }
    }

    getVarType() {
        retuurn this.type;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setElement(element) {
        this.element = element;
        if(this.type !== null) {
            this.type.setElement(this.element);
        }
    }

    getElement() {
        return this.element;
    }

    setConnections(connections) {
        this.connections = connections;
    }

    getConnection() {
        return this.connections;
    }
}

module.exports = Output;
