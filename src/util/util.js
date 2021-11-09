export async function checkAccessCodes(access_codes) {
  try {
    let res = await fetch("/api/access", {
      method: "POST",
      body: JSON.stringify({ access_codes }),
    })
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
}

export async function getGameData(access_codes, game_id) {
  try {
    let res = await fetch(`/api/game-data/${game_id}`, {
      method: "POST",
      body: JSON.stringify({ access_codes }),
    })
    if (res.ok) {
      let data = await res.json()
      return {
        data: data,
        error: null,
      }
    } else {
      return {
        data: null,
        error: res.status,
      }
    }
  } catch (err) {
    return {
      data: null,
      error: err,
    }
  }
}
