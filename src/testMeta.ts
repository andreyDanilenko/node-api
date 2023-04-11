import 'reflect-metadata';

function Test(target: Function) {
    Reflect.defineMetadata('a', 1, target)
    const meta = Reflect.getMetadata('a', target)
    console.log(meta);

}

function Injectable(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata('a', 1, target)
        const meta = Reflect.getMetadata('a', target)
        console.log(meta);
    }
}

function Inject(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata('a', 1, target)
        const meta = Reflect.getMetadata('a', target)
        console.log(meta);
    }
}

function Prop(target: Object, name: string) {

}

@Injectable('C')
export class C {
    @Prop prop: number;
}

@Injectable('D')
export class D {
    // constructor(@Inject('C') c: C) {

    // }
}