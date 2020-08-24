
class Output {

    constructor() {
        this.connections = [];
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setVarType(type) {
        if(this.type !== undefined) {
            if(this.type.getType() == type.getType()) return;
        }
        this.type = type;
        if(this.element !== undefined) {
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
        if(this.type !== undefined) {
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
