function Component(id: number) {
    console.log('init component');
    return (target: Function) => {
        console.log('run component');
        target.prototype.id = id
    }
}

function Logger() {
    console.log('init logger');
    return (target: Function) => {
        console.log('run logger');
    }
}

function Method(
    target: Object,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
) {
    console.log('propertyKey', propertyKey);
    console.log('target', target);
    console.log('propertyDescriptor', propertyDescriptor);
    
    const oldValue = propertyDescriptor.value;
    propertyDescriptor.value = function (...args: any[]) {
        console.log('...args', args);
        return args[0] * 10;
    }
}


@Logger()
@Component(2)
export class User {
    id: number;

    @Method
    updateId(newId: number) {
        this.id = newId;
        return this.id;
    }
}

console.log(new User().id);
