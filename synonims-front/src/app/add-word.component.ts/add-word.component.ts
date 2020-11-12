import { Component, ElementRef, ViewChild } from '@angular/core';
import { SynonymsResponse, SynonymsService } from '../common/synonyms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'add-word',
    templateUrl: './add-word.component.html',
    styleUrls: ['add-word.component.sass']
})
export class AddWordComponent {
    private static EMPTY_STRING = "";

    @ViewChild('newWordInput') newWordInput: ElementRef;

    public synonyms: string[] = []
    public matcher: ErrorStateMatcher = new ErrorStateMatcher();
    public wordFormControl: FormControl = new FormControl('', [
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

    public addSynonym(event: { value: string, callback: () => void }): void {
        this.synonyms.push(event.value);
        this.synonyms.filter((val) => event.value === val);
        event.callback()
    };

    public removeSynonym(event: { value: string, callback: () => void }): void {
        this.synonyms.filter((val) => event.value === val);
        event.callback()
    };

    public clearSearchParam(): void {
        this.wordFormControl.setValue(AddWordComponent.EMPTY_STRING);
    }

    public addNewWord() {
        if (this.isNewWordInputEmpty() || this.isSynonymListEmpty()) {
            return
        }
        const newWord: string = this.wordFormControl.value;

        this.synonymsService.postService(newWord, this.synonyms).subscribe(
            (response: SynonymsResponse) => {
                this.router.navigate(['/word'], { queryParams: { find: newWord } });
            },
            error => {
                if (error.error.code === "BAD_REQUEST") {
                    this.snackBar.open("Word already in system, find it");
                } else {
                    this.snackBar.open("New word couldn't be added");
                }
            });
    }

    private isNewWordInputEmpty(): boolean {
        if (this.wordFormControl.hasError("required")) {
            setTimeout(() => {
                this.newWordInput.nativeElement.focus();
            }, 0);
            return true;
        }
        return false;
    }

    private isSynonymListEmpty(): boolean {
        if (!this.synonyms.length) {
            return true;
        }
        return false
    }

}