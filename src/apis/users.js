const API_URL = 'http://127.0.0.1:8000/api'

const getUsers = async () => {
  const url = `${API_URL}/users`
  const myHeaders = new Headers()

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  }

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result
  } catch (error) {
    return {error: error.text}
  }
}

const getStats = async () => {
  const url = `${API_URL}/users/stats`
  const myHeaders = new Headers()

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  }

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result
  } catch (error) {
    return {error: error.text}
  }
}

export { getUsers, getStats }