import { Component, ElementRef, ViewChild } from '@angular/core';
import { SynonymsResponse, SynonymsService } from '../common/synonyms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'add-word',
    templateUrl: './add-synonims.component.html',
    styleUrls: ['add-synonims.component.sass']
})
export class AddSynonimsComponent {
    private static EMPTY_STRING = "";

    public synonyms: string[] = []
    public matcher: ErrorStateMatcher = new ErrorStateMatcher();
    public wordFormControl: FormControl = new FormControl('', [
        Validators.required,
    ]);
    public synonimFormControl: FormControl = new FormControl('', [
        Validators.required,
    ]);

    constructor(
        private synonymsService: SynonymsService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.wordFormControl.setValue(params.search);
        });
    }

    public clearWord(): void {
        this.wordFormControl.setValue(AddSynonimsComponent.EMPTY_STRING);
    }

    public clearSynonym(): void {
        this.synonimFormControl.setValue(AddSynonimsComponent.EMPTY_STRING);
    }

    public addSynonym() {
        this.synonymsService.postService(this.wordFormControl.value, [this.synonimFormControl.value]).subscribe(
            (response: SynonymsResponse) => {
                this.snackBar.open("New word added");
            },
            error => {
                this.snackBar.open("New word couldn't be added");
            });
    }
}