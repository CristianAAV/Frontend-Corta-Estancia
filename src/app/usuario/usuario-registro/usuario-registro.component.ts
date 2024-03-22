import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';
import { UserType } from '../roles';
import { DocumentType } from '../document-type';
import { Propietario } from '../propietario';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {

  usuarioForm: FormGroup;
  ownerForm: FormGroup;
  userTypes: UserType;
  docTypes: DocumentType;
  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  )
  {
    this.usuarioForm = new FormGroup('');
    this.userTypes = new UserType();
    this.docTypes = new DocumentType();
  }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      userType: ["", [Validators.required]]
    });
    this.ownerForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(65)]],
      lastName: ["", [Validators.required, Validators.maxLength(65)]],
      docType: ["", [Validators.required]],
      docNumber: ["", [Validators.required, Validators.maxLength(200)]],
      phone: ["", [Validators.required, Validators.maxLength(10)]],
      email: ["", [Validators.email, Validators.required, Validators.maxLength(200)]]
    });
  }

  registrarUsuario() {
    let newUser = {
      usuario: this.usuarioForm.get('usuario')?.value,
      contrasena: this.usuarioForm.get('password')?.value,
      tipoUsuario: this.usuarioForm.get('userType')?.value
    } as Usuario
    if(this.usuarioForm.get('userType').value == 'PROPIETARIO') {
      let newOwner = {
        usuario: this.usuarioForm.get('usuario')?.value,
        contrasena: this.usuarioForm.get('password')?.value,
        tipoUsuario: this.usuarioForm.get('userType')?.value,
        nombres: this.ownerForm.get('name')?.value,
        apellidos: this.ownerForm.get('lastName').value,
        tipoDocumento: this.ownerForm.get('docType').value,
        documento: this.ownerForm.get('docNumber').value,
        telefono: this.ownerForm.get('phone').value,
        correo: this.ownerForm.get('email').value
      } as Propietario
      newUser = newOwner;
    }
    console.log(newUser);
    this.usuarioService.registro(newUser)
      .subscribe(res => {
        this.router.navigate([`/`])
      },
        error => {
          this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
        })
  }


}
