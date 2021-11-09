export async function checkAccessCode(access_code) {
  try {
    let res = await fetch("/api/access", {
      headers: {
        Authorization: `Bearer ${access_code}`,
      },
    })
    return res.ok
  } catch {
    return false
  }
}
