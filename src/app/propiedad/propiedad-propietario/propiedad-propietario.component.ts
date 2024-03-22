import { Component, Input, Output, OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../usuario/usuario.service';
import { DocumentType } from '../../usuario/document-type';
import { Propietario } from '../../usuario/propietario';

@Component({
  selector: 'app-propiedad-propietario',
  templateUrl: './propiedad-propietario.component.html',
  styleUrls: ['./propiedad-propietario.component.css']
})
export class PropiedadPropietarioComponent implements OnInit {
  @Output() actualizarPropietarios = new EventEmitter<void>();

  modalRef?: BsModalRef;
  docTypes: DocumentType;
  ownerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    private toastrService: ToastrService
  ) {
    this.docTypes = new DocumentType();
  }

  ngOnInit() {
    this.ownerForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(65)]],
      lastName: ["", [Validators.required, Validators.maxLength(65)]],
      docType: ["", [Validators.required]],
      docNumber: ["", [Validators.required, Validators.maxLength(200)]],
      phone: ["", [Validators.required, Validators.maxLength(10)]],
      email: ["", [Validators.email, Validators.required, Validators.maxLength(200)]],
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],

    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  submitForm() {
    let newOwner = {
      usuario: this.ownerForm.get('usuario')?.value,
      contrasena: this.ownerForm.get('password')?.value,
      tipoUsuario: 'PROPIETARIO',
      nombres: this.ownerForm.get('name')?.value,
      apellidos: this.ownerForm.get('lastName').value,
      tipoDocumento: this.ownerForm.get('docType').value,
      documento: this.ownerForm.get('docNumber').value,
      telefono: this.ownerForm.get('phone').value,
      correo: this.ownerForm.get('email').value
    } as Propietario

    this.usuarioService.registro(newOwner)
      .subscribe(res => {
        this.toastrService.success("Propietario creado.")
          this.actualizarPropietarios.emit();
          this.modalRef.hide();
      },
      error => {
        this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
      })
  }
}
