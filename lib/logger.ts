export function debug(...msgs: any[]) {
  if(process.env.DEBUG === 'true'){
    msgs.forEach((msg: any) => console.log(msg));
  }
}

export function log(...msgs: any[]) {
  msgs.forEach((msg: any) => console.log(msg));
}

export function error(...msgs: any[]) {
  msgs.forEach((msg: any) => console.log(msg));
  console.log('\nExiting...');
  process.exit(1);
}
