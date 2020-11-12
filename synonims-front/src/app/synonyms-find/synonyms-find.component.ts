import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SynonymsService, SynonymsResponse } from '../common/synonyms.service';

@Component({
    selector: 'synonyms-find',
    templateUrl: './synonyms-find.component.html',
    styleUrls: ['synonyms-find.component.sass'],
    animations: [
        trigger('openClose', [
            state('open', style({
                "margin-top": "0%"
            })),
            state('closed', style({
                "margin-top": "20%"
            })),
            transition('closed => open', [
                animate('0.1s')
            ]),
        ]),
    ],
})
export class SynonymsFindComponent {

    public searchParam: string = "";
    public lastSearch: string;
    public synonyms: string[] = []

    constructor(
        private synonymsService: SynonymsService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.find) {
                this.searchParam = params.find;
                this.findWord();
            }
        });
    }

    public clearSearchParam(): void {
        this.searchParam = "";
    }

    public findWord(): void {
        if (this.searchParam !== "") {
            this.synonymsService.getService(this.searchParam).subscribe(
                (response: SynonymsResponse) => {
                    this.lastSearch = this.searchParam;
                    this.synonyms = response.synonyms;
                },
                error => {
                    this.lastSearch = this.searchParam;
                    this.synonyms = [];
                })
        }
    }

    public navigateToNewWord(): void {
        this.router.navigate(['/add'], { queryParams: { search: this.searchParam } });
    }

    public newSynonymAdded(synonym: { value: string, callback: () => void }): void {
        this.synonymsService.patchService(this.searchParam, [synonym.value]).subscribe(
            (response: SynonymsResponse) => {
                this.synonyms = response.synonyms;
                synonym.callback();
            },
            error => {
                this.snackBar.open("synonym couldn't be added");
            });
    }

    public synonymDeleted(synonym: { value: string, callback: () => void }): void {
        this.synonymsService.deleteService(synonym.value).subscribe(
            (response: SynonymsResponse) => {
                if (this.searchParam !== response.word) {
                    this.synonyms = response.synonyms;
                } else {
                    this.synonyms = [];
                }
                synonym.callback();
            },
            error => {
                this.snackBar.open("Synonym couldn't be deleted");
            });
    }
}