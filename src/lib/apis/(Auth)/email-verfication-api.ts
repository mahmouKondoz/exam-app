export default async function IEmailVerfication(email: string) {
    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/send-email-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let data = await res.json()
    if (!res.ok || data?.status === false) {
        throw new Error(data?.message || 'Email verification failed')
    }
    return data

}