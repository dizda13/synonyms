import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'synonyms-list',
    templateUrl: './synonyms-list.component.html',
    styleUrls: ['synonyms-list.component.sass']
})
export class SynonymsListComponent {

    constructor(private snackBar: MatSnackBar) {

    }
    @ViewChild('input') searchElement: ElementRef;
    @Input('list') synonyms: string[] = [];

    @Output() newSynonymEmitter = new EventEmitter<any>();
    @Output() removeSynonymEmitter = new EventEmitter<any>();

    public inputVisibility = false;
    private newSynonym = "";

    public showNewInput() {
        if (!this.inputVisibility) {
            this.inputVisibility = true;

            setTimeout(() => {
                this.searchElement.nativeElement.focus();
            }, 0)
        } else {
            this.addNewSynonyms();
        }
    }

    addNewSynonyms() {
        if (this.newSynonym !== "") {
            this.newSynonymEmitter.emit({
                value: this.newSynonym,
                callback: () => {
                    this.newSynonym = "";
                    this.snackBar.open("New synonym added");
                }
            });
        }
    }

    removeSynonym(index: number) {
        this.removeSynonymEmitter.emit({
            value: this.synonyms[index],
            callback: () => {
                this.snackBar.open("Synonym removed");
            }
        });
    }

    removeInput() {
        this.inputVisibility = false;
        this.newSynonym = "";
    }
}