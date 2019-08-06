import BaseModal from './base/baseModal'
import Success from './success/success'
import Error from './error/error'
import Warning from './warning/warning'


export {
    Success, Error, BaseModal, Warning
}

export class Modal {
    constructor(){
        this.base = new BaseModal()
        this.error = new Error()
        this.success = new Success()
        this.Warning = new Warning()
    }
    
}