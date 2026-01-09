import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role?.toLowerCase(); 
  } catch {
    return null;
  }
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
