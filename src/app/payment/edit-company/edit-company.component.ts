import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyProfileService } from '../company-profile/company-profile.service';
import { LoaderService } from 'src/app/core/loader.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  id;
  parentNodeList = [];
  companyData: any;
  firstFormGroup: FormGroup;
  langList = [];
  optionsSysLanguage = [];
  countryList = [];
  optionsSysCountry = [];
  data = [
  ];
  isEnglish = 1;
  selectedNode: any;
  modalRef: MDBModalRef;
  unactivatedList = [];
  unactivatedNode;
  constructor(
    private modalService: MDBModalService,
    private activatedRoute: ActivatedRoute,
    private _companyService: CompanyProfileService,
    private loaderSerivce: LoaderService) {
    let currentLang = JSON.parse(localStorage.getItem('currentLang'));
    if (currentLang == 'ar') {
      this.isEnglish = 0
    }
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getCompanyById();
    });
    this._companyService._nodeListModel$.subscribe((res: []) => {
      if (res !== null) {
        this.companyData['devisions'] = res;
        this.unactivatedList = this.companyData.devisions.filter((node, index) => {
          if (node.nodeStatus == "INACTIVE") {
            return this.companyData.devisions.splice(index, 1);
          }
        })
      }
    })
  }
  editUnactivatedNode() {
    this.unactivatedNode = this.unactivatedList.filter(element => {
      return this.unactivatedNode == element.id;
    })
    this.unactivatedNode[0]["nodeStatus"] = "ACTIVE";
  }
  saveNode() {
    this._companyService.editNode(this.unactivatedNode[0].id, this.unactivatedNode[0])
      .subscribe(res => {
        setTimeout(() => {
          this.getCompanyById();
        }, 100);
      })
  }
  openModal(lang) {
    this.modalRef = this.modalService.show(ModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true
    });

    this.modalRef.content.action.subscribe((result: any) => {
      if (result == 'yes') {
        this.deleteNode(lang);
      }
    });
  }
  ngOnInit(): void {
    this.getLangList();
    this.getCountryList();
    this.firstFormGroup = new FormGroup({
      clientEmail: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      mobile: new FormControl('', [Validators.pattern('([0-0]{1}[1-9]{1}[0-9]{9})|[1-9]{1}[0-9]{9}')]),
      phone: new FormControl(null, [Validators.pattern('([0-0]{1}[1-9]{1}[0-9]{9})|[1-9]{1}[0-9]{9}')]),
      sysCountry: new FormControl('', [Validators.required]),
      clientWebSite: new FormControl(''),
      accountManager: new FormControl(''),

      sysLanguage: new FormControl(null, [Validators.required]),
      billingAddress: new FormControl(null),
      // prefferedCommCh: new FormControl(null, [Validators.required]),
      // city: new FormControl(null, [Validators.required]),
    });
  }
  updateNodeList() {
    this._companyService.updateNodeList(this.companyData.devisions);
  }
  getCompanyById() {
    this._companyService.getCompany(this.id).subscribe((res: any) => {
      this.companyData = res;
      // this.updateNodeList();
      this.loaderSerivce.isLoading.next(false);
      this.seralizeCompanyData();
      for (let index = 0; index < this.companyData.devisions.length; index++) {
        const element = this.companyData.devisions[index];
        if (element.parentNode == null) {
          this.checkNested(element, 'devisionList');
        }
      }
      this.getParentNode();
      this.updateNodeList();
    })
  }
  seralizeCompanyData() {
    const langId = this.companyData['sysLanguage']['id'];
    const countryId = this.companyData['sysCountry']['id'];
    delete this.companyData['sysLanguage'];
    delete this.companyData['sysCountry'];
    this.companyData['sysLanguage'] = langId;
    this.companyData['sysCountry'] = countryId;
    console.log(this.companyData['sysLanguage']);
    this.firstFormGroup.patchValue(this.companyData);
  }
  getCountryList() {
    this._companyService.getCountryList().subscribe((res: any) => {
      this.countryList = res;
      this.countryList.forEach(element => {
        this.optionsSysCountry = [...this.optionsSysCountry, { label: element.countryDescs[0]['countryName'], value: element.id }];
      })
    });
  }
  getLangList() {
    this._companyService.getLangList().subscribe((res: any) => {
      this.langList = res;
      this.langList.forEach(element => {
        element['label'] = element.nativeName;
        element['value'] = element.id;
        this.optionsSysLanguage = [...this.optionsSysLanguage, element];
      })
    });
  }
  submitForm() {
    this.firstFormGroup.value['sysCountry'] = { id: this.firstFormGroup.value['sysCountry'] };
    this.firstFormGroup.value['sysLanguage'] = { id: this.firstFormGroup.value['sysLanguage'] };
    delete this.companyData['sysLanguage'];
    delete this.companyData['sysCountry'];

    let contact = Object.assign({}, this.firstFormGroup.value);
    contact['accountAlias'] = this.companyData.accountAlias;
    contact['validFrom'] = this.companyData.validFrom;
    contact['validTo'] = this.companyData.validTo;
    contact['companyName'] = this.companyData.companyName
    this.editCompanyApi(contact);
  }
  editCompanyApi(contact) {
    this._companyService.editCompany(contact).subscribe(res => {
      this.companyData = res;
      this.seralizeCompanyData();
    })
  }
  deleteNode(id) {
    this._companyService.deleteNode(id).subscribe((res: any) => {
      setTimeout(() => {
        this.getCompanyById();
      }, 100);
    })
  }
  addLangObject(obj) {
    for (let langaugeIndex = 0; langaugeIndex < 2; langaugeIndex++) {
      obj['nodeDescs'].push({ nodeDesc: '', node: null, sysLanguage: this.langList[langaugeIndex] });
    }
  }
  checkNested(obj, type?) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (typeof obj[prop] == "object" && prop == 'childNodes') {
          if (type == 'devisionList' && obj['nodeDescs'].length > 0) {
            obj['name'] = obj['shortName'] + ' - ' + obj['nodeDescs'][this.isEnglish]['nodeDesc'];
            obj['children'] = obj['childNodes'];
          } else if (obj['nodeDescs'].length == 0) {
            this.addLangObject(obj);
          }
          obj['checked'] = false;
          this.checkNested(obj[prop], type);
        } else if (typeof obj[prop] == "object") {
          console.log(`Key: ${prop} 'value: ${obj[prop]}`)
          obj['checked'] = false;
          this.checkNested(obj[prop], type);
        }
      }
    }
  }
  getNodeList(nodeList) {
    this._companyService.updateNodeList(nodeList);
  }
  onCheckedKeys(e: any) {
    console.log('%c Returned array with checked checkboxes ', 'background: #222; color: #bada55');
    console.log(e);
    console.log('%c ************************************ ', 'background: #222; color: #bada05');
  }
  onCheck(e: any) {
    let divisionTest = this.companyData.devisions.concat()
    const node = e;
    for (let index = 0; index < divisionTest.length; index++) {
      let element = divisionTest[index];
      if (element.parentNode == null) {
        this.checkNested(element, 'devisionList');
      }
    }
    e['checked'] = true;
    // this.getNodeChart(e.id);
    this.selectedNode = e;
    if (this.selectedNode.parentNode == null) {
      this.selectedNode.parentNode = { id: 0 };
    }
    this.updateNodeList();
    this.removeChildNodes(this.selectedNode['childNodes']);
  }
  removeChildNodes(nodes) {
    if (nodes != null) {
      nodes.forEach(childNodeItem => {
        this.parentNodeList.forEach((parentNodeItem, index) => {
          if (parentNodeItem.id == childNodeItem.id) {
            if (childNodeItem['childNodes'] != null) {
              this.removeChildNodes(childNodeItem['childNodes'])
              this.parentNodeList.splice(index, 1);
            }
          }
        });
      });
    }
  }
  getParentNode() {
    for (let index = 0; index < this.companyData.devisions.length; index++) {
      if (this.parentNodeList.length > 0) {

        if (this.parentNodeList.find(x => x.id == this.companyData.devisions[index].id)) {
        } else {
          this.parentNodeList.push({
            id: this.companyData.devisions[index]['id'],
            shortName: this.companyData.devisions[index]['shortName']
          })
        }
      } else {
        this.parentNodeList.push({
          id: this.companyData.devisions[index]['id'],
          shortName: this.companyData.devisions[index]['shortName']
        })
      }
    }
  }
  onNodesChanged(e: any) {
    console.log('%c Returned json with marked checkboxes ', 'background: #222; color: #99ccff');
    console.table(e);
    console.log('%c ************************************ ', 'background: #222; color: #bada05');
  }
  getNodeChart(id) {
    this._companyService.getNodeChart(id).subscribe((res: any) => {
      this.selectedNode = res;
    })
  }
  changeSelectedNodeParent() {
    // this.selectedNode.parentNode = { id: this.selectedNode['parentNode'] }
  }
  editNode() {
    this.checkIfFirstLvl();
    this._companyService.editNode(this.selectedNode.id, this.selectedNode)
      .subscribe(res => {
        setTimeout(() => {
          this.getCompanyById();
        }, 100);
      })
  }
  checkIfFirstLvl() {
    if (this.selectedNode.parentNode.id == 0) {
      this.selectedNode.parentNode = null;
      this.selectedNode.childNodes = [];
    }
  }
  addNode() {
    let body = this.selectedNode;
    // body['parentNode'] = {
    //   id: this.selectedNode.id
    // }
    this.checkIfFirstLvl();
    delete body['checked'];
    delete body['childNodes'];
    delete body['children'];
    // delete body['nodeDescs'];
    delete body['id'];
    delete body['createdBy']; delete body['createdDate']; delete body['editBy']; delete body['editDate'];
    this._companyService.addNode(body).subscribe((res: any) => {
      setTimeout(() => {
        this.getCompanyById();
      }, 100);
    })
  }
  changeNodeStatus() {
    if (this.selectedNode.nodeStatus == "ACTIVE") {
      this.selectedNode.nodeStatus = "INACTIVE"
    } else {
      this.selectedNode.nodeStatus = "ACTIVE"
    }
    this.editNode();
  }
  tryToAdd() {
    this.selectedNode = {
      isoCode: "",
      name: "",
      parentNode: { id: "0" },
      shortName: " ",
      nodeDescs: []
    };
    this.getParentNode();
    this.addLangObject(this.selectedNode);
  }
  get clientEmail() { return this.firstFormGroup.get('clientEmail'); }
  get firstName() { return this.firstFormGroup.get('firstName'); }
  get lastName() { return this.firstFormGroup.get('lastName'); }
  get mobile() { return this.firstFormGroup.get('mobile'); }
  get phone() { return this.firstFormGroup.get('phone'); }
  get sysCountry() { return this.firstFormGroup.get('sysCountry'); }
  get clientWebSite() { return this.firstFormGroup.get('clientWebSite'); }
  get accountManager() { return this.firstFormGroup.get('accountManager'); }
  get sysLanguage() { return this.firstFormGroup.get('sysLanguage'); }
  get billingAddress() { return this.firstFormGroup.get('billingAddress'); }

}
