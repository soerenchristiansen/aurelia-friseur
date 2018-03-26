import { CustomerUpdated } from './../../messages';
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

@inject(HttpClient, EventAggregator)
export class Customers {
    public customers: ICustomer[] = [];
    public customer: ICustomer = {id: 0, name: '', lastName: '', city: ''};

    constructor(private http: HttpClient, private ea: EventAggregator) {
        this.getCustomers();
        ea.subscribe(CustomerUpdated, (msg: any) => {
            let id = msg.customer.id;
            let found = this.customers.find(x => x.id == id);
            Object.assign(found, msg.customer);
        });
    }

    getCustomers(): Promise<ICustomer[]> {
        return this.http.fetch('api/Customers/GetCustomers')
        .then(result => result.json() as Promise<ICustomer[]>)
        .then(data => this.customers = data);
    }

    createCustomer() {
        this.http.fetch('api/Customers/CreateCustomer', {
            method: 'post',
            body: json(this.customer)
        }).then(result => {
            if (result) {
                this.getCustomers();
                this.clear();
            }
        });
    }
    
    deleteCustomer(id: number) {
        this.http.fetch('api/Customers/DeleteCustomer/' + id, {
            method: 'delete'
        })
        .then(result => result.json())
        .then(response => console.log(response));
    }

    clear() {
        this.customer.id = 0;
        this.customer.name = '';
        this.customer.lastName = '';
        this.customer.city = '';
    }
}

interface ICustomer {
    id: number;
    name: string;
    lastName: string;
    city: string;
}