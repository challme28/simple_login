export function opts(method, body) {
  return {
    method: method,
    body: body,
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  }
}