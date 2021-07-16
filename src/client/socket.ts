export function getSocketClient(url: string, headers?: string[]) {
  let socket: WebSocket = new WebSocket(url, headers);
  return socket;
}
