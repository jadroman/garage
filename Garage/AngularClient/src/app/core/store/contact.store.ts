import { Injectable } from "@angular/core";
import { ContactPerson } from "@models/garage.model";
import { ComponentStore, OnStateInit, tapResponse } from "@ngrx/component-store";
import { GarageService } from "@services/garage.service";
import { BehaviorSubject, Observable, pipe, switchMap, tap } from "rxjs";

export interface ContactState {
    contacts: ContactPerson[];
    contactDetails: ContactPerson;
}

@Injectable()
export class ContactStoreService extends ComponentStore<ContactState> implements OnStateInit {
    constructor(private readonly garageService: GarageService) {
        super({ contacts: [], contactDetails: {} });
    }

    ngrxOnStateInit() {
        this.getContacts();
    }

    addedContact$ = new BehaviorSubject<ContactPerson>(null!);
    updatedContact$ = new BehaviorSubject<ContactPerson>(null!);

    contacts$ = this.select((store) => store.contacts);
    contactDetails$ = this.select((store) => store.contactDetails);

    getContacts = this.effect<void>(
        pipe(
            switchMap(() =>
                this.garageService.getContacts().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ contacts: response });
                        },
                        (error) => {
                            console.error('get contacts error: ', error);
                        },
                    ),
                ),
            ),
        ),
    );


    getContact = this.effect((contactId$: Observable<number>) =>
        contactId$.pipe(
            switchMap((contactId) =>
                this.garageService.getContact(contactId).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ contactDetails: response });
                        },
                        (error) => {
                            console.error('get contact error: ', error);
                        },
                    ),
                ),
            ),
        ),
    );

    addContact = this.effect((contact$: Observable<ContactPerson>) =>
        contact$.pipe(
            tap((contact) => {
                this.garageService.createContact(contact).subscribe({
                    next: value => {
                        this.addedContact$.next(value);
                        this.patchState((state) => ({
                            contacts: [...state.contacts, contact]
                        }));
                    },
                    error: err => console.error('create contact error: ' + err)
                });
            })
        )
    );

    updateContact = this.effect((contact$: Observable<ContactPerson>) =>
        contact$.pipe(
            tap((contact) => {
                this.garageService.updateContact(contact).subscribe({
                    next: (value) => {
                        this.patchState((state) => ({
                            contacts: [...state.contacts.filter((c) => c.id !== contact.id), contact]
                        }));
                        this.updatedContact$.next(value);
                    },
                    error: err => console.error('update contact error: ' + err)
                });
            })
        )
    );

    deleteContact = this.effect((contactId$: Observable<number>) =>
        contactId$.pipe(
            tap((contactId) => {
                this.garageService.deleteContact(contactId).subscribe({
                    next: () => {
                        this.patchState((state) => ({
                            contacts: state.contacts.filter((contact) => contact.id !== contactId)
                        }));
                    },
                    error: err => console.error('delete contact error: ' + err)
                });
            })
        )
    );

}
