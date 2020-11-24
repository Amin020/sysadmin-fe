import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RolesManagementService {
  private rolesUrl = environment.baseUrl + '/role';
  private roleMatrix = environment.baseUrl + '/role-matrix';

  constructor(private http: HttpClient) { }

  getAllRoles() {
    let roles = this.http.get(this.rolesUrl, httpOptions);
    return roles;
  }
  addNewRole(data) {
    return this.http.post(this.rolesUrl, data, httpOptions);
  }

  getAllSysRoleMatrix() {
    return this.http.get(this.roleMatrix, httpOptions);
  }
  getSelectedRole(id: number) {
    return this.http.get(this.rolesUrl + '/' + id, httpOptions);
  }
  updateRole(roleID, roleData) {
    return this.http.put(this.rolesUrl + '/' + roleID, roleData, httpOptions);
  }
  updateRoleMatrix() {

  }
  addRoleMatrix(data) {
    return this.http.post(this.roleMatrix, data, httpOptions);
  }
  DeactivateSysRole(roleId) {
    return this.http.put(this.rolesUrl + '/deactivate/' + roleId, httpOptions);
  }

}
