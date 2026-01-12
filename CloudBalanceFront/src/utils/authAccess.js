import { store } from '../redux/store';
export function getUserRole() {
  const state = store.getState();
  return state.auth.role;
}

export function isAdmin() {
  return getUserRole() === "admin";
}

export function isCustomer() {
  return getUserRole() === "customer";
}

export function isReadOnly() {
  return getUserRole() === "read only";
}