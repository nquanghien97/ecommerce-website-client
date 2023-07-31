export default function token() {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  return dataFromLocalStorage.accessToken;
}
