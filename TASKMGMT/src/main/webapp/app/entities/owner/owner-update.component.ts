import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
const Web3 = require('web3');
const contract = require('truffle-contract');
//const metaincoinArtifacts = require('../../../../../../contracts/MetaCoin.json');//
const metaincoinArtifacts = require('/home/kartikeya/Ethereum/Ethereum/solidity-experiments/angular4-truffle/angular4-truffle-starter-dapp/build/contracts/MetaCoin.json');
const poeArtifacts = require('/home/kartikeya/Ethereum/Ethereum/Consensys/proof-of-existence/build/contracts/ProofOfExistence3.json');
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IOwner } from 'app/shared/model/owner.model';
import { OwnerService } from './owner.service';

declare var window: any;

@Component({
    selector: 'jhi-owner-update',
    templateUrl: './owner-update.component.html'
})
export class OwnerUpdateComponent implements OnInit {
    private _owner: IOwner;
    isSaving: boolean;
    web3: any;
    status:any;
    proof : any;
    account: any;
    accounts: any;
    MetaCoin = contract(metaincoinArtifacts);
    ProofOfExistence3 = contract(poeArtifacts);

    constructor(
        private dataUtils: JhiDataUtils,
        private ownerService: OwnerService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ owner }) => {
            this.owner = owner;
        });
        this.checkAndInstantiateWeb3();
        this.onReady();
    }

    checkAndInstantiateWeb3 = () => {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof typeof window.web3 !== 'undefined') {
            console.warn(
                'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
            );
            // Use Mist/MetaMask's provider
            this.web3 = new Web3(window.web3.currentProvider);
            if ('enable' in this.web3.currentProvider) {
                this.web3.currentProvider.enable();
            }
        } else {
            console.warn(
                'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
            );
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(
                new Web3.providers.HttpProvider('http://localhost:8545')
            );
        }
    };

    onReady = () => {
        // Bootstrap the MetaCoin abstraction for Use.
        //this.MetaCoin.setProvider(this.web3.currentProvider);
        this.ProofOfExistence3.setProvider(this.web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        this.web3.eth.getAccounts((err, accs) => {
            if (err != null) {
                alert('There was an error fetching your accounts.');
                return;
            }
            console.log(accs);
            if (accs.length === 0) {
                alert(
                    'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
                );
                return;
            }
            this.accounts = accs;
            this.account = this.accounts[0];
            //this._owner.email = this.account;
            //this.owner.name = this.account;

            console.log(this.account);

            if (this.owner.id !== undefined) {
                this.getPOE();
            }


            // This is run from window:load and ZoneJS is not aware of it we
            // need to use _ngZone.run() so that the UI updates on promise resolution
          //  this._ngZone.run(() =>
             //   this.refreshBalance()
            //);
        });
    };

    getPOE = () => {
        let poe;
        this.ProofOfExistence3
            .deployed()
            .then(instance => {
                poe = instance;
                return poe.getProofByName.call(this.owner.name, {
                    from: this.account
                });
            })
            .then(value => {
                this.proof = value;
                console.log(this.proof);
                this.owner.email = this.proof;
            })
            .catch(e => {
                console.log(e);
                this.setStatus('Error getting hashcode; see log.');
            });
    };


    setStatus = message => {
        this.status = message;
    };

    notarizeAgreementByName = () => {
       let poe;

        //this.setStatus('Initiating transaction... (please wait)');

        this.ProofOfExistence3
            .deployed()
            .then(instance => {
                poe = instance;
                console.log('Notarizing Transaction initiated');
                return poe.notarizeDocumentByName(this.owner.name, this.owner.textagreement, {
                    from: this.account
                });
            })
            .then(() => {
                this.setStatus('Transaction complete!');
                console.log('Notarizing Transaction complete');
                //this.refreshBalance();
            })
            .catch(e => {
                console.log(e);
                this.setStatus('Error notarizing document:  see log.');
            });
    };


/*setStatus = message => {
    this.status = message;
};
*/
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.owner, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;

        if (this.owner.id !== undefined) {
            this.getPOE();
            this.subscribeToSaveResponse(this.ownerService.update(this.owner));
        } else {
            this.notarizeAgreementByName();
            this.subscribeToSaveResponse(this.ownerService.create(this.owner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOwner>>) {
        result.subscribe((res: HttpResponse<IOwner>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        console.log('ID is ' +  this.owner.id);
        alert('ID is ' +  this.owner.id);
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get owner() {
        return this._owner;
    }

    set owner(owner: IOwner) {
        this._owner = owner;
    }
}
